import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./UserPage.css";
import EditUserForm from "../EditUserForm/EditUserForm";
import { useUser } from "../../lib/hooks/useUser";
import { useState } from "react";
import { useUserProgress } from "../../lib/hooks/useUserProgress";

export default function UserPage() {
  const { id } = useParams();
  const { user, isLoadingUser } = useUser(id);
  const { data: progressData, isLoading: isLoadingProgress } =
    useUserProgress(id);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const goToCourses = () => {
    if (user) {
      navigate(`/usercourses/${id}`);
    }
  };

  if (isLoadingUser || isLoadingProgress) return <p>Loading user data...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <>
      {editing && user ? (
        <EditUserForm
          id={user?.id ?? ""}
          fullName={user.fullName ?? ""}
          email={user.email ?? ""}
          onCancel={() => setEditing(false)}
        />
      ) : (
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

            <p className="completed-units">
              Completed Units: {progressData?.completedUnits ?? 0}
            </p>

            <div className="progress-bar-container">
              <motion.div
                className="progress-bar"
                style={{
                  width: `${(progressData?.completedUnits ?? 0) * 10}%`,
                }}
                initial={{ width: 0 }}
                animate={{
                  width: `${(progressData?.completedUnits ?? 0) * 10}%`,
                }}
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
