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
          console.log('User Not Found with email ' + email);
          return done(null, false);
        }

        user.comparePassword(password, function(err, isMatch) {
          if (!isMatch) {
            console.log('Invalid Password');
            return done(null, false);
          }
          return done(null, user);
        });
      }
    );
}));
// passport/signup.js
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    User.findOne({ 'email' :  email },
      function(err, user) {
        if (err) return done(err);

        if (user){
          console.log(email + ' already exists');
          return done(null, false);
        }

        var newUser = new User({
         email: email,
         password: password
        });
        newUser.save(function(err) {
          if (err) return done(err);
          return done(null, newUser);
        });
      }
    );
  }
));
