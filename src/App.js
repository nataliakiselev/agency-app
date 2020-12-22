import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import AllProfiles from "./profiles/pages/AllProfiles";
import Users from "./user/pages/Users";
import ProfilesList from "./profiles/pages/ProfilesList";
import MainNav from "./Navigation/MainNav";
import ProfilePage from "./profiles/pages/ProfilePage";
import NewProfile from "./profiles/pages/NewProfile";
import Auth from "./user/pages/Auth";
import Footer from "./Footer";
import { ToastProvider } from "react-toast-notifications";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { ProfilesProvider } from "./shared/contexts/ProfilesContext";
// import ErrorBoundary from "./ErrorBoundary";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <Router>
      <ToastProvider autoDismiss={true} placement="bottom-center">
        <AuthProvider>
          <MainNav />
          <ProfilesProvider>
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
              <ProtectedRoute exact path="/profiles/new">
                <NewProfile />
              </ProtectedRoute>

              <Route path="/profiles/:id">
                <ProfilePage />
              </Route>

              <Route path="/auth">
                <Auth />
              </Route>
              <Redirect to="/auth" />
            </Switch>
          </ProfilesProvider>
        </AuthProvider>
      </ToastProvider>
      <Footer />
    </Router>
  );
};

export default App;
