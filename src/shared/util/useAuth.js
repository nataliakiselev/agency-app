let logoutTimer;
export const useAuth = () => {
  // const clearError = () => {
  //   setError(null);
  // };
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  });

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

  return { token, login, logout, userId };
};

export default useAuth;
