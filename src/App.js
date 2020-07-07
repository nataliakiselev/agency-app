import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import AllProfiles from "./profiles/pages/AllProfiles";
import Users from "./user/pages/Users";
import ProfilesList from "./profiles/pages/ProfilesList";
import MainNav from "./shared/Navigation/MainNav";
import ProfilePage from "./profiles/pages/ProfilePage";
import NewProfile from "./profiles/pages/NewProfile";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/AuthContext";
import ErrorBoundary from "./ErrorBoundary";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import { useMediaQuery } from "@material-ui/core";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback((uid) => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes = (
    <Switch>
      <Route exact path="/">
        <AllProfiles />
      </Route>
      <Route exact path="/users">
        <Users />
      </Route>
      <Route exact path="/:userId/profiles">
        <ProfilesList />
      </Route>
      <ProtectedRoute exact isAuthedUser={isLoggedIn} path="/profiles/new">
        <NewProfile />
      </ProtectedRoute>

      <Route path="/profiles/:profileId">
        <ErrorBoundary>
          <ProfilePage />
        </ErrorBoundary>
      </Route>

      <Route path="/auth">
        <Auth />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNav />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
