import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css"

interface Course {
    courseId: number;
    description: string;
    title: string
}

export default function Courses(){
    const[courses, setCourses] = useState<Course[]>([]);

    const navigate= useNavigate();

    useEffect(() => {
        const user=localStorage.getItem("user");
        if(!user){
           alert("You must be logged in to view courses.");
        navigate("/login");
        return; 
        }       
    
const fetchCourses = async() =>{
try{
const response = await axios.get<Course[]>("http://localhost:5117/api/auth/courses");
setCourses(response.data);
}catch(error){
    console.error("Error fetching courses: ", error);
}
};
fetchCourses();
}, [navigate]);

return (
    <div className="courses-container">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.map((course, index) => (
         <div
         key={course.courseId}
         className="course-card"
         onClick={() => navigate(`/courses/${course.courseId}`)} // 🔹 Добавляем переход на страницу курса
       >
         <div className="course-content">
           <div className="course-index">Unit {index + 1}</div>
           <div className="course-title">{course.title}</div>
           <div className="course-description">{course.description}</div>
         </div>
       </div>
     ))}
   </div>
 </div>
);
}