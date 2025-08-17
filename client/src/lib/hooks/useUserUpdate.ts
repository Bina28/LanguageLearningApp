import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const updateUser = useMutation({
    mutationFn: async (user: UpdateUser) => {
      await agent.put(`/user`, user);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    updateUser,
  };
};
