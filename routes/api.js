'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
require('../lib/passport');

router.post('/auth/signup', function(req, res) {
	req.assert('email', 'Email is not valid').isEmail();
	req.assert('password', 'Password cannot be blank').len(4);
	req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		return res.status(400).json({err: errors});
	}

	var email = req.body.email;
	var password = req.body.password;
    User.findOne({ 'email' :  email },
      function(err, user) {
        if (err) return res.status(400).json({err: err});

        if (user){
          return res.status(401).json({msg: email + ' already exists'});
        }

        var newUser = new User({
			email: email,
			password: password
        });
        newUser.save(function(err) {
          if (err) return res.status(400).json({err: err});
          req.login(newUser, function(err) {
	        if (err) return res.status(400).json({err: err});
          	res.status(201).json({msg: email + ' created'});
          });
        });
      }
    );
});

router.post('/auth/login', passport.authenticate('local-login'), function(req, res) {
		res.json({msg: req.user.email + ' logged in'});
});

router.post('/auth/logout', isLoggedIn, function(req, res) {
	var email = req.user.email;
	req.logout();
	res.json({msg: email + ' logged out'});
});

router.post('/auth/destroy', isLoggedIn, function(req, res) {
	var email = req.user.email;
    User.remove({ email: email }, function(err) {
    	if (err) return res.status(400).json({err: 'user not deleted'});
    	res.json({msg: email + ' deleted'});
    });
});

router.get('/profile', isLoggedIn, function(req, res) {
	User.findOne({email: req.user.email}, function(err, user) {
		if (err) return res.status(400).json({err: 'no profile found'});
		res.json({msg: user.email});
	});
});

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	else return res.status(401).json({err: 'You must be logged in to perform this action'});
}
