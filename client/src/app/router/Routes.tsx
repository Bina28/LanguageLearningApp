import { createBrowserRouter, Navigate } from "react-router-dom";
import { UserProvider } from "../../lib/hooks/UserContext";
import App from "../../App";
import Layout from "../../Components/Layout";
import Home from "../../Components/Home/Home";
import UserPage from "../../Components/UserPage/UserPage";
import Courses from "../../Components/Courses/Courses";
import Cards from "../../Components/Cards/Cards";
import UserCourses from "../../Components/UserCourses/UserCourses";
import NotFound from "../../Components/Errors/NotFound";
import Login from "../../Components/LoginSignup/Login";
import SignUp from "../../Components/LoginSignup/SignUp";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "user/:id", element: <UserPage /> },
          { path: "courses", element: <Courses /> },
          { path: "courses/:courseId", element: <Cards /> },
          { path: "usercourses/:id", element: <UserCourses /> },
          { path: "not-found", element: <NotFound /> },
        ],
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
