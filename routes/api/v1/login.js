const User = require('../../../models/User');

const handle = (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: 'Missing input!' });
  }

  User.findOne({ email: email }, (err, user) => {
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
      return res.json({ success: true, message: 'Successfully logged in!' });
    }
  });
};

module.exports = handle;
