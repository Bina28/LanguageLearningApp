import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

type PaginatedCourses ={
  items: Course[];
  totalPages: number;
}

export const useCourses = (page: number, pageSize: number, searchQuery: string) => {
  return useQuery<PaginatedCourses>({
    queryKey: ["courses", page, searchQuery],
    queryFn: async () => {
      const response = await agent.get("/courses", {
        params: { page, pageSize, ...(searchQuery && { searchQuery }) },
      });

      const items = response.data.items;
      const totalPages = response.data.totalPages;

      return { items, totalPages };
    },
  
  });
};