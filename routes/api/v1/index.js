const ApiV1Router = require('express').Router();

ApiV1Router.route('/register').post(require('./register'));
ApiV1Router.route('/login').post(require('./login'));
ApiV1Router.route('/verify_token').post(require('./verify_token'));
ApiV1Router.route('/logout').post(require('./logout'));

ApiV1Router.use('/tasks', require('./tasks'));

module.exports = ApiV1Router;
