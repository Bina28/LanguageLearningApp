import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAccount } from "../../lib/hooks/useAccount";
import Logo from "../Assets/LEXI.png";

export default function Navbar({
  setModal,
}: {
  setModal: (v: "login" | "signup" | null) => void;
}) {
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
        <img src={Logo} alt="" />
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
                <Link to={`/profiles/${currentUser.id}`} className="main-nav-link">
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
                <button
                  className="main-nav-link nav-btn"
                  onClick={() => setModal("login")}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="main-nav-link nav-cta nav-btn"
                  onClick={() => setModal("signup")}
                >
                  Sign Up
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
