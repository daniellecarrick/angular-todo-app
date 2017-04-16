app.controller('goalsController', function($scope, goalsFactory){

  /** to dos
   - create function to handle editabl and show states rather than repeating it in each function

   **/

  $scope.editmode = false;
  $scope.show = false;

  // hold index position so we can edit and update goals
  var index;

  // A variable to store the goal that is being edited in case the serve f*&$ up
  $scope.temporaryGoal;

  $scope.toggleModal = function() {
    $scope.show ^= true;
    $scope.editmode ^= true;
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
    /*$scope.editmode = false;
    $scope.show = false;*/
    $scope.toggleModal();
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
    /*$scope.editmode = false;
    $scope.show = false;*/
    $scope.toggleModal();
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
    /*$scope.editmode = true;
    $scope.show = true;*/
    $scope.toggleModal();
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
      }, function(err) {
        // if there is an error on the server, return to original goal
        $scope.goals[index] = $scope.temporaryGoal;
        alert("move to completed goal didn't work.")
      })
    console.log("move to completed" + goal.name);
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
      /*$scope.show = false;
      $scope.editmode = false;*/
      $scope.toggleModal();
    }, function(err) {
      console.log(err);
      var index = $scope.goals.indexOf(goal);
        // if there is a problem on the server, revert back to the temporary goal
      $scope.goals[index] = $scope.temporaryGoal;
      alert("updated goal didn't work.")
    });
  }

  // Get the goals form the DB and add them to an array called goals
  goalsFactory.getGoals().then(function(goals) {
    $scope.goals = goals;
  });

    // count number of active and completed goals
  //$scope.activeTally = 6;
  //$scope.completedTally;
  /*$scope.tallyGoals = function() {
    for (i = 0; i < $scope.goals.length; i++) {
      if ($scope.goals.completed) {
        $scope.completedTally += 1;
        console.log($scope.completedTally);
      }
    } return $scope.completedTally;
  }*/

  $scope.completedGoals = function() {
    var count = 0;
    angular.forEach($scope.goals, function(goal) {
        count += goal.completed ? 1 : 0;
    })
    return count;
  }

  //$scope.tallyGoals();

});
