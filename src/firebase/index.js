import * as firebase from 'firebase';

var app = firebase.initializeApp({
  apiKey: "key",
  authDomain: "url",
  databaseURL: "url",
  projectId: "id",
  storageBucket: "url",
  messagingSenderId: "id",
  appId: "id",
  measurementId: "id"
});

export default app;