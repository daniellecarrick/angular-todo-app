app.factory('goalsFactory', function($http, $log){

  var goals = [
  /*{
    name: "Hike the PCT",
    type: "travel",
    description: "Cheryl strayed is BAE",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    name: "Start my own business",
    type: "career",
    description: "Time to put the business degree to use",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    name: "Plant a garden",
    type: "project",
    description: "Plants are dope",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    name: "Live abroad",
    type: "travel",
    description: "For ze experience",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    name: "Go skydiving",
    type: "experience",
    description: "No time for fear",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    name: "Adopt a dog",
    type: "project",
    description: "Dogs are hella cute",
    image: "http://lorempixel.com/400/300/cats/"
  }*/
  ];

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

/*  var deleteGoal = function(goal) {
    //To do: add an are you sure
    var index = goals.indexOf(goal);
    goals.splice(index, 1);
    console.log(goals);
  }*/

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
    return $http.put('/goals/' + goal.id)
      .then(function(response) {
        console.log(response);
        goals.push(goal);
      }, function(err) {
        console.log(err)
      });
    };
  return {
    goals: goals,
    completed: completed,
    moveToCompleted: moveToCompleted,
    deleteGoal: deleteGoal,
    addGoal: addGoal,
    getGoals: getGoals
  };
});