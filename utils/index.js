const UserSession = require('../models/UserSession');

const functions = {
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  async generateRandomSessionKey() {
    let key = 0;
    let existingSession = 0;

    do {
      key =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);

      existingSession = await UserSession.findOne({ sessionKey: key }).exec();
    } while (existingSession !== null);

    return key;
  }
};

module.exports = functions;
