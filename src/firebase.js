import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyCVKslry02a7W-mFSKaGUkNn5IKnquKH3E",
  authDomain: "chatwebapp-eae63.firebaseapp.com",
  databaseURL: "https://chatwebapp-eae63-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatwebapp-eae63",
  storageBucket: "chatwebapp-eae63.appspot.com",
  messagingSenderId: "1047865126610",
  appId: "1:1047865126610:web:5f7f93aa793b2f925f870b",
  measurementId: "G-8GKWRMMGFR"
};

firebase.initializeApp(firebaseConfig);

export default firebase;