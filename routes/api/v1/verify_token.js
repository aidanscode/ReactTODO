const { validateUserSession } = require('../../../utils');

const handle = (req, res) => {
  let { sessionKey } = req.body;

  if (!sessionKey) {
    return res.json({ isValid: false, message: 'Missing input!' });
  }

  validateUserSession(sessionKey, req.ip, userSession => {
    return res.json(userSession);
  });
};

module.exports = handle;
