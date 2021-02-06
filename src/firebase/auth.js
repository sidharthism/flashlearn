import React, { useContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from "./";

// Authentication Context
export const AuthContext = React.createContext({ loggedIn: false });

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthInit() {
  const [authInit, setAuthInit] = useState({
    loading: true,
  });
  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      const auth = firebaseUser
        ? { loggedIn: true, user: firebaseUser }
        : { loggedIn: false };
      setAuthInit({ loading: false, auth });
    });
  }, []);
  return authInit;
}

// Auth provider
export const appAuth = firebaseAuth;
