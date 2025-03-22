import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Nav/Navbar";
import Login from "./Components/LoginSignup/Login";
import SignUp from "./Components/LoginSignup/SignUp";
import Home from "./Components/Home/Home";
import UserPage from "./Components/UserPage/UserPage";
import Courses from "./Components/Courses/Courses";
import Cards from "./Components/Cards/Cards";
import UserCourses from "./Components/UserCourses/UserCourses";
import { UserProgressProvider } from "./Components/UserProgressContext";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser: string | null = localStorage.getItem("user");
    const expiresAt: string | null = localStorage.getItem("expiresAt");

    if (!storedUser || !expiresAt) {
      return;
    }

    const now: number = Date.now();
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
      <UserProgressProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<Cards />} />
          <Route path="/usercourses" element={<UserCourses />} />

        </Routes>
      </UserProgressProvider>
    </>
  );
}

export default App;
