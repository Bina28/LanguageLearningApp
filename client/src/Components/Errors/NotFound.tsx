import { Link } from "react-router-dom";
import "./NotFound.css"; 

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-icon">🔍❌</div>
      <h1>Ooops - we couldn't find what you are looking for</h1>
      <Link to="/" className="notfound-button">
        Return to the home page
      </Link>
    </div>
  );
}
