import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useUserProgress = (id?: string) => {
  const queryClient = useQueryClient();

  const updateProgress = useMutation({
    mutationFn: async (progress: UpdatedProgress) => {
      console.log(progress);
      await agent.post("/users/complete-course", progress);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["progress"],
      });
    },
  });

  const { data: lastCompletedCourse, isLoading: isLoadingProgress } = useQuery({
    queryKey: ["progress", id],
    queryFn: async () => {
      if (!id) return 0;
      const response = await agent.get(`/courses/${id}/last-completed`);
      return response.data.value ?? 0;
    },
    enabled: !!id,
  });

  return {
    updateProgress,
    lastCompletedCourse,
    isLoadingProgress,
  };
};
