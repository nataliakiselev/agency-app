import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import NavLinks from "./NavLinks";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //   zIndex: 1,
  },
  appbar: {
    position: "sticky",
  },
  bar: {
    // [theme.breakpoints.down("md")]: {
    height: 100,
    // },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  nav: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const MainNav = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <div
            className={classes.list}
            role="presentation"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
          >
            <NavLinks />
          </div>
        </Drawer>
        <Toolbar className={classes.bar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/">IMG MANAGEMENT</Link>
          </Typography>
          <div className={classes.nav}>
            <NavLinks />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainNav;
