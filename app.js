var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , Facebook = require('facebook-node-sdk');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session('your secret here'));
  app.use(Facebook.middleware({ appId: '107606062755252', secret: '828b2b701588d438edb410173ec87eb0' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// app.get('/', Facebook.loginRequired(), function (req, res) {
//   req.facebook.api('/me', function(err, user) {
//   req.facebook.api('/me/picture?type=large&redirect=false', function(err, data) {
//     console.log("picture", data);
//     //res.writeHead(200, {'Content-Type': 'text/plain'});
//     //res.redirect(data.data.url);
//     //console.log(user.name);
//     res.render("myspace", {title:"Hello " + user.name + '!', pic: data.data.url});
//   });
// });
// });

app.get('/', Facebook.loginRequired(), user.show);
app.get('/users', user.list);
app.post('/changeOptions', user.changeOptions);
app.get('/destroy', user.destroy)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
