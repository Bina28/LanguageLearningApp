import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";
import { useUserProgress } from "../UserProgressContext";

interface Course {
  courseId: number;
  description: string;
  title: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

export default function Courses() {
  const { completedUnits } = useUserProgress();
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchCourses = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const endpoint = searchQuery
        ? `${apiUrl}/api/learning/search`
        : `${apiUrl}/api/learning/courses`;

      const response = await axios.get(endpoint, {
        params: searchQuery ? { searchQuery } : { pageIndex: page, pageSize },
      });

      console.log("API Response:", response.data);
      setCourses(response.data.data.items || response.data.data);
      setTotalPages(response.data.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCourses();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, page]);

  return (
    <div className="courses-container">
      <div className="pagination-search-wrapper">
        <div className="pagination">
          <button onClick={() => setPage(1)} disabled={page === 1}>
            First
          </button>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            Last
          </button>
        </div>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <h2 className="course-title">Available Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => {
          const isLocked = course.courseId > completedUnits+1;

          return (
            <div
              key={course.courseId}
              className={`course-card ${isLocked ? "locked" : ""}`}
              onClick={() =>
                !isLocked && navigate(`/courses/${course.courseId}`)
              }
            >
              {isLocked && <span className="lock-icon">🔒</span>}
              <div className="course-content">
                <div className="course-index">Unit {course.courseId}</div>
                <div className="course-name">{course.title}</div>
                <div className="course-description">{course.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
