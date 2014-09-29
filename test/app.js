'use strict';

process.env.NODE_ENV = 'test';
var request = require('supertest');
var app = require('../app.js');

describe('POST /api/signup', function() {
  it('should create a new user', function(done) {
    request(app)
      .post('/api/signup')
      .send({ 
      	'email': 'test2@gmail.com',
      	'password': 'password'
      	})
      .expect(201, done);
  });
  it('should not create duplicate user', function(done) {
    request(app)
      .post('/api/signup')
      .send({ 
      	'email': 'test2@gmail.com',
      	'password': 'password'
      	})
      .expect(401, done);
  });
});
describe('POST /api/login', function() {
  it('should login with correct credentials', function(done) {
    request(app)
      .post('/api/login')
      .send({
      	'email': 'test2@gmail.com',
		'password': 'password'
		})
	  .expect(200, done);
  });
  it('should not login with bad credentials', function(done) {
  	request(app)
      .post('/api/login')
      .send({
      	'email': 'test2@gmail.com',
		'password': 'fakepass'
		})
	  .expect(401, done);
  });
});
describe('POST /api/logout', function() {
  it('should logout', function(done) {
  	request(app)
  	  .post('/api/logout')
  	  .send({
  	  	'email': 'test2@gmail.com'
  	  })
  	  .expect(200, done);
  });
});
describe('POST /api/destroy', function() {
  it('should destroy a user', function(done) {
    request(app)
      .post('/api/destroy')
      .send({
      	'email': 'test2@gmail.com'
      })
      .expect(200, done);
  });
});