import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import "./Navbar.css";
import { useLogout } from "../LoginSignup/Logout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));
  const [authUpdated, setAuthUpdated] = useState(false); 
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("user"));
  }); 

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setAuthUpdated(prev => !prev); 
    navigate("/login");
  };

  return (
    <nav className="nav">
      <Link to="/" className="logo">Logo</Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        {isAuthenticated ? (
          <>
            <CustomLink to="/courses">Courses</CustomLink>
            <CustomLink to="/user">User Page</CustomLink>
            <li onClick={handleLogout} className="logout-button">Log out</li>
          </>
        ) : (
          <>
            <CustomLink to="/login" onClick={() => setAuthUpdated(prev => !prev)}>Login</CustomLink>
            <CustomLink to="/signup">Sign Up</CustomLink>
          </>
        )}
      </ul>
    </nav>
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
    <li className={isActive ? "active" : ""} onClick={onClick}>
      <Link to={to}>{children}</Link>
    </li>
  );
}