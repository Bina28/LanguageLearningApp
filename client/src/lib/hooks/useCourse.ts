import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

export const useCourse = (id?: string) => {
  const { data: userCourseData, isLoading: isLoading } = useQuery({
    queryKey: ["userCourse", id],
    queryFn: async () => {
      const response = await agent.get<CourseDetails[]>(`/users/${id}/courses`);
      console.log("Courses data:", userCourseData);

      return response.data;
    },
    enabled: !!id,
  });

  return {
    userCourseData,
    isLoading,
  };
};
