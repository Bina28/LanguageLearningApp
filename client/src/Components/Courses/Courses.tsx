import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";
import { useCourses } from "../../lib/hooks/useCourses";
import { useUserProgress } from "../../lib/hooks/useUserProgress";
import { useAccount } from "../../lib/hooks/useAccount";

const courseIcons = [
  "/icons/greetings.png",
  "/icons/numbers.png",
  "/icons/commonPhrases.png",
  "/icons/food.png",
  "/icons/directions.png",
  "/icons/shopping.png",
  "/icons/time.png",
  "/icons/travel.png",
  "/icons/work.png",
  "/icons/emergency.png",
];



export default function Courses() {
  const { currentUser } = useAccount();
  const userId = currentUser?.id;
  const lastCompletedCourse = useUserProgress(userId);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useCourses(page, pageSize, searchQuery);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
      setPage(1);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchInput]);

  if (isLoading) return <p>Loading...</p>;
  const totalPages = data?.totalPages || 1;

  return (
    <section className="courses-section">
      <div className="courses-text-container">
        <h4 className="courses-pretitle">Start learning today</h4>
        <h2 className="course-title">Explore Courses</h2>
        <p className="courses-subtitle">
          Each course includes interactive flashcards, quizzes, and exercises to
          make your learning effective and fun.
        </p>
      </div>

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
          const isLocked = course.courseId > lastCompletedCourse + 1;

          return (
            <div
              key={course.courseId}
              className={`course-card ${isLocked ? "locked" : ""}`}
              onClick={() =>
                !isLocked && navigate(`/courses/${course.courseId}/cards`)
              }
            >
              {isLocked && <span className="lock-icon">🔒</span>}
              <div className="course-content">
                <div className="course-index">Course {course.courseId}</div>
                <img src={courseIcons[course.courseId-1]} alt="" className="course-icon"/>
                <div className="course-name">{course.title}</div>
                <div className="course-description">{course.description}</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="arrow-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
