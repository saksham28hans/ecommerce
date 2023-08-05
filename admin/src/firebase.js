import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'; 

const firebaseConfig = {
    apiKey: "AIzaSyBqXHg2cE3vp-2t9aHH2KiPJ4zC2Gpjo4w",
    authDomain: "netflix-572f3.firebaseapp.com",
    projectId: "netflix-572f3",
    storageBucket: "netflix-572f3.appspot.com",
    messagingSenderId: "412549666031",
    appId: "1:412549666031:web:82c2b4af8d26e2da18371a",
    measurementId: "G-H3D97TB0YJ"
  };

  const app = firebase.initializeApp(firebaseConfig);

  const storage = app.storage();

  export default storage;