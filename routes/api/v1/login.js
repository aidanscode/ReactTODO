const User = require('../../../models/User');
const UserSession = require('../../../models/UserSession');
const { generateRandomSessionKey } = require('../../../utils');

const handle = (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: 'Missing input!' });
  }

  User.findOne({ email: email }, async (err, user) => {
    if (err) {
      return res.json({ success: false, message: 'System error' });
    }
    if (!user) {
      return res.json({
        success: false,
        message: 'Invalid email/password combination!'
      });
    }

    if (!user.isValidPassword(password)) {
      return res.json({
        success: false,
        message: 'Invalid email/password combination!'
      });
    } else {
      let userSession = new UserSession({
        userId: user._id,
        ipAddress: req.ip
      });
      userSession.sessionKey = await generateRandomSessionKey();

      userSession.save((err, doc) => {
        if (err) {
          return res.json({ success: false, message: 'System error' });
        }

        return res.json({
          success: true,
          message: 'Successfully logged in!',
          sessionKey: doc.sessionKey
        });
      });
    }
  });
};

module.exports = handle;
