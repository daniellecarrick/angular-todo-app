app.controller('authController', function($scope, authFactory, $state){

  $scope.register = function() {
    authFactory.register($scope.user)
      .then(function() {
        // if register was successful, go to the home state
        $state.go('home');
      }, function(err) {
        // if register was unsuccessful alert them with an error message
        alert(err.data.message);
      });
    }

  $scope.login = function() {
    authFactory.login($scope.user)
      .then(function() {
        // if login was successful, go to the home state
        $state.go('home');
      }, function(err) {
        // if login was unsuccessful alert them with an error message
        alert(err.data);
      });
    }
});