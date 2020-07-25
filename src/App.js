import React, { useState, useCallback, useContext } from "react";
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
import { AuthProvider, AuthContext } from "./shared/context/AuthContext";
import ErrorBoundary from "./ErrorBoundary";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

const App = () => {
  const token = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <MainNav />
        <Switch>
          <Route exact path="/">
            <AllProfiles />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/:id/profiles">
            <ProfilesList />
          </Route>
          <ProtectedRoute exact isAuthedUser={!!token} path="/profiles/new">
            <NewProfile />
          </ProtectedRoute>
          {/* <ProtectedRoute
        exact
        isAuthedUser={isLoggedIn}
        path="/profiles/:profileId/update"
      >
        <NewProfile />
      </ProtectedRoute> */}

          <Route path="/profiles/:id">
            <ErrorBoundary>
              <ProfilePage />
            </ErrorBoundary>
          </Route>

          <Route path="/auth">
            <Auth />
          </Route>
          <Redirect to="/auth" />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
