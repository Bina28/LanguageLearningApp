import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./UserPage.css";
import EditUserForm from "../EditUserForm/EditUserForm";
import { useState } from "react";

import { useProfile } from "../../lib/hooks/useProfile";
import { useUserProgress } from "../../lib/hooks/useUserProgress";

export default function UserPage() {
  const { id } = useParams();
  const { profile, loadingProfile, isCurrentUser } = useProfile(id);

  const { lastCompletedCourse, isLoadingProgress } = useUserProgress(id);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const totalUnits = 25;
  const completed = lastCompletedCourse ?? 0;
  const progressPercent = Math.min((completed / totalUnits) * 100, 100);

  const goToCourses = () => {
    if (profile) {
      navigate(`/users/${id}/courses`);
    }
  };

  if (loadingProfile || isLoadingProgress) return <p>Loading user data...</p>;
  if (!profile) return <p>User not found</p>;

  return (
    <>
      <section className="user-page-section">
        {!editMode && (
          <motion.div
            className="user-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={profile.imageUrl}
              className="profile-img"
              alt="profile image"
            />

            <h2 className="user-name">Welcome, {profile.displayName}!</h2>
            <p className="user-bio">Bio: {profile.bio}</p>

            <p className="completed-units">
              Completed Units: {lastCompletedCourse ?? 0}
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
              {isCurrentUser && (
                <button
                  className="btn user-btn"
                  onClick={() => setEditMode(!editMode)}
                >
                  Update profile
                </button>
              )}
              <button className="btn user-btn" onClick={goToCourses}>
                See progress
              </button>
            </div>
          </motion.div>
        )}
        {editMode && <EditUserForm setEditMode={setEditMode} />}
      </section>
    </>
  );
}
