const TasksRouter = require('express').Router();

TasksRouter.use(function(req, res, next) {
  console.log('[TODO] Passed the tasks middleware');
  next();
});

TasksRouter.route('/list').post(require('./list'));
TasksRouter.route('/create').post(require('./create'));
TasksRouter.route('/edit/:id').post(require('./edit'));

module.exports = TasksRouter;
