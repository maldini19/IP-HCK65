import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/chat" element={user && <ChatBox />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
