import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAccount } from "../../lib/hooks/useAccount";
import "./AuthCallback.css";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { fetchGithubToken } = useAccount();
  const code = params.get("code");
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  useEffect(() => {
    if (!code || fetched.current) return;
    fetched.current = true;

    fetchGithubToken
      .mutateAsync(code)
      .then(() => navigate("/courses"))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [code, fetchGithubToken, navigate]);

  if (!code) return <p>Problem authenticating with GitHub</p>;

  return (
    <div className="github-section">
      <div className="github-container">
        <div className="github-content">
          <h4 className="github-title">Logging in with GitHub</h4>
          {loading ? <p>Loading...</p> : <p>Problem signing in with GitHub</p>}
        </div>
      </div>
    </div>
  );
}
