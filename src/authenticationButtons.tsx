import { FC } from "react";
import { useFireBaseAuthentication } from "./useFireBaseAuthentication.ts";

export const AuthenticationButtons: FC = () => {
  const {
    isLoading: isAuthLoading,
    authenticatedUser,
    triggerLoginFlow,
    triggerLogoutFlow,
  } = useFireBaseAuthentication();

  if (isAuthLoading) {
    return null;
  }

  return (
    <>
      {authenticatedUser ? (
        <button onClick={triggerLogoutFlow}>Logout</button>
      ) : (
        <button onClick={triggerLoginFlow}>Authenticate</button>
      )}
    </>
  );
};
