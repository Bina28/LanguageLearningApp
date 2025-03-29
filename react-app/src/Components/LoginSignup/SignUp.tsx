import { useState } from "react";
import { Link } from "react-router-dom";
import personIcon from "../Assets/person.png";  
import emailIcon from "../Assets/email.png";    
import passwordIcon from "../Assets/password.png";  
import "./LoginSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

interface User {
  id: number;
  email: string;
  fullName: string;
}

export default function SignUp() {
    const [name, setName] = useState<string>("");  
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const navigate = useNavigate();
  
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void> => {
      e.preventDefault();
      
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      const requestData = { fullName: name, email, password };
  
      try {
        console.log("Sending Sign Up request:", requestData);
  
        const response = await axios.post<User>("http://localhost:5117/api/auth/register", requestData, {
          headers: { "Content-Type": "application/json" },
        });
        const { id, fullName, email } = response.data;

        // Save the user data to localStorage
        localStorage.setItem("user", JSON.stringify({ id, fullName, email }));
    
         
          navigate("/user");
          
        console.log("Registration Success:", response.data);
        alert("Sign-up successful!");
      
      } catch (error) {
        console.error("Error:", error instanceof Error ? error.message : "Unknown error");
        alert(`An error occurred:  ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    };
  

  return (
    <div className="container">
      <div className="glass-box">
        <h2 className="text">Sign Up</h2>
        <div className="underline"></div>

        <form onSubmit={handleSubmit} className="inputs">
          <div className="input">
            <img src={personIcon} alt="Name" className="icon" /> 
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="input">
            <img src={passwordIcon} alt="Confirm Password" className="icon" /> 
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            Already have an account? <Link to="/login">Login</Link>
          </div>

          <div className="submit-container">
            <button type="submit" className="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};




