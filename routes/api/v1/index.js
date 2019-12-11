const ApiV1Router = require('express').Router();

ApiV1Router.route('/register').post(require('./register'));
ApiV1Router.route('/login').post(require('./login'));

module.exports = ApiV1Router;
