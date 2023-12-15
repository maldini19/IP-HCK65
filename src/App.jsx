import { useState, useRef } from 'react'
import './App.css'
import PropTypes from 'prop-types';
import googleLogo from './image/icons8-google-48.png'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {deleteDoc, doc, updateDoc } from 'firebase/firestore'
// import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getStorage } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, deleteMessage, editMessage } from './actions';

firebase.initializeApp({
  apiKey: "AIzaSyCVKslry02a7W-mFSKaGUkNn5IKnquKH3E",
  authDomain: "chatwebapp-eae63.firebaseapp.com",
  databaseURL: "https://chatwebapp-eae63-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatwebapp-eae63",
  storageBucket: "chatwebapp-eae63.appspot.com",
  messagingSenderId: "1047865126610",
  appId: "1:1047865126610:web:5f7f93aa793b2f925f870b",
  measurementId: "G-8GKWRMMGFR"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

// console.log(firestore, "<<<<<<<<<<<<<<<<<<<<<");

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>DisCrod💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
  </div>
  )
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <h1 className="header">DisCrod💬</h1>
      <button className="sign-in" onClick={signInWithGoogle}>
        <img src={googleLogo} alt="Google Sign-In" />
        Sign in with Google
      </button>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const dummy = useRef();
  const [image, setImage] = useState(null);
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const dispatch = useDispatch();
  const message = useSelector(state => state.messages);
  

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault();
  
    const { uid, photoURL } = auth.currentUser;
  
    if (image) {
      const storageRef = getStorage()
      const imageRef = storageRef.child(`${uid}/${image.name}`);
      await imageRef.put(image);
      const imageUrl = await imageRef.getDownloadURL();
  
      // console.log(storageRef, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        edited: false,
        editedAt: null,
        imageUrl
      });
    } else {
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        edited: false,
        editedAt: null,
      });
    }
    
    dispatch(addMessage(messagesRef));

    setFormValue('');
    setImage(null);
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };  

return (
  <>
    <main>
      {messages && messages.map(msg => (
        <ChatMessage
          key={msg.id}
          message={msg}
        />
      ))}
      <span ref={dummy}></span>
    </main>

    <form onSubmit={sendMessage}>
  <input
    type="text"
    value={formValue}
    onChange={(e) => setFormValue(e.target.value)}
    placeholder="Say something nice"
  />
  <label htmlFor="file-upload" className="custom-file-upload">
    <i className="material-icons">attach_file</i>
  </label>
  <input 
    id="file-upload" 
    type="file" 
    style={{display: 'none'}} 
    onChange={(e) => setImage(e.target.files[0])} 
  />
  <button type="submit" disabled={!formValue && !image}>🕊️</button>
</form>

  </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL, id } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  const dispatch = useDispatch();

  const handleDelete = async () => {
      dispatch(deleteMessage(id));
      await deleteDoc(doc(firestore, 'messages', id));
  };

  const handleEdit = async () => {
    const newText = window.prompt('Edit your message:', text);
    if (newText !== null && newText !== text) {
      dispatch(editMessage(id, newText));
      await updateDoc(doc(firestore, 'messages', id), {
        text: newText,
        edited: true,
        editedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <div className={`message ${messageClass}`}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {uid === auth.currentUser.uid && (
          <div>
            <span className="icon-button" onClick={handleEdit}>
              <i className="material-icons">edit</i>
            </span>
            <span className="icon-button" onClick={handleDelete}>
              <i className="material-icons">delete</i>
            </span>
          </div>
        )}
        {text && <p style={{ marginLeft: '10px' }}>{text}</p>}
        {props.message.imageUrl && <img src={props.message.imageUrl} alt="Sent Image" />}
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="User Avatar" />
      </div>
    </div>
  );
}


ChatMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    imageUrl: PropTypes.string
  }).isRequired
};

export default App
