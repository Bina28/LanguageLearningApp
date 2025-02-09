import { useState } from "react";
import { Link } from "react-router-dom";
import personIcon from "../Assets/person.png";  
import emailIcon from "../Assets/email.png";    
import passwordIcon from "../Assets/password.png";  
import "./LoginSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
    const [name, setName] = useState("");  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      const requestData = { fullName: name, email, password };
  
      try {
        console.log("Sending Sign Up request:", requestData);
  
        const response = await axios.post("http://localhost:5117/api/auth/register", requestData, {
          headers: { "Content-Type": "application/json" },
        });
        localStorage.setItem("user", JSON.stringify({
            userId: response.data.userId, 
            email: response.data.email
          }));
          navigate("/user");
          
        console.log("Registration Success:", response.data);
        alert("Sign-up successful!");
      
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        alert(`An error occurred: ${error.response?.data || error.message}`);
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




