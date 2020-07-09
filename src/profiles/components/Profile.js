import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, useMediaQuery } from "@material-ui/core";
import ProfileCard from "./ProfileCard";
import CardDetails from "./CardDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(5),
    },
  },
  gridList: {
    flexWrap: "nowrap",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
}));

const Profile = ({ profile }) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  const photos = profile.photos;

  return (
    <>
      {!photos.length ? (
        <ProfileCard {...profile} />
      ) : (
        <div className={classes.root}>
          <GridList className={classes.gridList} cellHeight={600}>
            {matches && (
              <GridListTile cols={2}>
                <CardDetails {...profile} />
              </GridListTile>
            )}
            <GridListTile cols={2}>
              <ProfileCard {...profile} />
            </GridListTile>
            {photos.map((photo, i) => (
              <GridListTile key={i} cols={matches ? 2 : 1}>
                <img
                  src={`http://localhost:4000/${photo.path}`}
                  alt={photo.name}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      )}
    </>
  );
};

export default Profile;
