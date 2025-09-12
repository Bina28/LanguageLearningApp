import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useUserProgressUpdate = () => {
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

  return {
    updateProgress,
  };
};
