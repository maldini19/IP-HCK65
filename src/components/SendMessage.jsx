import { useState } from "react";
import { auth, db, storage } from "../../firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiLaughingFill } from 'react-icons/bs';
import PropTypes from "prop-types";

function SendMessage({ scroll }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState(null);

  const onEmojiClick = (event) => {
    setMessage(message + event.emoji);
  };

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const { uid, displayName, photoURL } = auth.currentUser;

    let imageUrl = null;

    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await uploadTask.then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      }).then((downloadURL) => {
        imageUrl = downloadURL;
      });
    }

    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
      image: imageUrl,
    });
    setMessage("");
    setImage(null);
    setShowEmojiPicker(false);
    scroll.current.scrollIntoView({ behavior: "fast" });
  };

  return (
    <div className="send-message-container">
      <form onSubmit={(event) => sendMessage(event)} className="send-message">
        <label htmlFor="messageInput" hidden>
          Enter Message
        </label>
        <input
          id="messageInput"
          name="messageInput"
          type="text"
          className="form-input__input"
          placeholder="type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <BsEmojiLaughingFill size={24} />
        </button>
        <label htmlFor="imageInput" className="custom-file-upload">
          <i className="material-icons">attach_file</i>
          <input
            id="imageInput"
            name="imageInput"
            type="file"
            onChange={onImageChange}
            style={{ display: 'none' }} // hide the actual input element
          />
        </label>
        <button type="submit">🕊️</button>
      </form>
      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
}

SendMessage.propTypes = {
  scroll: PropTypes.object.isRequired,
};

export default SendMessage;
