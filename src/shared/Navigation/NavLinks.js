import React, { useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { AuthContext } from "../../shared/context/AuthContext";
import { List, ListItem, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nav: {
    display: "flex",
    listStyle: "none",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      margin: "0 O.O5rem",
      flexGrow: "1",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));
const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  return (
    <List className={classes.nav}>
      <ListItem>
        <NavLink to="/" exact>
          TALENT
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/users" exact>
          AGENTS
        </NavLink>
      </ListItem>

      {auth.isLoggedIn && (
        <ListItem button>
          <NavLink to="/u1/profiles">MY PROFILES</NavLink>
        </ListItem>
      )}

      {auth.isLoggedIn && (
        <ListItem button>
          <NavLink to="/profiles/new">ADD PROFILE</NavLink>
        </ListItem>
      )}
      {!auth.isLoggedIn && (
        <ListItem>
          <NavLink to="/auth">LOG IN</NavLink>
        </ListItem>
      )}
      {auth.isLoggedIn && (
        <ListItem button>
          <Button onClick={auth.logout}>Logout</Button>
        </ListItem>
      )}
    </List>
    //     <ul className="nav-links">
    //       <li>
    //         <NavLink to="/" exact>
    //           TALENT
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/users" exact>
    //           AGENTS
    //         </NavLink>
    //       </li>

    //       {auth.isLoggedIn && (
    //         <li>
    //           <NavLink to="/u1/profiles">MY PROFILES</NavLink>
    //         </li>
    //       )}
    //       {auth.isLoggedIn && (
    //         <li>
    //           <NavLink to="/profiles/new">ADD PROFILE</NavLink>
    //         </li>
    //       )}
    //       {!auth.isLoggedIn && (
    //         <li>
    //           <NavLink to="/auth">LOG IN</NavLink>
    //         </li>
    //       )}
    //       {auth.isLoggedIn && (
    //         <li>
    //           <Button onClick={auth.logout}>Logout</Button>
    //         </li>
    //       )}
    //     </ul>
  );
};

export default NavLinks;
