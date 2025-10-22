import { useAccount } from "../../lib/hooks/useAccount";
import { useCourse } from "../../lib/hooks/useCourse";
import "./UserCourses.css";
import { useNavigate } from "react-router-dom";

export default function UserCourses() {
  const { currentUser } = useAccount();
  const { userCourseData, isLoading } = useCourse(currentUser?.id);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (!userCourseData) return <p>No data found</p>;
  return (
    <div className="course-summary">
      <h2 className="course-summary-title">My Learning Progress</h2>
      <p className="course-summary-subtitle">
        Track your course completions and stay motivated. Complete 3 out of 5
        questions to unlock the next level!
      </p>
      {userCourseData ? (
        <table>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Description</th>
              <th>Attempts</th>
              <th>Completed</th>
              <th>Last Completed Date</th>
            </tr>
          </thead>
          <tbody>
            {userCourseData.map((course) => (
              <tr key={`${course.courseId}-${currentUser?.id}`}>
                <td>{course.courseTitle}</td>
                <td>{course.courseDescription}</td>
                <td>{course.attempts}</td>
                <td>{course.isCompleted ? "✔️" : "❌"}</td>
                <td>
                  {course.lastCompletedDay
                    ? new Date(course.lastCompletedDay).toLocaleDateString()
                    : "Not yet"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-red-500">No user data available.</p>
      )}
      <button
        className="btn return-btn"
        onClick={() => navigate(`/profiles/${currentUser?.id}`)}
      >
        Back to Profile
      </button>
    </div>
  );
}
