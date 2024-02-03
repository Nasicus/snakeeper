import { createContext, useContext } from "react";
import { User } from "firebase/auth";

export const AuthenticatedUserContext = createContext<User | null>(null);

export function useAuthenticatedUser() {
  const user = useContext(AuthenticatedUserContext);
  
  if (!user) {
    throw new Error("useAuthenticatedUser must be used within an AuthGuard");
  }

  return user;
}
