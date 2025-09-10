
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAccount } from "../../lib/hooks/useAccount";

export default function RequireAuth() {
  const { currentUser, loadingUserInfo } = useAccount();
  const location = useLocation();

  if (loadingUserInfo) return <p>Loading...</p>;

  if (!currentUser) return <Navigate to="/login" state={{ from: location }} />;

  return (
    <Outlet />
  );
}
