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
      .otherwise({
        redirectTo: '/home'
      });
  });
