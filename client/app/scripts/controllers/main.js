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
  .controller('MainController', ['$scope', 'MainFactory', 'Upload', '$mdToast',
   function($scope, mainFactory, Upload, $mdToast) {


    $scope.files = mainFactory.getFiles().query(
        function(response) {
            $scope.files = response;
            //console.log('data', response);
        },
        function(response) {
            $scope.message = 'Error: '+response.status + ' '  + response.statusText;
    });


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

  }])
