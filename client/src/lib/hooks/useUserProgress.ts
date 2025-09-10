import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

export const useUserProgress = (id?: string) => {
  return useQuery({
    queryKey: ["userProgress", id],
    queryFn: async () => {
      const response = await agent.get(`/courses/progress/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
