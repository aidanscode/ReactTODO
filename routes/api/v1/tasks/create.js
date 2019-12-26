const { getUserSession } = require('../../../../utils');
const Task = require('../../../../models/Task');

const handle = (req, res) => {
  let { sessionKey, title, description } = req.body;

  if (!sessionKey || !title) {
    return res.json({ success: false, message: 'Missing input!' });
  }

  getUserSession(sessionKey, userSession => {
    //This shouldn't happen because we should have already passed the middleware at this point
    if (userSession == null) {
      return res.json({ success: false, message: 'Invalid session token' });
    }

    let task = new Task({
      title: title,
      description: description,
      userId: userSession.userId
    });
    task.save((err, task) => {
      if (err) {
        return res.json({ success: false, message: 'Server error' });
      }

      return res.json({ success: true, message: 'Success', data: task });
    });
  });
};

module.exports = handle;
