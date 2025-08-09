import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user"); // Remove user data
    navigate("/login"); // Redirect to login page
  };

  return logout;
}
