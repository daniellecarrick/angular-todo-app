app.factory('goalsFactory', function($http, $log){

  var goalsFactory = {}; //add boolean to schema to deal with active and completed then use a filter

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
/*
  var moveToCompleted = function(goal) {
    completed.push(goal);
    var index = goals.indexOf(goal);
    goals.splice(index, 1);
    console.log("fact was clicked");
  }*/


  goalsFactory.getGoals = function() {
    return $http.get('/goals')
      .then(function(response) {
        return response.data;
      }, function(err) {
        console.error(err)
      });
    };

  goalsFactory.deleteGoal = function(goal) {
    return $http.delete('/delete/' + goal._id)
      .then(function(response) {
        return response.data;
        /*var index = goals.indexOf(goal);
        goals.splice(index, 1);*/
      }, function(err) {
        console.log(err)
      });
    };

  goalsFactory.addGoal = function(goal) {
    return $http.post('/goals', goal)
      .then(function(response) {
        return response.data;
        /*goals.push(response.data);*/
        getGoals();
        console.log(goals);
      }, function(err) {
        console.log(err)
      });
    };

  goalsFactory.updateGoal = function(goal) {
    console.log("updateGoal was clicked")
  }

  return goalsFactory;
});