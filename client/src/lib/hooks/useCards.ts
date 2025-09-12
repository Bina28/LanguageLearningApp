import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

export const useCards = (id?: string) => {
  const { data: cards, isLoading: isLoadingCards } = useQuery({
    queryKey: ["cards", id],
    queryFn: async () => {
      const response = await agent.get<Cards[]>(`/courses/${id}/cards`);
      return response.data.sort(() => 0.5 - Math.random()).slice(0, 5);
    },
    enabled: !!id,
  });

  return { cards, isLoadingCards };
};