var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI||'mongodb://localhost/myfacespace');
//mongoose.connect('mongodb://localhost/myfacespace');

var userSchema = mongoose.Schema({
    username: String,
    bgdColor: String,
    textColor: String,
    boxColor: String
});

var User = mongoose.model('User', userSchema);

exports.User = User;
