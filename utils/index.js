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
  },

  async validateUserSession(sessionKey, ipAddress, callback) {
    let userSession = await UserSession.findOne({
      sessionKey: sessionKey,
      ipAddress: ipAddress,
      isDeleted: false
    }).exec();

    if (userSession === null) {
      callback({ isValid: false, message: 'Session is not valid!' });
      return;
    }

    //Session exists and is not deleted, check if has expired
    let lastUpdatedAt = userSession.updatedAt;
    let now = new Date();
    lastUpdatedAt.setDate(lastUpdatedAt.getDate() + 7); //Add one week to date

    if (now > lastUpdatedAt) {
      //Over 1 week since last updated
      userSession.isDeleted = true;
      userSession.save((err, doc) => {
        if (err) {
          callback({ isValid: false, message: 'Server error!' });
          return;
        }

        callback({ isValid: false, message: 'Session is not valid!' });
        return;
      });
    } else {
      //Key has not yet expired, update updatedAt and return valid
      userSession.updatedAt = Date.now();
      userSession.save((err, doc) => {
        if (err) {
          callback({ isValid: false, message: 'Server error!' });
          return;
        }

        callback({ isValid: true, message: 'Session is valid' });
        return;
      });
    }
  },

  async getUserSession(sessionKey, callback) {
    let userSession = await UserSession.findOne({
      sessionKey: sessionKey,
      isDeleted: false
    }).exec();

    if (userSession === null) {
      callback(null);
      return;
    }

    //Session exists and is not deleted, check if has expired
    let lastUpdatedAt = userSession.updatedAt;
    let now = new Date();
    lastUpdatedAt.setDate(lastUpdatedAt.getDate() + 7); //Add one week to date

    if (now > lastUpdatedAt) {
      //Over 1 week since last updated
      userSession.isDeleted = true;
      userSession.save((err, doc) => {
        if (err) {
          callback(null);
          return;
        }

        callback(null);
        return;
      });
    } else {
      //Key has not yet expired, update updatedAt and return valid
      userSession.updatedAt = Date.now();
      userSession.save((err, doc) => {
        if (err) {
          callback(null);
          return;
        }

        callback(doc);
        return;
      });
    }
  }
};

module.exports = functions;
