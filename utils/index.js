const functions = {
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
};

module.exports = functions;
