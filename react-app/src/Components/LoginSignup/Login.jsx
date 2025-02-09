import { useEffect, useState } from "react";
import axios from "axios";
import emailIcon from "../Assets/email.png";    
import passwordIcon from "../Assets/password.png";  
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const expiresAt = localStorage.getItem("expiresAt");
    
        if (user && expiresAt) {
          const now = new Date().getTime();
          if (now < parseInt(expiresAt, 10)) {
           
            navigate("/user");
          }
        }
      }, [navigate]);
    

      const handleSubmit = async () => {
        try {
          const response = await axios.post("http://localhost:5117/api/auth/login", {
            email,
            password,
          });
             
          const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000; 
          localStorage.setItem("user", JSON.stringify({
            userId: response.data.userId,
            email: response.data.email,
            fullName: response.data.fullName,
          }));
          localStorage.setItem("expiresAt", expiresAt); 
    
          navigate("/user");
        } catch (error) {
          console.error("Error:", error.response?.data || error.message);
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
