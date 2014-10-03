'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
require('../lib/passport');

router.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		res.status(201).json({msg: req.user.email + ' created'});
});

router.post('/login', passport.authenticate('local-login'), function(req, res) {
		res.json({msg: req.user.email + ' logged in'});
});

router.post('/logout', isLoggedIn, function(req, res) {
	var email = req.user.email;
	req.logout();
	res.json({msg: email + ' logged out'});
});

router.post('/destroy', isLoggedIn, function(req, res) {
	var email = req.user.email;
    User.remove({ email: email }, function(err) {
    	if (err) return res.status(400).json({msg: 'user not deleted'});
    	res.json({msg: email + ' deleted'});
    });
});

router.get('/profile', isLoggedIn, function(req, res) {
	User.findOne({email: req.user.email}, function(err, user) {
		if (err) return res.status(400).json({msg: 'no profile found'});
		res.json({msg: user.email});
	});
});

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	else return res.status(401).json({msg: 'You must be logged in to perform this action'});
}
