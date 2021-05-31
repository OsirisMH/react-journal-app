import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyCvm-kAlCBauFhc7FQa-hp7ESkwo93HDjg",
//   authDomain: "sql-demos-8a41d.firebaseapp.com",
//   projectId: "sql-demos-8a41d",
//   storageBucket: "sql-demos-8a41d.appspot.com",
//   messagingSenderId: "758619889207",
//   appId: "1:758619889207:web:8330aaa342833e53a0a9b2",
//   measurementId: "G-H3X35KXT24"
// };

// if ( process.env.NODE_ENV === 'test'){
//   // testing
//   firebase.initializeApp(firebaseConfigTesting);
// }
// else{
//   // dev/prod
// firebase.initializeApp(firebaseConfig);
// }
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
};