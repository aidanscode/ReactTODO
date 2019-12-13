const UserSession = require('../../../models/UserSession');

const handle = (req, res) => {
  let { sessionKey } = req.body;

  if (!sessionKey) {
    return res.json({ success: false, message: 'Missing input!' });
  }

  UserSession.findOne({ sessionKey, isDeleted: false }, (err, session) => {
    if (err) {
      return res.json({ success: false, message: 'Server error!' });
    }
    if (session === null) {
      return res.json({ success: false, message: 'Server error!' });
    }

    session.isDeleted = true;
    session.save((err, doc) => {
      if (err) {
        return res.json({ success: false, message: 'Server error!' });
      }

      return res.json({ success: true, message: 'Successfully logged out!' });
    });
  });
};

module.exports = handle;
