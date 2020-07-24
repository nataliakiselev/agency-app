import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../shared/context/AuthContext";
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "inherit",
    textTransform: "uppercase",
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
  const { token, logout, userId } = useContext(AuthContext);

  console.log("Nav logged in? ", token);
  console.log(userId, "userId");
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem button>
        <NavLink to="/" exact>
          Talent {/* text should be lowercase and uppercased with CSS */}
        </NavLink>
      </ListItem>
      <ListItem button>
        <NavLink to="/users" exact>
          Agents
        </NavLink>
      </ListItem>

      {!!token && (
        <>
          <ListItem button>
            <NavLink to={`/users/${userId}/profiles`}>My Profiles</NavLink>
          </ListItem>
          <ListItem button>
            <NavLink to="/profiles/new">Add Profile</NavLink>
          </ListItem>
          <ListItem button onClick={logout}>
            Logout
          </ListItem>
        </>
      )}

      {!token && (
        <ListItem button>
          <NavLink to="/auth">LogIn</NavLink>
        </ListItem>
      )}
    </List>
  );
};

export default NavLinks;
