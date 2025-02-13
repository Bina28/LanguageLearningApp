import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

interface User{
  userId: string;
  email: string;
  fullName: string;
}

export default function UserPage() {
  const [user, setUser] = useState<User |null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
      alert("No user data found. Please log in.");
      navigate("/login");
      return;
    }
    const parsedUser: User = JSON.parse(storedUser);

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5117/api/auth/profile/${parsedUser.userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        alert("Error fetching user data");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div>
          <h2>User Profile</h2>
      <h2>Welcome, {user.fullName}!</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
