import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useUser = (id?: string) => {
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: async (user: User) => {
      const response = await agent.post("/auth/register", user);
      console.log(response);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await agent.get<User>(`/auth/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  return {
    createUser,
    user,
    isLoadingUser,
  };
};
