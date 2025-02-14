import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="logo">Logo</Link>
      <ul>
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/signup">Sign Up</CustomLink>
      </ul>
    </nav>
  );
}
interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

function CustomLink({ to, children}: CustomLinkProps) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}
