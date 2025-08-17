import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

// Fetch list of courses (with pagination + search)
export const useCourses = (page: number, pageSize: number, searchQuery: string) => {
  return useQuery({
    queryKey: ["courses", page, searchQuery],
    queryFn: async () => {
      const endpoint = searchQuery ? `/courses/search` : `/courses`;
      const response = await agent.get(endpoint, {
        params: { pageIndex: page, pageSize, ...(searchQuery && { searchQuery }) },
      });

      // Sjekk om API returnerer Array direkte eller objekt
      const items = Array.isArray(response.data) ? response.data : response.data.data.items;
      const totalPages = response.data.totalPages || 1;

      return { items, totalPages };
    },
    staleTime: 500,
  });
};
