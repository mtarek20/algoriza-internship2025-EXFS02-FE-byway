import { useEffect } from "react";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../Store/authAtom";

export default function StayLogged({ children }) {
  const [, setToken] = useAtom(tokenAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const storedUser = localStorage.getItem("user");

      let user = null;
      if (storedUser) {
        try {
          user = JSON.parse(storedUser);
        } catch {
          console.warn("Invalid user data in localStorage, resetting it.");
          localStorage.removeItem("user");
        }
      }

      if (token && role) {
        setToken(token);
        setUser(user);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error restoring session:", error);
    }
  }, [setToken, setUser]);

  return children;
}
