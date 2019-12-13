import { notify } from 'react-notify-toast';

export const sendNotification = (type, message) => {
  switch (type) {
    case 'success':
      notify.show(message, 'success', 3000);
      break;
    case 'error':
      notify.show(message, 'error', 3000);
      break;
    default:
      break;
  }
};

export const initializeLoginSession = async callback => {
  let initializedSession = {
    isLoggedIn: false,
    session: null
  };

  let sessionKey = localStorage.getItem('session-key');
  if (sessionKey === null) {
    callback(initializedSession);
    return;
  }

  //sessionKey is set, check if is valid
  fetch('/api/v1/verify_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sessionKey: sessionKey })
  })
    .then(result => result.json())
    .then(response => {
      if (!response.isValid) {
        localStorage.removeItem('session-key');
        callback(initializedSession);
        return;
      }

      initializedSession.isLoggedIn = true;
      initializedSession.session = sessionKey;
      callback(initializedSession);
    });
};

export const endSession = async callback => {
  let sessionKey = localStorage.getItem('session-key');
  if (sessionKey === null) {
    callback(false);
    return;
  }

  fetch('/api/v1/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sessionKey: sessionKey })
  })
    .then(result => result.json())
    .then(response => {
      callback(response.success);
    });
};
