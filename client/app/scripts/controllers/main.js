'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .constant('baseURL','http://localhost:3000/')
  .controller('MainController', ['$scope', '$routeParams', 'MainFactory', '$mdToast', '$window',
   function($scope, $routeParams, mainFactory, $mdToast, $window) {

    $scope.files = mainFactory.getFiles($routeParams.path).query(
        function(response) {
            $scope.files = response;
            //$scope.basePath = $routeParams.path;
        },
        function(response) {
            $scope.message = 'Error: '+response.status + ' '  + response.statusText;
        }
    );

    $scope.format = function(abc){
      return abc.replace(/\s+/g, "-");
    };

    $scope.download = function(path, IsDirectory){
      console.log("preparing to download");
      $mdToast.show(
        $mdToast.simple()
          .textContent("zipping files. Please Wait")
          .position('bottom right')
          .hideDelay(3000)
      );
      mainFactory.downloadFiles(path, IsDirectory);
    };

    $scope.delete = function(path){
      console.log("preparing to delete");
      //mainFactory.deleteFiles(path);
      mainFactory.getFiles(path).delete();
    };

    $scope.showFile = function(path){
      console.log("preparing to show from PathController");
      mainFactory.showFiles(path);
    };

    $scope.getFileIcon = function(ext){
      //console.log(ext);
      if(ext === 0)
        return 'icon-folder';
      var extList = {
        '.zip' : 'icon-book',
        '.mp3' : 'icon-file-music',
        '.aac' : 'icon-file-music',
        '.wav' : 'icon-file-music',
        '.wma' : 'icon-file-music',
        '.mp4' : 'icon-play',
        '.avi' : 'icon-play',
        '.flv' : 'icon-play',
        '.wmv' : 'icon-play',
        '.pdf' : 'icon-file-pdf',
        '.word': 'icon-file-word',
        '.xlsx': 'icon-file-excel'
      };
      if( ext in extList){
        //console.log("in the list", extList[ext]);
        return extList[ext];
      }
      else {
        return 'icon-file-empty';
      }
    };

    $scope.goBack = function(){
      console.log("going back", $routeParams.path);
      var lastSlashIndex = $routeParams.path.lastIndexOf('/');
      var newPath = '';
      if(lastSlashIndex !== -1){
        newPath =  $routeParams.path.substr(0, lastSlashIndex);
        //var currentPath = $routeParams.path.substr(lastSlashIndex+1, $routeParams.path.length);
        //if(currentPath !== "home")
        $window.location.href =  '#/' + newPath;
      }

      //$scope.basePath = newPath;
    };

    $scope.sendPath = function(){
    	//console.log($scope.basePath);
    	if($scope.basePath){
        $window.location.href = '#' + $scope.basePath;
        $scope.files = mainFactory.getFiles($scope.basePath).query(
            function(response) {
                $scope.files = response;
                //console.log('data', response);
            },
            function(response) {
                $scope.message = 'Error: '+response.status + ' '  + response.statusText;
            }
        );
      }

    };

  }])
  ;
