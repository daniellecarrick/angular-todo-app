var app = angular.module('goalsList', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/partial-goals.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/partial-register.html',
      controller: 'authController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/partial-login.html',
      controller: 'authController'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '/templates/partial-dashboard.html',
      controller: 'authController'
    })

  $urlRouterProvider.otherwise('/home');
}]);