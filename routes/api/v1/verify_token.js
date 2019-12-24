const { getUserSession } = require('../../../utils');

const handle = (req, res) => {
  let { sessionKey } = req.body;

  if (!sessionKey) {
    return res.json({ isValid: false, message: 'Missing input!' });
  }

  getUserSession(sessionKey, req.ip, userSession => {
    return res.json(userSession);
  });
};

module.exports = handle;
