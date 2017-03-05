app.controller('goalsController', function($scope, goalsFactory){
  $scope.goals = goalsFactory.goals;
  $scope.completed = goalsFactory.completed;
  /*variables in the form*/
  $scope.goalText;;
  $scope.typeText;
  $scope.descriptionText;
  $scope.addGoal = function() {
    $scope.goals.push({goal:$scope.goalText, type: $scope.typeText, description: $scope.descriptionText});
  }
  $scope.moveToCompleted = function(goal) {
    $scope.completed.push(goal);
    var index = $scope.goals.indexOf(goal);
    $scope.goals.splice(index, 1);
    console.log("it was clicked");
  }
  $scope.delete = function(goal) {
    /*To do: add an are you sure*/
    var index = $scope.goals.indexOf(goal);
    $scope.goals.splice(index, 1);
  }
  $scope.toggleGoalsView = function() {
    $scope.selected = true;
  }
})