const { getUserSession } = require('../../../../utils');
const Task = require('../../../../models/Task');
const mongoose = require('mongoose');

const handle = (req, res) => {
  let { sessionKey } = req.body;
  let { id } = req.params;

  if (!sessionKey || !id) {
    return res.json({ success: false, message: 'Missing input!' });
  }

  getUserSession(sessionKey, userSession => {
    //This shouldn't happen because we should have already passed the middleware at this point
    if (userSession == null) {
      return res.json({ success: false, message: 'Invalid session token' });
    }

    console.log('Searching for ' + id);
    Task.findOne({ _id: id, userId: userSession.userId }, (err, task) => {
      if (err || task == null) {
        return res.json({ success: false, message: 'Task not found!' });
      }

      if (req.body.title) {
        task.title = req.body.title;
      }
      if (req.body.description) {
        task.description = req.body.description;
      }
      if (req.body.isDeleted) {
        task.isDeleted = req.body.isDeleted;
      }

      task.save((err, doc) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Invalid input for task update!'
          });
        }

        return res.json({ success: true, message: 'Success', data: doc });
      });
    });
  });
};

module.exports = handle;
