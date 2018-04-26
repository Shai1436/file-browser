var Configs = module.exports = {

    'secretKey': '12345-67890-09876-54321',
    'mongoUrl' : 'mongodb://localhost:27017/fileBrowser',

    'homeDir': '/home/',
    setPath : function(path){
      if(path)
        Configs.homeDir = path;
    }

}
