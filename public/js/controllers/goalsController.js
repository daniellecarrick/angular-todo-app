app.controller('goalsController', function($scope, goalsFactory){

  /** to dos
   - congrats message for completing goal
   - landing page for new users and to log in
   - only show users goals after log in
   **/

  $scope.editmode = false;
  $scope.show = false;

  // hold index position. we need it to find goals in the array so we can edit and update them
  var index;

  // A variable to store the goal that is being edited in case the serve f*&$ up
  $scope.temporaryGoal;

  $scope.toggleModal = function() {
    $scope.show ^= true;
   // $scope.editmode ^= true;
  }
  // Controls the toggle between active and completed goals
  $scope.showActiveGoals = true;

  $scope.type;
  // For filtering the goals by type
  $scope.typeFilter = function(type) {
    if (type === 'all') {
      $scope.type = '';
    } else {
      $scope.type = type;
    }
    console.log(type);
  }

  // Add a goal
  $scope.addGoal = function(newgoal) {
    $scope.editmode = false;
    $scope.show = false;
    goalsFactory.addGoal(newgoal).then(function(goal) {
      $scope.goals.push(goal);
      $scope.clearFields(newgoal);
    }, function(err) {
      console.log(err);
    });
  }

  // clear input fiels for adding and editing a goal
  $scope.clearFields = function(goalToClear) {
    console.log("first", goalToClear);
    // setting the whole object to null didnt work so I set each property to an empty string instead
    goalToClear.name = '';
    goalToClear.type = '';
    goalToClear.description = '';
    console.log("second", goalToClear);
    //$scope.$setPristine(true);
  }

  // Delete a goal (called when pressing the "Delete" button)
  $scope.deleteGoal = function(goalToDelete) {
    $scope.editmode = false;
    $scope.show = false;
    console.log(goalToDelete);
    goalsFactory.deleteGoal(goalToDelete).then(function(response) {
      for (var i = 0; i < $scope.goals.length; i++) {
        if ($scope.goals[i]._id === goalToDelete._id) {
          $scope.goals.splice(i, 1);
          break;
        }
      }
    });
  }

  // Edit goal (called when pressing the pencil icon) creates a copy of the goal so it can be updated or deleted
  $scope.editGoal = function(goalToEdit) {
    // set temporaryGoal to a copy of the original goal object
    $scope.editmode = true;
    $scope.show = true;
    index = $scope.goals.indexOf(goalToEdit);
    console.log("index", index);
    $scope.temporaryGoal = angular.copy(goalToEdit);
 /*   console.log($scope.temporaryGoal);
    console.log("goal to edit", goalToEdit);*/
  }

  // Move to Completed (called when click "i did it")
  $scope.moveToCompleted = function(goal) {
    goalsFactory.moveToCompleted(goal)
      .then(function(goal) {
        // need to find the index in order to delete it from the array
        var index = $scope.goals.findIndex(function(_goal){
          return _goal._id == goal._id;
        });
        // setting the goal object at that index to our new object (with completed = true)
        $scope.goals[index] = goal;

        // To Do: show congratulations message
      }, function(err) {
        // if there is an error on the server, return to original goal
        $scope.goals[index] = $scope.temporaryGoal;
        alert("move to completed goal didn't work.")
      })
    console.log("move to completed" + goal.name);
    $scope.editmode = false;
    $scope.show = false;
  }

/*  $scope.updateGoal = function(goalToUpdate) {
    console.log("update was clicked in controller");
    console.log(goalToUpdate);
    goalsFactory.updateGoal(goalToUpdate)
      .catch( function(err) {
        index = $scope.goals.indexOf(goal);
        // if there is a problem on the server, revert back to the temporary goal
        $scope.goals[index] = $scope.temporaryGoal;
        alert("updated goal didn't work.")
      })
    console.log("update goal" + goal.name);
    //$scope.editmode = false;
  }*/

  // Update goal called when "Update" button is clicked in Edit Goal modal
  $scope.updateGoal = function(goalToUpdate) {
    //var index = $scope.goals.indexOf(goalToUpdate);
    goalsFactory.updateGoal(goalToUpdate).then(function(updatedGoal) {
      $scope.goals[index] = updatedGoal;
      $scope.toggleModal();
    }, function(err) {
      console.log(err);
      var index = $scope.goals.indexOf(goal);
        // if there is a problem on the server, revert back to the temporary goal
      $scope.goals[index] = $scope.temporaryGoal;
      alert("updated goal didn't work.")
    });
    $scope.editmode = false;
    $scope.show = false;
  }

  // Get the goals from the DB and add them to an array called goals
  goalsFactory.getGoals().then(function(goals) {
    $scope.goals = goals;
  });

  // Calculates the number of completed goals in the array (completed = true)
  $scope.completedGoals = function() {
    //count starts at 0
    var count = 0;
    // loop through object and keys
    angular.forEach($scope.goals, function(goal) {
        // if goal is completed, add 1 to tally otherwise add 0
        count += goal.completed ? 1 : 0;
    })
    return count;
  }

});
