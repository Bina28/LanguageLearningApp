import { Routes, Route} from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Nav/Navbar.jsx";
import Login from "./Components/LoginSignup/Login.jsx";
import SignUp from "./Components/LoginSignup/SignUp.jsx";
import Home from "./Components/Home.js";
import UserPage from "./Components/UserPage.jsx";

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const expiresAt = localStorage.getItem("expiresAt");

    if (!user || !expiresAt) {
      return;
    }

    const now = new Date().getTime();
    if (now > parseInt(expiresAt, 10)) {

      localStorage.removeItem("user");
      localStorage.removeItem("expiresAt");
      alert("Session expired. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;

