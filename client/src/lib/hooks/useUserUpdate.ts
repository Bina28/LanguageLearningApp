import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";


export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const updateUser = useMutation({
    mutationFn: async ({
      userId,
      body,
    }: {
      userId: string;
      body: { displayName: string; email: string };
    }) => {
      return await agent.put(`/users/${userId}`, body);
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
