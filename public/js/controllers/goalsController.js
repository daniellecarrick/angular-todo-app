app.controller('goalsController', function($scope, goalsFactory){
  //window.a=$scope;
  $scope.editable = false;
  $scope.show = false;

  // hold index position so we can edit and update goals
  var index;

  // A variable to store the goal that is being edited in case the serve f*&$ up
  $scope.temporaryGoal;

  $scope.toggleModal = function() {
    $scope.show ^= true;
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
    $scope.editable = false;
    goalsFactory.addGoal(newgoal).then(function(goal) {
      $scope.goals.push(goal);
      $scope.show = false;
    }, function(err) {
      console.log(err);
    });
  }

  // Delete a goal
  $scope.deleteGoal = function(goalToDelete) {
    $scope.editable = false;
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

  $scope.editGoal = function(goalToEdit) {
    // set temporaryGoal to a copy of the original goal object
    $scope.editable = true;
    $scope.show = true;
    index = $scope.goals.indexOf(goalToEdit);
    console.log("index", index);
    $scope.temporaryGoal = angular.copy(goalToEdit);
 /*   console.log($scope.temporaryGoal);
    console.log("goal to edit", goalToEdit);*/
  }

  $scope.moveToCompleted = function(goal) {
    goalsFactory.moveToCompleted(goal)
      .then(function(goal) {

        var index = $scope.goals.findIndex(function(_goal){
          return _goal._id == goal._id;
        });
        console.log(index);
        $scope.goals[index] = goal;
      }, function(err) {
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
        alert("updated goal didn't work. ask yohai")
      })
    console.log("update goal" + goal.name);
    //$scope.editable = false;
  }*/

  $scope.updateGoal = function(goalToUpdate) {
    //var index = $scope.goals.indexOf(goalToUpdate);
    goalsFactory.updateGoal(goalToUpdate).then(function(updatedGoal) {
      $scope.goals[index] = updatedGoal;
      $scope.show = false;
    }, function(err) {
      console.log(err);
      var index = $scope.goals.indexOf(goal);
        // if there is a problem on the server, revert back to the temporary goal
      $scope.goals[index] = $scope.temporaryGoal;
      alert("updated goal didn't work. ask yohai")
    });
  }

  // Adds the goals to an array called goals
  goalsFactory.getGoals().then(function(goals) {
    $scope.goals = goals;
  });

    // count number of active and completed goals
/*  $scope.activeTally = 6;
  $scope.completedTally;
  $scope.tallyGoals = function() {
    for (i = 0; i < $scope.goals.length; i++) {
      if ($scope.goals.completed) {
        $scope.completedTally += 1;
        console.log($scope.completedTally);
      }
    } return $scope.completedTally;
  }

  $scope.tallyGoals();*/

});
