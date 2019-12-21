import keymirror from 'keymirror'
import firebase from '../../firebase';

export const ActionType = keymirror({
  LOG_IN: null,
  LOG_OUT: null,
});

export const login = (creds, callback) => {
  const { email, password } = creds;

  return dispatch => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({ type: ActionType.LOG_IN, payload: {email} });
      callback(true);
    })
    .catch(error => {
      callback(false);
      console.log(error);
    });
  }
}

export const signup = (creds, callback) => {
  const { email, password } = creds;

  return dispatch => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({ type: ActionType.LOG_IN, payload: {email} });
      callback(true);
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        callback(false, "Email is already registered!");
      } else if (error.code === 'auth/invalid-email') {
        callback(false, "Invalid email!");
      } else if (error.code === 'auth/weak-password') {
        callback(false, error.message);
      } else {
        callback(false, "Error! Please Try again!");
      }
      console.log(error);
    });
  }
}

export const logout = (callback) => {

  return dispatch => {
    dispatch({ type: ActionType.LOG_OUT });
    callback();
  }
}