import { useCourse } from "../../lib/hooks/useCourse";
import "./UserCourses.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UserCourses() {
  const { id } = useParams();
  const { userCourseData, isLoading } = useCourse(id);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (!userCourseData) return <p>No data found</p>;
  return (
    <div className="table-container">
      <h2 className="course-title">Course Progress Summary</h2>
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
              <tr key={`${course.courseId}-${id}`}>
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
      <button className="back-button" onClick={() => navigate(`/user/${id}`)}>
        Go Back
      </button>
    </div>
  );
}
