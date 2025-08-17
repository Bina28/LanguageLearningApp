import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./Components/Layout";
import Home from "./Components/Home/Home";
import UserPage from "./Components/UserPage/UserPage";
import Courses from "./Components/Courses/Courses";
import Cards from "./Components/Cards/Cards";
import UserCourses from "./Components/UserCourses/UserCourses";
import Login from "./Components/LoginSignup/Login";
import SignUp from "./Components/LoginSignup/SignUp";
import { UserProvider } from "./lib/hooks/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseId" element={<Cards />} />
          <Route path="usercourses/:id" element={<UserCourses />} />
          
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
