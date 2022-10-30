// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_DATABASEURL,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnvironments()


// Your web app's Firebase configuration
//Dev/Prod
/* const firebaseConfig = {
    apiKey: "AIzaSyAyAX_Cr-iWg8sneDM4oqWDg4PO_xSjem4",
    authDomain: "journal-app-1fbd9.firebaseapp.com",
    projectId: "journal-app-1fbd9",
    storageBucket: "journal-app-1fbd9.appspot.com",
    messagingSenderId: "518782606224",
    appId: "1:518782606224:web:deb1081ffaf7cf14a5f115"
}; */

const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    databaseURL: VITE_DATABASEURL,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID
  };

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)