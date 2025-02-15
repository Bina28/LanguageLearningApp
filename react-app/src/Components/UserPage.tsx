import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


interface User {
  id: number;
  email: string;
  fullName: string;
}

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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
