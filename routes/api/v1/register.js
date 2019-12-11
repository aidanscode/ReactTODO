const User = require('../../../models/User');
const { isValidEmail } = require('../../../utils');

const handle = (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: 'Missing input!' });
  }
  if (!isValidEmail(email)) {
    return res.json({ success: false, message: 'Invalid email!' });
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
    user.save((err, doc) => {
      if (err) {
        return res.json({ success: false, message: 'System error' });
      }

      return res.json({ success: true, message: 'Account registered!' });
    });
  });
};

module.exports = handle;
