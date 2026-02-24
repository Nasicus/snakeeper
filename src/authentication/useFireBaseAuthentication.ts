import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useState, useEffect } from "react";

export function useFireBaseAuthentication() {
  const [authenticatedUser, setAuthenticatedUser] = useState<
    User | undefined | null
  >(undefined);
  const auth = getAuth();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setAuthenticatedUser(user ?? null);
    });
  }, []);

  return {
    isLoading: authenticatedUser === undefined,
    authenticatedUser,
    triggerLoginFlow,
    triggerLogoutFlow,
  };

  function triggerLoginFlow() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => {
        // handled by observer onAuthStateChanged
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  function triggerLogoutFlow() {
    auth
      .signOut()
      .then(() => {
        // handled by observer onAuthStateChanged
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
