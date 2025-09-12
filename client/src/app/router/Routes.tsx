import { createBrowserRouter, Navigate } from "react-router-dom";
import { UserProvider } from "../../lib/hooks/UserContext";
import App from "../../App";
import Home from "../../Components/Home/Home";
import UserPage from "../../Components/UserPage/UserPage";
import Courses from "../../Components/Courses/Courses";

import UserCourses from "../../Components/UserCourses/UserCourses";
import NotFound from "../../Components/Errors/NotFound";
import LoginForm from "../../Components/LoginSignup/LoginForm";
import RegistrationForm from "../../Components/LoginSignup/RegistrationForm";
import RequireAuth from "./RequireAuth";
import Cards from "../../Components/Cards/Cards";

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
        element: <RequireAuth />,
        children: [
          { path: "account/user-info", element: <UserPage /> },
          { path: "courses", element: <Courses /> },
          { path: "courses/:courseId/cards", element: <Cards /> },
          { path: "users/:id/courses", element: <UserCourses /> },
        ],
      },
      { path: "", element: <Home /> },
      { path: "not-found", element: <NotFound /> },
      { path: "login", element: <LoginForm /> },
      { path: "signup", element: <RegistrationForm /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
