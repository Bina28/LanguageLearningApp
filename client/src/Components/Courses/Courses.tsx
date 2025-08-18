import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";
import { useCourses } from "../../lib/hooks/useCourses";
import { useUserProgress } from "../../lib/hooks/useUserProgress";
import { useUserContext } from "../../lib/hooks/UserContext";

export default function Courses() {
  const { user } = useUserContext();
  const userId = user?.id;
  const { data: progressData } = useUserProgress(userId);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useCourses(page, pageSize, searchQuery);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
      setPage(1);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchInput]);

  if (isLoading) return <p>Loading...</p>;
  const totalPages = data?.totalPages || 1;
  console.log(data);

  return (
    <section className="courses-section">
      <h2 className="course-title">Available Courses</h2>
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="courses-grid">
        {data?.items.map((course: Course) => {
          const isLocked =
            course.courseId > (progressData?.completedUnits ?? 0) + 1;

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
    </section>
  );
}
