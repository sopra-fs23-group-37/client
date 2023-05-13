import { initializeApp } from "firebase/app";import 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { getFirestore, serverTimestamp, collection} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: "AIzaSyBMe1eqRJN3euoqwYLrDkMMlBtIpg9SfqY",
  authDomain: "two-and-ten3.firebaseapp.com",
  projectId: "two-and-ten3",
  storageBucket: "two-and-ten3.appspot.com",
  messagingSenderId: "80624034924",
  appId: "1:80624034924:web:823d71e93483633c04a449",
  measurementId: "G-10SW2CLEM9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);
const timestamp = serverTimestamp(firebaseApp);

export {storage, ref, uploadBytes, getDownloadURL, firestore, timestamp, collection};
