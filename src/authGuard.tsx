import { FC, PropsWithChildren } from "react";
import { useFireBaseAuthentication } from "./useFireBaseAuthentication.ts";
import { AuthenticatedUserContext } from "./authenticatedUserContext.tsx";

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const {
    isLoading: isAuthLoading,
    authenticatedUser,
    triggerLoginFlow,
  } = useFireBaseAuthentication();

  if (isAuthLoading) {
    return null;
  }

  if (!authenticatedUser) {
    return <button onClick={triggerLoginFlow}>Authenticate</button>;
  }

  return (
    <AuthenticatedUserContext.Provider value={authenticatedUser}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
