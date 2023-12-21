import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

function NavBar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signOut = () => {
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  return (
    <nav className="nav-bar">
      <h1>
        DisKord💬
      </h1>
      {user && (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      )}
    </nav>
  );
}

export default NavBar;