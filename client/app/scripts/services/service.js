'use strict';

angular.module('clientApp')
  .constant('baseURL','http://localhost:3000/')
  .service('MainFactory', ['$resource', '$http', '$window', 'baseURL', '$mdToast',
  function($resource, $http, $window, baseURL, $mdToast) {

    this.getFiles = function(path) {
    	var files ={};
    	if(path)
  	 		files =  $resource(baseURL + '?path='+path);
    	else
    		files =  $resource(baseURL + '/');

      return files;
    };

    this.setPath = function(path){
      var data = path;
      var config = {
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      };
      console.log(path);
      $http.post(baseURL, data, config)
      .then(
         function(response){
           console.log(response);

         },
         function(error){
           console.log(response);
         }
      );
    };

    this.downloadFiles = function(path, IsDirectory){

    	if(path){

        var ext = path.substring(path.length-4, path.length);
        if(ext === '.zip' || !IsDirectory){
          window.open(baseURL + 'download?path='+path);
        }
        else{
          $http.get(baseURL+'files/zip?path='+path).then(
            function(success) {

              $mdToast.show(
                $mdToast.simple()
                  .textContent(success.data)
                  .position("bottom right")
                  .hideDelay(3000)
              );
              window.open(baseURL + 'download?path='+path+'.zip');
            },
            function(err){
              console.log(err);
            }
          );
        }
    	}
    	else{
    		console.log("path not set for download");
    	}
    };

    this.deleteFiles = function(path){

    	if(path){

    		console.log("path" ,path);
    		window.open(baseURL + 'delete?path='+path);
    		//window.open(baseURL + 'files/download?path='+path);
    	}
    	else{
    		console.log("path not set for download");
    	}
    };

    this.showFiles = function(path){
    	console.log("showing files");
    	if(path){

    		window.open(baseURL + 'serve?path='+path);
    	}
    	else{
    		console.log("path not set for file display");
    	}
    };

    this.toggleLoading = function(){
      var el = document.getElementById("custom-loader");
      el.classList.toggle("loader");
    };

}])
;
