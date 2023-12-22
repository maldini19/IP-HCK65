import { auth, db } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../redux/action.js';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import PropTypes from "prop-types";

function Message({ message }) {
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(message.text);
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message])

  const deleteMessage = async () => {
    if (user.uid === message.uid) {
      const messageRef = doc(db, "messages", message.id);
      await deleteDoc(messageRef);
    }
  };

  const editMessage = async () => {
    if (user.uid === message.uid) {
      const messageRef = doc(db, "messages", message.id);
      await updateDoc(messageRef, { text: newMessage });
      setIsEditing(false);
    }
  };

  return (
    <div ref={ref} className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
    <img
      className="chat-bubble__left"
      src={message.avatar}
      alt="user avatar"
    />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        {isEditing ? (
          <div>
            <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
            <button onClick={editMessage}>Save</button>
          </div>
        ) : (
          <>
            <p className="user-message">{message.text}</p>
            {message.image && (
              <img
                className="message-image"
                src={message.image}
                alt="sent content"
              />
            )}
          </>
        )}
        {user.uid === message.uid && (
          <div className="button-action">
          <button className="button-delete">
            <RiDeleteBin5Fill color="black" onClick={deleteMessage} style={{ fontSize: '24px' }}/>
          </button>
          <button className="button-edit">
            <CiEdit color="black" onClick={() => setIsEditing(true)} style={{ fontSize: '24px' }}/>
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;