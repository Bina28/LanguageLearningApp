import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";
import { useUserProgress } from "../UserProgressContext";

interface Course {
    courseId: number;
    description: string;
    title: string
}

interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

export default function Courses() {
  const { completedUnits } = useUserProgress(); // Берём данные из контекста
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10; // Количество курсов на странице
  const [totalPages, setTotalPages] = useState(1);

const fetchCourses = async () => {
  try {
    const response = await axios.get("http://localhost:5117/api/learning/courses", {
      params: { pageIndex: page, pageSize }
    });

    console.log("API Response:", response.data); // Проверка формата ответа

    setCourses((prev) => [...prev, ...response.data.data.items]);
    setTotalPages(response.data.data.totalPages); // Сохраняем общее количество страниц
  } catch (error) {
    console.error("Error fetching courses: ", error);
  }
};

useEffect(() => {
  fetchCourses();
}, [page]);



    return (
      <div className="courses-container">
        <h2>Available Courses</h2>
        <div className="courses-grid">
          {courses.map((course, index) => {
            const isLocked = index > completedUnits;
    
            return (
              <div
                key={course.courseId}
                className={`course-card ${isLocked ? "locked" : ""}`}
                onClick={() => !isLocked && navigate(`/courses/${course.courseId}`)}
              >
                {isLocked && <span className="lock-icon">🔒</span>}
                <div className="course-content">
                  <div className="course-index">Unit {index + 1}</div>
                  <div className="course-title">{course.title}</div>
                  <div className="course-description">{course.description}</div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="show-more-button"
  onClick={() => setPage((prev) => prev + 1)} 
  disabled={page >= totalPages}
>
  Show More
</button>

      </div>
    );
    
  
}
