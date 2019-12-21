import keymirror from 'keymirror'
import axios from 'axios';
import firebase from '../../firebase';

export const ActionType = keymirror({
  LOAD_IMAGES: null,
});

export const uploadImage = (email, image, callback) => {
  return dispatch => {
    return axios
      .post('http://36df45ae.ngrok.io/jj', { "key1": image })
      .then(res => {
        firebase.database().ref("All_Image_Uploads_Database/").push({
          imageName: email,
          imageURL: image
        })
          .then(() => {
            callback();
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