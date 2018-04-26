'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngResource',
    'ngRoute',
    'ngMaterial'
  ])

  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])

  .config(function ($routeProvider) {
    $routeProvider
      
      .when('/:path*', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'main',

      })
      // .when('/files', {
      //   templateUrl: 'views/main.html',
      //   controller: 'MainController',
      //   controllerAs: 'main'
      // })
      // .when('/files/:path*', {
      //   templateUrl: 'views/main.html',
      //   controller: 'PathController',
      //   controllerAs: 'path',
      //
      // })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });
