import { useAtom } from "jotai";
import { Navigate, useLocation } from "react-router-dom";
import { tokenAtom } from "../Store/authAtom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const [token] = useAtom(tokenAtom);
  const location = useLocation();

  const storedRole = localStorage.getItem("role");

  if (!token || !storedRole) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(storedRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (storedRole === "User" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/" replace />;
  }

  return children;
}
