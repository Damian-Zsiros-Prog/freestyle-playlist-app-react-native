import firebase from "firebase";

import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAAQEq5QvVnCbATlaO7XsE6xCmqeCXYWtk",
  authDomain: "freestyle-playlist.firebaseapp.com",
  projectId: "freestyle-playlist",
  storageBucket: "freestyle-playlist.appspot.com",
  messagingSenderId: "1084661970960",
  appId: "1:1084661970960:web:3baa408b2b9d0fb487b295",
  measurementId: "G-T9BMTWLSW7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};
