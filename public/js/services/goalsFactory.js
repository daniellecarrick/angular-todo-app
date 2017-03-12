app.factory('goalsFactory', function($http, $log){

  var goals = [];

  var completed = [
  {
    name: "Being born",
    type: "personal",
    description: "A tough day but a good day #thanksmom",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    name: "Run a marathon",
    type: "personal",
    description: "The more you run, the more you can eat",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    name: "Go to Israel",
    type: "travel",
    description: "living my best life",
    image: "http://lorempixel.com/400/300/cats/"
  }
  ];

  var moveToCompleted = function(goal) {
    completed.push(goal);
    var index = goals.indexOf(goal);
    goals.splice(index, 1);
    console.log("fact was clicked");
  }

  var getCompleted = function() {

  }

  var getGoals = function() {
    return $http.get('/goals')
      .then(function(response) {
        angular.copy(response.data, goals);
        console.log(response.data);
      }, function(err) {
        console.error(err)
      });
    };

  var deleteGoal = function(goal) {
    return $http.delete('/delete/' + goal._id)
      .then(function(response) {
        console.log(response);
        var index = goals.indexOf(goal);
        goals.splice(index, 1);
      }, function(err) {
        console.log(err)
      });
    };

  var addGoal = function(goal) {
    return $http.post('/goals', goal)
      .then(function(response) {
        console.log(response);
        goals.push(response.data);
        getGoals();
        console.log(goals);
      }, function(err) {
        console.log(err)
      });
    };

  var updateGoal = function(goal) {
    console.log("updateGoal was clicked")
  }

  return {
    goals: goals,
    completed: completed,
    moveToCompleted: moveToCompleted,
    deleteGoal: deleteGoal,
    addGoal: addGoal,
    getGoals: getGoals,
    updateGoal: updateGoal
  };
});