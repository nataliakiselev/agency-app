import React, { useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { AuthContext } from "../../shared/context/AuthContext";
import Button from "../FormElements/Button";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          TALENT
        </NavLink>
      </li>
      <li>
        <NavLink to="/users" exact>
          AGENTS
        </NavLink>
      </li>

      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/profiles">MY PROFILES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/profiles/new">ADD PROFILE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOG IN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button onClick={auth.logout}>Logout</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
