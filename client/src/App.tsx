import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { UserProgressProvider } from "./Components/UserProgressContext";
import Layout from "./Components/Layout";
import Home from "./Components/Home/Home";
import UserPage from "./Components/UserPage/UserPage";
import Courses from "./Components/Courses/Courses";
import Cards from "./Components/Cards/Cards";
import UserCourses from "./Components/UserCourses/UserCourses";
import Login from "./Components/LoginSignup/Login";
import SignUp from "./Components/LoginSignup/SignUp";

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
    <UserProgressProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user" element={<UserPage />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseId" element={<Cards />} />
          <Route path="usercourses" element={<UserCourses />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </UserProgressProvider>
  );
}

export default App;
