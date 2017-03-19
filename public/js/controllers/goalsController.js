app.controller('goalsController', function($scope, goalsFactory){
  //window.a=$scope;
 // $scope.goalsArray = goalsFactory.goalsArray;
  /*$scope.completed = goalsFactory.completed;

  $scope.addGoal = goalsFactory.addGoal;
  $scope.moveToCompleted = goalsFactory.moveToCompleted;
  $scope.deleteGoal = goalsFactory.deleteGoal;
  $scope.updateGoal = goalsFactory.updateGoal;*/
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

/*  $scope.getGoals = goalsFactory.goalsArray.getGoals;
  $scope.goals.getGoals();*/

  $scope.addGoal = function(newgoal) {
    console.log(newgoal);
    goalsFactory.addGoal(newgoal).then(function(goal) {
      $scope.goals.push(goal);
    }, function(err) {
      console.log(err);
    });
  }

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

  goalsFactory.getGoals().then(function(goals) {
    $scope.goals = goals;
  });

})