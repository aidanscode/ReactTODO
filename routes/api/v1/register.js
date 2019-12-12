const User = require('../../../models/User');
const UserSession = require('../../../models/UserSession');
const { isValidEmail, generateRandomSessionKey } = require('../../../utils');

const handle = (req, res) => {
  let { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm) {
    return res.json({ success: false, message: 'Missing input!' });
  }
  if (!isValidEmail(email)) {
    return res.json({ success: false, message: 'Invalid email!' });
  }
  if (password !== passwordConfirm) {
    return res.json({ success: false, message: 'Passwords do not match!' });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return res.json({ success: false, message: 'System error' });
    }
    if (existingUser) {
      return res.json({
        success: false,
        message: 'A user already exists with this email address!'
      });
    }

    let user = new User({
      name: name,
      email: email
    });
    user.password = user.generateHash(password);
    user.save(async (err, doc) => {
      if (err) {
        return res.json({ success: false, message: 'System error' });
      }

      let userSession = new UserSession({
        userId: doc._id
      });
      userSession.sessionKey = await generateRandomSessionKey();
      userSession.save((err, sessionDoc) => {
        if (err) {
          return res.json({ success: false, message: 'System error' });
        }

        return res.json({
          success: true,
          message: 'Account registered!',
          sessionKey: sessionDoc.sessionKey
        });
      });
    });
  });
};

module.exports = handle;
