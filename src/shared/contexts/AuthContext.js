import React, { createContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});

let logoutTimer;

export const AuthProvider = (props) => {
  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState();
  let history = useHistory();

  const login = useCallback((uid, token, expiration) => {
    setToken(token);
    setUserId(uid);
    const tokenExpiration =
      expiration || new Date(new Date().getTime() + 1000 * 60 * 120);
    setTokenExpiry(tokenExpiration);
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpiration.toISOString(),
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpiry(null);
    setUserId(null);
    localStorage.removeItem("user");
    history.push("/");
  }, [history]);

  useEffect(() => {
    if (token && tokenExpiry) {
      const remainingTime = tokenExpiry.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiry]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.token &&
      new Date(storedUser.expiration) > new Date()
    ) {
      login(
        storedUser.userId,
        storedUser.token,
        new Date(storedUser.expiration),
      );
    }
  }, [login]);
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
