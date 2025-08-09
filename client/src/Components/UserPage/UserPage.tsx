import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserProgress } from "../UserProgressContext";
import "./UserPage.css";
import EditUserForm from "../EditUserForm/EditUserForm";
import agent from "../../lib/api/agent";

interface User {
  id: number;
  email: string;
  fullName: string;
}

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { completedUnits, refreshProgress } = useUserProgress();
  const [editing, setEditing] = useState(false);

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
          const response = await agent.get<User>(
            `/api/auth/profile/${parsedUser.id}`
          );

          if (response.status === 200) {
            setUser(response.data);
            refreshProgress();
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchProfile();
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  });

  const handleUpdate = async (updatedUser: User) => {
    try {
      await agent.put(`/api/user/update`, updatedUser);

      setUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Update failed", error);
      alert("Kunne ikke oppdatere profil. Prøv igjen senere.");
    }
  };

  const goToCourses = () => {
    if (!user) {
      console.error("User is null, cannot navigate to courses.");
      return;
    }
    navigate("/usercourses", { state: { id: user.id } });
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <>
      {editing && (
        <EditUserForm
          id={user.id}
          fullName={user.fullName}
          email={user.email}
          onUpdate={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      )}
      {!editing && (
        <section className="user-page-section">
          <motion.div
            className="user-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="profile-pic"></div>
            <h2 className="user-name">Welcome, {user.fullName}!</h2>
            <p className="user-email">Email: {user.email}</p>

            <p className="completed-units">Completed Units: {completedUnits}</p>

            <div className="progress-bar-container">
              <motion.div
                className="progress-bar"
                style={{ width: `${completedUnits * 10}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${completedUnits * 10}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="user-buttons">
              <button onClick={() => setEditing(true)}>Update profile</button>
              <button onClick={goToCourses}>My Courses</button>
            </div>
          </motion.div>
        </section>
      )}
    </>
  );
}
