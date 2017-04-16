app.factory('goalsFactory', function($http, $log){

  var goalsFactory = {}; //add boolean to schema to deal with active and completed then use a filter

  goalsFactory.getGoals = function() {
    return $http.get('/goals')
      .then(function(response) {
        return response.data;
      }, function(err) {
        console.error(err)
      });
    };

  goalsFactory.deleteGoal = function(goal) {
    return $http.delete('/goals/delete/' + goal._id)
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
        getGoals();
      }, function(err) {
        console.log(err)
      });
    };

  goalsFactory.moveToCompleted = function(goal) {
    return $http.put('/goals/' + goal._id + '/complete', goal)
      .then(function(response) {
        return response.data
      })
  }

  goalsFactory.updateGoal = function(goal) {
    return $http.put('/goals/' + goal._id, goal)
      .then(function(response) {
        return response.data
      });
  };

  return goalsFactory;
});