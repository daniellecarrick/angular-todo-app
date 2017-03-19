app.controller('goalsController', function($scope, goalsFactory){
  //window.a=$scope;
  $scope.editable = true;

  // A variable to store the goal that is being edited in case the serve f*&$ up
  var temporaryGoal;

  // Controls the toggle between active and completed goals
  $scope.showActiveGoals = true;
  $scope.showCompletedGoals = true;

  $scope.changeCompletedGoals = function () {
    $scope.showActiveGoals = true;
    $scope.showCompletedGoals = true;
  }

  $scope.changeActiveGoals = function () {
    $scope.showActiveGoals = false;
    $scope.showCompletedGoals = false;
  }

  // Add a goal
  $scope.addGoal = function(newgoal) {
    goalsFactory.addGoal(newgoal).then(function(goal) {
      $scope.goals.push(goal);
    }, function(err) {
      console.log(err);
    });
  }

  // Delete a goal
  $scope.deleteGoal = function(goalToDelete) {
    goalsFactory.deleteGoal(goalToDelete).then(function(goal) {
      for (var i = 0; i < $scope.goals.length; i++) {
        if ($scope.goals[i]._id = goal._id) {
          $scope.goals.splice(i, 1);
          break;
        }
      }
    });
  }

  $scope.editGoal = function(goalToEdit) {
    // set temporaryGoal to a copy of the original goal object. because yohai COMMANDED!
    temporaryGoal = angular.copy(goalToEdit);
    console.log(goalToEdit);
  }

  $scope.moveToCompleted = function(goal, index) {
    goalsFactory.moveToCompleted(goal)
      .then(function(goal) {
        $scope.goals[index] = goal;
      }, function(err) {
        $scope.goals[index] = temporaryGoal;
        alert("it didn't work. ask yohai")
      })
    console.log(goal.completed);
  }

/*    $scope.moveToCompleted = function(goal, index) {
    //goal.completed = true;
    goalsFactory.moveToCompleted(goal)
      .then(function(completedGoal) {
        $scope.goals[index] = completedGoal;
      })
    console.log(goal.completed);
  }*/

  // function for debugging
  $scope.wasitclicked = function(goal) {
   console.log("editable goal was clicked");
  }

  // Adds the goals to an array called array
  goalsFactory.getGoals().then(function(goals) {
    $scope.goals = goals;
  });

})