var app = angular.module('goalsList', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('goals', {
      url: '/goals',
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
    .state('welcome', {
      url: '/welcome',
      templateUrl: '/templates/partial-landing.html',
      controller: 'authController'
    })
    .state('auth', {
      url: '/authorization?token&name',
      controller: function($rootScope, $stateParams, $state, $http) {

        if ($stateParams.token) {
          var user = {
            name: $stateParams.name,
            token: $stateParams.token
          }
          console.log('here?')
          localStorage.setItem("user", JSON.stringify(user));
          $rootScope.currentUser = user.name;
          $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
          $state.go('home');
        }
      }
    })

  $urlRouterProvider.otherwise('/welcome');
}]);

app.run(function($rootScope, $http) {
  //retrieve user from local storage
  var user = JSON.parse(localStorage.getItem('user'));

  console.log(user);
  //if a user was retrieved set the currentUser
  if (user) {
    $rootScope.currentUser = user.name;
    $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;

  }
});