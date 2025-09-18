import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAccount } from "../../lib/hooks/useAccount";

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
          <li>
            <Link to="/" className="main-nav-link">
              Home
            </Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <Link to="/courses" className="main-nav-link">
                  Courses
                </Link>
              </li>
              <li>
                <Link to={"/account/user-info"} className="main-nav-link">
                  User Page
                </Link>
              </li>
              <li className="main-nav-link logout-btn" onClick={handleLogout}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="main-nav-link"
                  to="/login"                  
                >
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="main-nav-link nav-cta">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
