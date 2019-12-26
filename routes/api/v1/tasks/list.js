const Task = require('../../../../models/Task');
const UserSession = require('../../../../models/UserSession');

const handle = (req, res) => {
  let { sessionKey } = req.body;

  if (!sessionKey) {
    return res.json({ success: false, message: 'Missing input!' });
  }

  UserSession.findOne({ sessionKey }, (err, session) => {
    if (err) {
      return res.json({ success: false, message: 'Server error!' });
    }

    Task.find({ userId: session.userId, isDeleted: false }, (err, tasks) => {
      if (err) {
        return res.json({ success: false, message: 'Server error!' });
      }

      tasks = tasks.map(t => {
        let newTask = {
          _id: t._id,
          title: t.title,
          description: t.description,
          createdAt: t.createdAt.toLocaleString()
        };

        return newTask;
      });

      return res.json({ success: true, message: 'Success', data: tasks });
    });
  });
};

module.exports = handle;
