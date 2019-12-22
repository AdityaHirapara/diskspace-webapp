import keymirror from 'keymirror'
import axios from 'axios';
import firebase from '../../firebase';

export const ActionType = keymirror({
  LOAD_IMAGES: null,
});

export const uploadImage = (email, image, callback) => {
  return dispatch => {
    return axios
      .post('http://811035a1.ngrok.io/jj', { "key1": image })
      .then(res => {
        function calculateImageSize(base64String){
          let padding, inBytes, kbytes, base64StringLength;
          if(base64String.endsWith("==")) padding = 2;
          else if (base64String.endsWith("=")) padding = 1;
          else padding = 0;
      
          base64StringLength = base64String.length;
          console.log(base64StringLength)
          inBytes =(base64StringLength / 4 ) * 3 - padding;
          console.log(inBytes);
          kbytes = inBytes / 1000;
          return kbytes;
        }

        firebase.database().ref("All_Image_Uploads_Database/").push({
          imageName: email,
          imageURL: res.data,
          size: calculateImageSize(res.data)
        })
          .then(() => {
            callback(true);
          })
          .catch(error => {
            console.log(error);
            callback(false);
          });
      })
      .catch(error => {
        console.log(error);
        callback(false);
      })
  }
}