var models = require('../models');
var User = models.User;

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.changeOptions = function(req, res){
  console.log(req.body);
  //res.send(req.body);
  //user = req.session.user;
  //console.log(user);
  User.update({'username':req.session.user['username']}, {'bgdColor':req.body['bgColorText'], 'textColor':req.body['textColorText'], 'boxColor':req.body['boxColorText']}, function(err) {
    if (err) {
          return console.log("error we couldn't save your settings");
    }
    req.facebook.api('/me/picture?type=large&redirect=false', function(err, data) {
    user1 = User.find({'username':req.session.user['username']}).exec(function(err, user1) {
      console.log(user1);
      res.render("myspace", {title:"Hello " + user1[0].username + '!', pic: data.data.url, user: user1[0]});
        });
  });
  });
};

exports.destroy = function(req, res) {
  console.log(req.session);
  req.session.destroy();
  console.log(req.session);
  res.redirect('/');
}

//   user1 = User.find({'username':req.session.user['username']}).exec(function(err, user1) {
//     console.log(user1);
//      req.facebook.api('/me/picture?type=large&redirect=false', function(err, data) {
//     user1.bgdColor = req.body['bgColorText'];
//     user1.textColor = req.body['textColorText'];
//     user1.boxColor = req.body['boxColorText'];
//     user1.save(function (err) {
//         if (err) {
//           return console.log("error we couldn't save your settings");
//         };
//         res.render("myspace", {title:"Hello " + user1.username + '!', pic: data.data.url, user: user1});
//         }); 
//   });
//   });
// };

exports.show = function (req, res) {
  req.facebook.api('/me', function(err, person) {
  req.facebook.api('/me/picture?type=large&redirect=false', function(err, data) {
  existingUser = User.find({'username':person.name}).exec(function(err, existingUser) {
  	if (existingUser.length == 0) {
		var newUser = new User({'username':person.name, bgdColor:'blue', textColor:'red', boxColor:'green'});
	    newUser.save(function (err) {
	      if (err) {
	        return console.log("error we couldn't create your user");
	      };
	      req.session.user = newUser;
	      //res.redirect("/");
	      //res.render("myspace", {title:"Hello " + person.name + '!', pic: data.data.url, user: user});
	      res.render("myspace", {title:"Hello " + person.name + '!', pic: data.data.url, user: newUser});
	    });
	}
    else {
    	req.session.user = existingUser[0];
    	//res.redirect("/");
    	res.render("myspace", {title:"Hello " + person.name + '!', pic: data.data.url, user: existingUser[0]});
    }
  });
    //res.render("myspace", {title:"Hello " + person.name + '!', pic: data.data.url, user: user});
  });
});
};