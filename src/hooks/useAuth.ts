import { useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return { isAuthenticated, loading: status === "loading", session };
};