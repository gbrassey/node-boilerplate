'use strict';

process.env.NODE_ENV = 'test';
var app = require('../app.js');
var request = require('supertest');
var agent = request.agent(app);

describe('POST /api/signup', function() {
  it('should create a new user', function(done) {
    request(app)
      .post('/api/auth/signup')
      .send({
      	'email': 'test2@gmail.com',
      	'password': 'password',
      	'confirmPassword': 'password'
    	})
      .expect(201, done);
  });
  it('should not create duplicate user', function(done) {
    request(app)
      .post('/api/auth/signup')
      .send({
      	'email': 'test2@gmail.com',
      	'password': 'password',
      	'confirmPassword': 'password'
    	})
      .expect(401, done);
  });
});
describe('POST /api/login', function() {
  it('should login with correct credentials', function(done) {
  	agent
      .post('/api/auth/login')
      .send({
      	'email': 'test2@gmail.com',
				'password': 'password'
			})
		  .expect(200, done);
  });
  it('should not login with bad credentials', function(done) {
  	request(app)
      .post('/api/auth/login')
      .send({
      	'email': 'test2@gmail.com',
				'password': 'fakepass'
			})
		  .expect(401, done);
  });
});
describe('GET /api/profile', function() {
	it('should return profile data while logged in', function(done) {
		agent
		  .get('/api/profile')
		  .expect(200, done);
	});
});
describe('POST /api/logout', function() {
  it('should logout', function(done) {
  	agent
  	  .post('/api/auth/logout')
  	  .send({
  	  	'email': 'test2@gmail.com'
  	  })
  	  .expect(200, done);
  });
});
describe('POST /api/destroy', function() {
  it('should log in to test destroy', function(done) {
  	agent
      .post('/api/auth/login')
      .send({
      	'email': 'test2@gmail.com',
				'password': 'password'
		  })
		  .expect(200, done);
  });
  it('should destroy a user', function(done) {
    agent
      .post('/api/auth/destroy')
      .expect(200, done);
  });
});
