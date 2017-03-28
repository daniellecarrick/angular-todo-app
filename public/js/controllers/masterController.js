app.controller('masterController', function($scope, authFactory) {
  authFactory.getCurrentUser();
  console.log(authFactory.currentUser);
  $scope.currentUser = authFactory.currentUser;

});