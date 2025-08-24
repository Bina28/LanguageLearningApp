import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

type CompleteUnitRequest = {
  Id: string;
  CorrectAnswers: number;
};

export const useCompletedUnit = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CompleteUnitRequest) => {
      const response = await agent.post("/courses/completeunit", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });

  return mutation;
};