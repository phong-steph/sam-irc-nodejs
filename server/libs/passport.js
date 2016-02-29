var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.use(new Strategy({
  // passReqToCallback: true
}, function(username, password, cb) {
    User.findByUsername(username)
    .then(function(user){
      if (!user || user.password != password){
        return cb(null, false);
      }
      return cb(null, user);
    });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id)
    .then(function(user) {
      cb(null, user);
    }).catch(function(err) {
      return cb(err);
    });
  });

module.exports = passport;
