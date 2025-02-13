import { useEffect, useState } from "react";
import axios from "axios";
import emailIcon from "../Assets/email.png";    
import passwordIcon from "../Assets/password.png";  
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import React from "react";


interface User {
  userId: string;
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
    
        if (userData && expiresAt) {
          const user: User = JSON.parse(userData);
          const now: number = Date.now();

          if (now < parseInt(expiresAt, 10)) {
            navigate("/user");
          }
        }
      }, [navigate]);
    

    const handleSubmit = async (): Promise<void> => {
        try {
          const response = await axios.post<User>("http://localhost:5117/api/auth/login", {
            email,
            password,
          });
             
          const expiresAt = (Date.now() + 24 * 60 * 60 * 1000).toString(); 
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("expiresAt", expiresAt); 
    
          navigate("/user");
        } catch (error) {
          console.error("Error:", error instanceof Error ? error.message : "Unknown error");
          alert("An error occurred.");
        }
      };

    return (
      <div className="container">
        <div className="glass-box">
          <h2 className="text">Login</h2>
          <div className="underline"></div>

          <div className="inputs">
            <div className="input">
              <img src={emailIcon} alt="Email" className="icon" />  
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <img src={passwordIcon} alt="Password" className="icon" />  
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="forgot-password">
            Forgot password? <span>Click here</span>
          </div>

          <div className="submit-container">
            <button className="submit" onClick={handleSubmit}>Login</button>
          </div>
        </div>
      </div>
    );
}
