import keymirror from 'keymirror'
import axios from 'axios';
import firebase from '../../firebase';

export const ActionType = keymirror({
  LOAD_IMAGES: null,
});

export const uploadImage = (email, image, callback) => {
  return dispatch => {
    return axios
      .post('http://169c8f5e.ngrok.io/jj', { "key1": image })
      .then(res => {
        console.log(res.data)
        firebase.database().ref("All_Image_Uploads_Database").set({
          imageName: email,
          imageURL: image
        })
          .then(() => {
            callback(image);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      })
  }
}