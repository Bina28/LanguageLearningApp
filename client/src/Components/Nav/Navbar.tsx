import React from "react";
import { Link, useResolvedPath, useMatch, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useUserContext } from "../../lib/hooks/UserContext";

export default function Navbar() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Logo
      </Link>
      <nav className="main-nav">
        <ul className="main-nav-list">
          <CustomLink to="/">Home</CustomLink>
          {user ? (
            <>
              <CustomLink to="/courses">Courses</CustomLink>
              <CustomLink to={`/user/${user.id}`}>User Page</CustomLink>
              <li onClick={handleLogout} className="main-nav-link">
                Logout
              </li>
            </>
          ) : (
            <>
              <CustomLink to="/login">Login</CustomLink>
              <CustomLink to="/signup">Sign Up</CustomLink>
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
