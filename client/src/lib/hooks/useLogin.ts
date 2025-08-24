import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  return useMutation({
    mutationFn: async (loginDto: { email: string; password: string }) => {
      const response = await agent.post("/auth/login", loginDto);
      return response.data; 
    },
    onSuccess: (userId) => {
      if (!userId) throw new Error("Invalid email or password.");

      const expiresAt = (Date.now() + 24 * 60 * 60 * 1000).toString();
      const userObj = { id: userId};
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("expiresAt", expiresAt);
      setUser(userObj); 

      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate(`/user/${userId}`);
    },
  });
}
