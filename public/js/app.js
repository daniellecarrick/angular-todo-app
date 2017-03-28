var app = angular.module('goalsList', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/mainTemplate.html'
    })
    /*
    .state('beer', {
      url: '/beers/:id',
      templateUrl: '/templates/beer.html',
    })*/
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'authController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'authController'
    })

  $urlRouterProvider.otherwise('/home');
}]);