'use strict';

var chai = require('chai');
var should = chai.should();
var User = require('../models/User');

var userCase;

describe('User Model', function() {
  it('should be an empty db', function(done) {
    User.find({}, function(err, users) {
      if (err) return done(err);
      users.should.be.empty;
      done();
    });
  });

  it('should create a new user', function(done) {
    userCase = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    userCase.save(function(err) {
      if (err) return done(err);
      done();
    });
  });

  it('should not create a user with the unique email', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

  it('should find user by email', function(done) {
    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
      if (err) return done(err);
      user.email.should.equal('test@gmail.com');
      done();
    });
  });

  it('should match the correct password', function(done) {
    userCase.comparePassword('password', function(err, isMatch) {
      if (err) return done(err);
      isMatch.should.be.true;
      done();
    });
  });

  it('should not match the wrong password', function(done) {
    userCase.comparePassword('pass1234', function(err, isMatch) {
      if (err) done(err);
      isMatch.should.be.false;
      done();
    });
  });


  it('should delete a user', function(done) {
    User.remove({ email: 'test@gmail.com' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});