import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useUserProgress } from "../UserProgressContext";
import "./UserPage.css"; 

interface User {
  id: number;
  email: string;
  fullName: string;
}

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { completedUnits } = useUserProgress();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser: User = JSON.parse(userData);

      const fetchProfile = async () => {
        try {
          const response = await axios.get<User>(`http://localhost:5117/api/auth/profile/${parsedUser.id}`);

          if (response.status === 200) {
            setUser(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchProfile();
    } catch (error) {
      navigate("/login");
    }
  }, []);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="user-container">
      <motion.div 
        className="user-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="profile-pic"></div>
        <h2 className="user-name">Welcome, {user.fullName}!</h2>
        <p className="user-email">Email: {user.email}</p>
        
        <p style={{ color: "white" }}>Completed Units: {completedUnits}</p>
        
        <div className="progress-bar-container">
          <motion.div 
            className="progress-bar"
            style={{ width: `${completedUnits * 10}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${completedUnits * 10}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </motion.div>
    </div>
  );
}