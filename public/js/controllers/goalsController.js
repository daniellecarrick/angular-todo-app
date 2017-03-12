app.controller('goalsController', function($scope, goalsFactory){
  //window.a=$scope;
  $scope.goals = goalsFactory.goals;
  $scope.completed = goalsFactory.completed;
  /*variables in the form*/
/*  $scope.goalText = goalsFactory.goalText;
  $scope.typeText = goalsFactory.typeText;
  $scope.descriptionText = goalsFactory.descriptionText;*/

  $scope.addGoal = goalsFactory.addGoal;
  $scope.moveToCompleted = goalsFactory.moveToCompleted;
  $scope.deleteGoal = goalsFactory.deleteGoal;
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