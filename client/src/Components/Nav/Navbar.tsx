import { Link } from "react-router-dom";
import "./Navbar.css";

import { useAccount } from "../../lib/hooks/useAccount";
import CustomNavLink from "./CustomNavLink";

export default function Navbar() {
  const { currentUser, logoutUser } = useAccount();
  const handleLogout = async () => {
    try {
      await logoutUser.mutateAsync();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Logo
      </Link>
      <nav className="main-nav">
        <ul className="main-nav-list">
          <CustomNavLink to="/">Home</CustomNavLink>
          {currentUser ? (
            <>
              <CustomNavLink to="/courses">Courses</CustomNavLink>
              <CustomNavLink to={'/account/user-info'}>
                User Page
              </CustomNavLink>
              <li
                className="main-nav-link"
              onClick={handleLogout}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <CustomNavLink to="/login">Login</CustomNavLink>
              <CustomNavLink to="/signup">Sign Up</CustomNavLink>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
