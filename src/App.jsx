import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
  const [user] = useAuthState(auth);

  return user ? children : <Navigate to="/chat" />;
}

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/chat" /> : <Welcome />} />
          <Route path="/chat" element={<ProtectedRoute><ChatBox /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}


ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;