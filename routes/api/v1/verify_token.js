const UserSession = require('../../../models/UserSession');

const handle = (req, res) => {
  let { sessionKey } = req.body;

  if (!sessionKey) {
    return res.json({ isValid: false, message: 'Missing input!' });
  }

  UserSession.findOne(
    { sessionKey: sessionKey, isDeleted: false },
    (err, session) => {
      if (err) {
        return res.json({ isValid: false, message: 'Server error!' });
      }

      if (session === null) {
        return res.json({ isValid: false, message: 'Session is not valid!' });
      }

      //Session exists and is not deleted, check if has expired
      let lastUpdatedAt = session.updatedAt;
      let now = new Date();
      lastUpdatedAt.setDate(lastUpdatedAt.getDate() + 7); //Add one week to date

      if (now > lastUpdatedAt) {
        //Over 1 week since last updated
        session.isDeleted = true;
        session.save((err, doc) => {
          if (err) {
            return res.json({ isValid: false, message: 'Server error!' });
          }

          return res.json({ isValid: false, message: 'Session is not valid!' });
        });
      } else {
        //Key has not yet expired, update updatedAt and return valid
        session.updatedAt = Date.now();
        session.save((err, doc) => {
          if (err) {
            return res.json({ isValid: false, message: 'Server error!' });
          }

          return res.json({ isValid: true, message: 'Session is valid' });
        });
      }
    }
  );
};

module.exports = handle;
