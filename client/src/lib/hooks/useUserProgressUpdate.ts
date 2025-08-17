import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useUserProgressUpdate = () => {
  const queryClient = useQueryClient();
  const updateProgress = useMutation({
    mutationFn: async (progress: UpdatedProgress) => {
      await agent.put(`/courses`, progress);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["progress"],
      });
    },
  });

  return {
    updateProgress,
  };
};
