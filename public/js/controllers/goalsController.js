app.controller('goalsController', function($scope, goalsFactory){
  //window.a=$scope;
  $scope.editable = false;

  // A variable to store the goal that is being edited in case the serve f*&$ up
  $scope.temporaryGoal;
  $scope.show = false;
  // Controls the toggle between active and completed goals
  $scope.showActiveGoals = true;

/*  // need this function to hide/show add goals box bc scope goes down not up
  $scope.showAddGoal = function() {
    $scope.show = true;
    $scope.editable = true;
  }*/
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
    $scope.editable = true;
    $scope.show = true;
    var index = $scope.goals.indexOf(goalToEdit);
    $scope.temporaryGoal = angular.copy(goalToEdit);
    console.log($scope.temporaryGoal);
    console.log(goalToEdit);
   // console.log("edit goal" + goalToEdit.name);
  }

  $scope.moveToCompleted = function(goal) {
    goalsFactory.moveToCompleted(goal)
      .then(function(goal) {
        var index = $scope.goals.indexOf(goal);
        console.log(index);
        $scope.goals[index] = goal;
      }, function(err) {
        $scope.goals[index] = $scope.temporaryGoal;
        alert("move to completed goal didn't work. ask yohai")
      })
    console.log("move to completed" + goal.name);
  }

  $scope.updateGoal = function(goal) {
    goalsFactory.updateGoal(goal)
      .catch( function(err) {
        var index = $scope.goals.indexOf(goal);
        // if there is a problem on the server, revert back to the temporary goal
        $scope.goals[index] = $scope.temporaryGoal;
        alert("updated goal didn't work. ask yohai")
      })
    console.log("update goal" + goal.name);
    $scope.editable = false;
  }

  // Adds the goals to an array called array
  goalsFactory.getGoals().then(function(goals) {
    $scope.goals = goals;
  });

});
