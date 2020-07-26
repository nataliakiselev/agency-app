import React from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 130,
    [theme.breakpoints.up("sm")]: {
      maxWidth: "90%",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "80%",
    },
    margin: "auto",
  },
}));

export default function PageFrame(props) {
  const classes = useStyles();
  // let location = useLocation();

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
}
