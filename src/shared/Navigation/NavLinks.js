import React, { useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { AuthContext } from "../../shared/context/AuthContext";
import { List, ListItem, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "inherit",
    margin: theme.spacing(1),
  },
  root: {
    display: "flex",
    listStyle: "none",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "center",
    },
  },
}));
const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem button>
        <NavLink to="/" exact>
          TALENT
        </NavLink>
      </ListItem>
      <ListItem button>
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
        <ListItem button>
          <NavLink to="/auth">LOG IN</NavLink>
        </ListItem>
      )}
      {auth.isLoggedIn && (
        <ListItem button onClick={auth.logout}>
          LOGOUT
        </ListItem>
      )}
    </List>
  );
};

export default NavLinks;
