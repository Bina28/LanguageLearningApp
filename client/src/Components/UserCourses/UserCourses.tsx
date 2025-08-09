import { useEffect, useState } from "react";
import "./UserCourses.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  courseId: number;
  lastCompletedDay: string | null;
  attempts: number;
  isCompleted: boolean;
  courseTitle: string;
  courseDescription: string;
}

export default function UserCourses() {
  const location = useLocation();
  const userId = location.state?.id;
  const [courses, setCourses] = useState<Course[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.error("No user ID provided!");
      return;
    }

    const fetchCourses = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/usercourse/${userId}`);
        
        console.log("API Response:", response.data);
        
        const courseData = Array.isArray(response.data) ? response.data : [response.data];
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching user courses:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, [userId]);

  return (
    <div className="table-container">
      <h2 className="course-title">Course Progress Summary</h2>
      {userId ? (
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
            {courses.map((course) => (
              <tr key={`${course.courseId}-${userId}`}>
                <td>{course.courseTitle}</td>
                <td>{course.courseDescription}</td>
                <td>{course.attempts}</td>
                <td>{course.isCompleted ? "✔️" : "❌"}</td>
                <td>{course.lastCompletedDay ? new Date(course.lastCompletedDay).toLocaleDateString() : "Not yet"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-red-500">No user data available.</p>
      )}
         <button className="back-button" onClick={() => navigate("/user")}>
      Go Back
    </button>
    </div>
  );
  
}
