import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

export const useUserProgress = (id?: string) => {
  const query = useQuery({
    queryKey: ["userProgress", id],
    queryFn: async () => {
      if (!id) return 0;
      const response = await agent.get(`/courses/${id}/last-completed`);
      return response.data.value ?? 0;
    },
    enabled: !!id,
  });


  return query.data ?? 0;
};
