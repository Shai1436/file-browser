var express = require('express');
var bodyParser = require('body-parser');
var fileRouter = express.Router();
//var File = require('../models/file');
var fs = require('fs');
var path = require('path');
var http = require('http');
var _ = require('lodash');
var dateFormat = require('dateformat');
var zipFolder = require('zip-folder');
var fsUtils = require("nodejs-fs-utils");
var s;

fileRouter.use(bodyParser.json());

var getCurrentDir = function(){
  return require('../config').homeDir;
};

var calcSize = function(size){
  const MB = 1024 * 1024;
  const KB = 1024;
  const GB = MB * 1024;
  if(size > GB)
    return (size/GB).toFixed(2) + " GB";
  else if(size > MB)
    return (size/MB).toFixed(2) + " MB";
  else if (size > KB)
    return (size/KB).toFixed(2) + " KB";
  else
    return size + " Bytes";
};

var deleteFile = function(path){

  fsUtils.rmdirsSync(path, {
      skipErrors : true
    }, function(err){
      if(err){
        console.log(err);
      }
  });
}


fileRouter.route('/')
	.get(function(req, res, next) {
	  var currentDir = getCurrentDir();
	 	var query = req.query.path || '';
	 	if (query)
        currentDir = '/'+ query;
	 	console.log("browsing ", currentDir);
	 	fs.readdir(currentDir, function (err, files) {
		    if (err) {
		    	console.log("Inside error block", err);
				//res.download(currentDir);
		    }
		    else{

		    console.log("Inside fileRouter");
		    var data = [];

		    files.filter(function (file) {
		          return true;
		    })
		    .forEach(function (file) {
		        try {

							//console.log("file", file);
							var isDirectory = fs.statSync(path.join(currentDir,file)).isDirectory();
							var mtime = 0;
							mtime = fs.statSync(path.join(currentDir,file)).mtime ;

							mtime = new Date(mtime);
							mtime = dateFormat(mtime);
							if (isDirectory) {

								//console.log("size", size);
								data.push({ Name : file, Ext : 0, IsDirectory: true, Path : path.join(query, file), Size: 0, Mtime : mtime});
							} else {
								var ext = path.extname(file);
								var size =  calcSize(fs.statSync(path.join(currentDir,file)).size);
								data.push({ Name : file, Ext : ext, IsDirectory: false, Path : path.join(query, file), Size:size, Mtime : mtime});
							}

		        } catch(e) {
		          console.log("error", e);
		        }

		      });
		      data = _.sortBy(data, function(f) { return f.Name });
		      res.json(data);
		      //res.render('files', { title: 'Files' , fileList: data });
		      //res.redirect('lib/template.html');

		    }

	    });

	})

  .post(function(req, res, next) {

	  var path = Object.keys(req.body)[0];
    console.log("setting path", Object.keys(req.body)[0]);
    require('../config').setPath(path);
    res.end();

	})

	.delete(function(req, res, next) {


		var currentDir = getCurrentDir();
		var query = req.query.path || '';

	 	if (query) currentDir = '/'+ query;

	 	console.log("query", query);
    deleteFile(currentDir);

  	console.log("files  deleted");
  	//s.emit("reload", null);
    res.end("file deleted");
  });

fileRouter.route('/download')
	.get(function(req, res, next) {

		var currentDir = getCurrentDir();
		var query = req.query.path || '';

	 	if (query) currentDir = '/'+ query;
    var ext = currentDir.substring(currentDir.length-4, currentDir.length);
    //console.log("EXT", ext);
    if(ext === '.zip'){
        res.download(currentDir);
        setTimeout(function(){
            deleteFile(currentDir);
        }, 2000);
    }
    else{
        res.download(currentDir);
    }

	});

fileRouter.route('/zip')
  .get(function(req, res, next) {

    var currentDir = getCurrentDir();
    var query = req.query.path || '';

    if (query) currentDir = '/'+ query;

    var file = currentDir+'.zip';
    zipFolder(currentDir, file, function(err) {
      if(err) {
        console.log('oh no!', err);
        res.end("An error occured");
      } else {
        console.log('EXCELLENT');
        res.end("file zipped successfully now downloading");
      }
    });
  });

module.exports = fileRouter;
