import Logo from "../image/icons8-google-48.png"
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <h1 className="header">DisKrod💬</h1>
      <button className="sign-in" onClick={googleSignIn}>
        <img src={Logo} alt="Google Sign-In" />
        Sign in with Google
      </button>
    </>
  )
}

export default Welcome;
