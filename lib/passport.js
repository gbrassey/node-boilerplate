'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  User.findOne({email: user.email}, function(err, user) {
    done(err, user);
  });
});

// passport/login.js
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    User.findOne({ 'email' :  email },
      function(err, user) {
        if (err) return done(err);

        if (!user){
          return done(null, false, 'User Not Found with email ' + email);
        }

        user.comparePassword(password, function(err, isMatch) {
          if (!isMatch) {
            return done(null, false, 'Invalid Password');
          }
          return done(null, user);
        });
      }
    );
}));
