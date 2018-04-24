var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var http = require('http');
var getCurrentDir = function(){
  return require('../config').homeDir + require('../config').currentUser;
};

router.get('/', function(req, res, next) {

     var currentDir = getCurrentDir();

     var query = req.query.path || '';
     if (query) currentDir = path.join(currentDir, query);

     var fileLoc = path.resolve(currentDir);
     //fileLoc = path.join(fileLoc, req.url);

      var stream = fs.createReadStream(fileLoc);

      stream.on('error', function(error) {
        console.log("err", error);
          res.writeHead(404, 'Not Found');
          res.end();
      });
      //res.status(200).set('Content-Type', 'video/MP3');
      stream.pipe(res);
});

module.exports = router;
