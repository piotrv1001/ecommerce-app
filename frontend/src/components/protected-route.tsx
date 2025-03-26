import { useProtectedRoute } from "@/hooks/use-protected-route";
import LoadingSpinner from "./loading-spinner";
import { Navigate } from "react-router";
import { UserRole } from "@/types/user-role";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRoles: UserRole[];
};

export default function ProtectedRoute({
  children,
  requiredRoles,
}: ProtectedRouteProps) {
  const { user, loading } = useProtectedRoute();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user || !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
