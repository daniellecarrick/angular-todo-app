app.controller('goalsController', function($scope, goalsFactory){
  window.a=$scope;
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
  $scope.changeCompletedGoals = goalsFactory.changeCompletedGoals;
  $scope.changeActiveGoals = goalsFactory.changeActiveGoals;
  $scope.show=false;
})