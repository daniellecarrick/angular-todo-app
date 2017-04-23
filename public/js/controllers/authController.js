app.controller('authController', function($scope, $rootScope, $http){

  // old routes for logging in users ourselves, need to reinject state if we uncomment the below
/*  $scope.register = function() {
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
    }*/

    // how to have facebook auth and (do i need rootscope? yesss, because we use it below)
    $scope.logout = function() {
      console.log("you want to log out");
    // Remove the stuff you saved in local storage
    localStorage.removeItem('user');
    // Remove the currentUser from the $rootScope
    $rootScope.currentUser = null;
    // Remove the Authorization header.
    $http.defaults.headers.common.Authorization = null;
    console.log($rootScope.currentUser);
  }
});
