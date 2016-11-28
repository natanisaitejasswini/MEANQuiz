var app = angular.module('app', ['ngRoute','ngCookies']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/index',{
    templateUrl: 'partials/login.html',
  })
  .when('/dashboard',{
    templateUrl: 'partials/dashboard.html'
  })
  .when('/new_question',{
    templateUrl: 'partials/new_question.html'
  })
  .when('/question/:id',{
    templateUrl: 'partials/specific_question.html'
  })
  .when('/question/:id/new_answer',{
    templateUrl: 'partials/answer.html'
  })
  .otherwise({
    redirectTo: '/index'
  });
});

