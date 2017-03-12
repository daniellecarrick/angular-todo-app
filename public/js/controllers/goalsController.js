app.controller('goalsController', function($scope, goalsFactory){
  //window.a=$scope;
  $scope.goals = goalsFactory.goals;
  $scope.completed = goalsFactory.completed;

  $scope.addGoal = goalsFactory.addGoal;
  $scope.moveToCompleted = goalsFactory.moveToCompleted;
  $scope.deleteGoal = goalsFactory.deleteGoal;
  $scope.updateGoal = goalsFactory.updateGoal;
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

  $scope.getGoals = goalsFactory.getGoals;
  $scope.getGoals();
})