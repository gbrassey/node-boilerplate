'use strict';

var User = require('../models/user');

User.find({}).remove(function() {
	User.create({
		name: 'Test User',
		email: 'test@test.com',
		password: 'test'
	}, {
		name: 'George',
		email: 'gbrassey@gmail.com',
		password: 'password'
	}, function() {
			console.log('finished populating users');
		}
	);
});
