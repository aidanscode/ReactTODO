const TasksRouter = require('express').Router();

TasksRouter.use(function(req, res, next) {
  console.log('[TODO] Passed the tasks middleware');
  next();
});

TasksRouter.route('/list').get(require('./list'));
TasksRouter.route('/create').post(require('./create'));

module.exports = TasksRouter;
