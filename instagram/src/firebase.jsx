import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvn9B9F4dz1uNx9jMhzFEPAC5G_3EXbSQ",
  authDomain: "instagrma-auth.firebaseapp.com",
  projectId: "instagrma-auth",
  storageBucket: "instagrma-auth.appspot.com",
  messagingSenderId: "812820536895",
  appId: "1:812820536895:web:70a587bf2b44299e40a28a"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    comments : firestore.collection('comments'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,
    // this getTimeStamp for sorting the post on basis of time
}

export const storage = firebase.storage()