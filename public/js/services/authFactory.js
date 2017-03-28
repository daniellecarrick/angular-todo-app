app.factory('authFactory', function($http) {

  var authFactory = {};

  authFactory.currentUser = {};

  authFactory.register = function(user) {
    //console.log('register user', user);
    return $http.post('/users/register', user)
      .then(function(response) {
        // the response.data object is the username so we put it on the key "username"
        authFactory.currentUser.username = angular.copy(response.data)
      });;
  };

  authFactory.login = function(user) {
    return $http.post('/users/login', user)
      .then(function(response) {
        authFactory.currentUser.username = angular.copy(response.data)
      });
  };

  authFactory.logout = function() {
    return $http.get('/users/logout')
      .then(function(response) { //need clarification
        authFactory.currentUser = null;
      });;
  }

  authFactory.getCurrentUser = function() {
    return $http.get('/users/currentuser')
      .then(function(response) { //need clarification
        console.log(response.data);
        authFactory.currentUser.username = angular.copy(response.data)
      });;
  }

  return authFactory;
});