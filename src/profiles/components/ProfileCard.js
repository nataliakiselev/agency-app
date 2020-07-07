import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, useMediaQuery, CardMedia } from "@material-ui/core";
import CardDetails from "./CardDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    height: "100%",
  },
  cover: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    width: "50%",
  },
}));

const ProfileCard = (profile) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Card className={classes.root} cols={2}>
      {matches && <CardDetails {...profile} />}

      <CardMedia
        className={classes.cover}
        image={`http://localhost:4000/${profile.mainImg}`}
        alt={profile.name.first}
        title="Live from space album cover"
      />
    </Card>
  );
};
export default ProfileCard;
