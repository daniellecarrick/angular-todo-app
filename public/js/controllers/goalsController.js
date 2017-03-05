app.controller('goalsController', function($scope, goalsFactory){
  $scope.goals = goalsFactory.goals;
  console.log("we work");
})