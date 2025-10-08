import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { tokenAtom, userAtom } from "../Store/authAtom";

export default function ProtectedRoute({ children, role }) {
  const [user] = useAtom(userAtom);
  const [token] = useAtom(tokenAtom);

  if (!user && !token) {
    return <Navigate to="/" replace />;
  }

  if (localStorage.getItem("token") === null) {
    return <Navigate to="/" replace />;
  }

  if (role && localStorage.getItem("role") !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
