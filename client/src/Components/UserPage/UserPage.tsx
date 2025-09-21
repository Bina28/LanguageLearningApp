import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./UserPage.css";
import EditUserForm from "../EditUserForm/EditUserForm";
import { useState } from "react";
import { useUserProgress } from "../../lib/hooks/useUserProgress";
import { useAccount } from "../../lib/hooks/useAccount";

export default function UserPage() {
  const { currentUser, loadingUserInfo } = useAccount();
  const { progressData, isLoadingProgress } = useUserProgress(currentUser?.id);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const totalUnits = 25;
  const completed = progressData?.completedUnits ?? 0;
  const progressPercent = Math.min((completed / totalUnits) * 100, 100);

  const goToCourses = () => {
    if (currentUser) {
      navigate(`/users/${currentUser.id}/courses`);
    }
  };

  if (loadingUserInfo || isLoadingProgress) return <p>Loading user data...</p>;
  if (!currentUser) return <p>User not found</p>;

  return (
    <>
      {editing && currentUser ? (
        <EditUserForm
          id={currentUser?.id ?? ""}
          displayName={currentUser.displayName ?? ""}
          email={currentUser.email ?? ""}
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
            <div className="profile-img"></div>
            <h2 className="user-name">Welcome, {currentUser.displayName}!</h2>
            <p className="user-email">Email: {currentUser.email}</p>

            <p className="completed-units">
              Completed Units: {progressData?.completedUnits ?? 0}
            </p>

            <div className="progress-bar-container">
              <motion.div
                className="progress-bar"
                style={{ width: `${progressPercent}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <div className="user-action">
              <button className="btn user-btn" onClick={() => setEditing(true)}>
                Update profile
              </button>
              <button className="btn user-btn" onClick={goToCourses}>
                See Progress
              </button>
            </div>
          </motion.div>
        </section>
      )}
    </>
  );
}
