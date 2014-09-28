'use strict';

var config = {};

switch (process.env.NODE_ENV) {
	case 'test':
		config.mongodb = 'mongodb://localhost/test';
		break;
	case 'development':
		config.mongodb = 'mongodb://localhost/events-chat-dev';
		config.seed = true;
		break;
	case 'production':
		config.mongodb = 'mongodb://localhost/events-chat';
		break;
}

module.exports = config;