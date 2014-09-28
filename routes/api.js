'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/signup', function(req, res) {
	var user = new User({
		email: req.body.email,
		password: req.body.password
	});
	user.save(function(err) {
		if (err) return res.status(401).json({msg: err});
		res.status(201).json({msg: 'user created'});
	});
});

router.post('/destroy', function(req, res) {
    User.remove({ email: req.body.email }, function(err) {
    	if (err) return res.status(401).json({msg: 'user not deleted'});
    	res.status(200).json({msg: 'user deleted'});
    });
});

module.exports = router;
