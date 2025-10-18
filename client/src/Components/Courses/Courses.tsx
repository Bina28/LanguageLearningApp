import { useNavigate } from "react-router-dom";
import "./Courses.css";
import { useCourses } from "../../lib/hooks/useCourses";
import { useAccount } from "../../lib/hooks/useAccount";
import { useUserProgress } from "../../lib/hooks/useUserProgress";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

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
  const { lastCompletedCourse } = useUserProgress(userId);
  const navigate = useNavigate();
  const { coursesGroup, isLoading, hasNextPage, fetchNextPage } = useCourses();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (!coursesGroup) return <p>No courses found</p>;

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

      <div className="courses-grid">
        {coursesGroup.pages.map((page, pageIndex) =>
          page.items.map((course, courseIndex) => {
            const isLastPage = pageIndex === coursesGroup.pages.length - 1;
            const isLastCourse = courseIndex === page.items.length - 1;
            const progressValue = lastCompletedCourse ?? 0;
            const isLocked = course.courseId > progressValue + 1;
            return (
              <div
                key={course.courseId}
                ref={isLastPage && isLastCourse ? ref : null}
                className={`course-card ${isLocked ? "locked" : ""}`}
                onClick={() =>
                  !isLocked && navigate(`/courses/${course.courseId}/cards`)
                }
              >
                {isLocked && <span className="lock-icon">🔒</span>}
                <div className="course-content">
                  <div className="course-index">Course {course.courseId}</div>
                  <img
                    src={courseIcons[course.courseId - 1]}
                    alt=""
                    className="course-icon"
                  />
                  <div className="course-name">{course.title}</div>
                  <div className="course-description">{course.description}</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="arrow-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
