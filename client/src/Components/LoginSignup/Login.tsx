import { useEffect, useState } from "react";
import axios from "axios";
import emailIcon from "../Assets/email.png";    
import passwordIcon from "../Assets/password.png";  
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import agent from "../../lib/api/agent";


interface User {
  id: number;
  email: string;
  fullName: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const expiresAt = localStorage.getItem("expiresAt");

    if (userData && expiresAt && Date.now() < parseInt(expiresAt, 10)) {
      setTimeout(() => navigate("/user"), 100);
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {

      const response = await agent.post<User>(`/auth/login`, {
        email,
        password,
      });

      const { id, fullName } = response.data;
      const expiresAt = (Date.now() + 24 * 60 * 60 * 1000).toString();

      localStorage.setItem("user", JSON.stringify({ id, fullName, email }));
      localStorage.setItem("expiresAt", expiresAt);
         
      console.log("Login", response.data);
      navigate("/user");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.status === 401 ? "Invalid email or password." : "Login failed.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container">
      <div className="glass-box">
        <h2 className="text">Login</h2>
        <div className="underline"></div>

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <img src={emailIcon} alt="Email" className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <img src={passwordIcon} alt="Password" className="icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="forgot-password">
            Forgot password? <span>Click here</span>
          </div>

          <div className="submit-container">
            <button className="submit" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
