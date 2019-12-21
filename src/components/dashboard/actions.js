import keymirror from 'keymirror'
import axios from 'axios';
import firebase from '../../firebase';

export const ActionType = keymirror({
  LOAD_IMAGES: null,
});

export const loadImages = (email) => {
  return dispatch => {
    var ref = firebase.database().ref("All_Image_Uploads_Database");
    ref.orderByChild("imageName").equalTo(email).on("child_added", function(snapshot) {
      console.log(snapshot.val());
      dispatch({ type: ActionType.LOAD_IMAGES, payload: [snapshot.val()] })
    });
  }
}

export const uploadImage = (email, image, callback) => {
  return dispatch => {
    return axios
      .post('http://169c8f5e.ngrok.io/jj', { "key1": image })
      .then(res =>
        console.log(res.data)
      )
      // .then(res => {
      //   firebase.auth().createUserWithEmailAndPassword(email, password)
      //     .then((user) => {
      //       dispatch({ type: ActionType.LOG_IN, payload: creds });
      //       callback(true);
      //     })
      //     .catch(error => {
      //       if (error.code === 'auth/email-already-in-use') {
      //         callback(false, "Email is already registered!");
      //       } else if (error.code === 'auth/invalid-email') {
      //         callback(false, "Invalid email!");
      //       } else if (error.code === 'auth/weak-password') {
      //         callback(false, error.message);
      //       } else {
      //         callback(false, "Error! Please Try again!");
      //       }
      //       console.log(error);
      //     });
      // })
  }
}