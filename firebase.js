// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZROPou6rz-dq4rc9eV3H5e0rewg0O6fs",
  authDomain: "chat-app-9cd1d.firebaseapp.com",
  projectId: "chat-app-9cd1d",
  storageBucket: "chat-app-9cd1d.appspot.com",
  messagingSenderId: "282985019892",
  appId: "1:282985019892:web:f3c93ab7a5dd53ea9d21a1",
  measurementId: "G-GY6F4WXXCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
