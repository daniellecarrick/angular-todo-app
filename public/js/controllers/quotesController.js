app.controller('quotesController', function($scope, quotesService) {
  $scope.quotes = quotesService.quotes;
  $scope.index = quotesService.index;
});