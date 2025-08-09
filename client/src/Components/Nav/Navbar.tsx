import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import "./Navbar.css";
import { useLogout } from "../LoginSignup/Logout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );
  const [, setAuthUpdated] = useState(false);
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("user"));
  });

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setAuthUpdated((prev) => !prev);
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Logo
      </Link>
      <nav className="main-nav">
        <ul className="main-nav-list">
          <li>
            <CustomLink to="/">Home</CustomLink>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <CustomLink to="/courses">Courses</CustomLink>
              </li>
              <li>
                <CustomLink to="/user">User Page</CustomLink>
              </li>
              <li onClick={handleLogout} className="main-nav-link ">Logout</li>
            </>
          ) : (
            <>
              <li>
                <CustomLink
                  to="/login"
                  onClick={() => setAuthUpdated((prev) => !prev)}
                >
                  Login
                </CustomLink>
              </li>
              <li>
                <CustomLink to="/signup">Sign Up</CustomLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}
function CustomLink({ to, children, onClick }: CustomLinkProps) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={`main-nav-link ${isActive ? "active" : ""}`}
      >
        {children}
      </Link>
    </li>
  );
}
