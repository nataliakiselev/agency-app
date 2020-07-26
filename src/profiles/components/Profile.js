import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { AuthContext } from "../../shared/context/AuthContext";
import CardDetails from "./CardDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  delete: {
    position: "absolute",
    right: 0,
    top: 0,
  },
}));

const Profile = ({ profile, profileId, setError }) => {
  const classes = useStyles();
  // const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  const { token, userId } = useContext(AuthContext);

  const profilePhotos = profile.photos;
  const [photos, setPhotos] = useState(profilePhotos);
  const deletePhoto = async (photoId) => {
    try {
      console.log(profileId, "id");
      const response = await fetch(
        `http://localhost:4000/api/profiles/${profileId}/photo/${photoId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          method: "DELETE",
        },
      );

      console.log("response", response);

      if (!response.ok) {
        throw new Error(response.message);
      }
      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo._id !== photoId),
      );
    } catch (err) {
      console.log(err);

      setError(err.message || "Something went wrong");
    }
  };
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={550}>
        <GridListTile cols={xs ? 2 : 1}>
          <CardDetails {...profile} />
        </GridListTile>
        <GridListTile cols={xs ? 2 : 1}>
          <img
            src={`http://localhost:4000/${profile.mainImg}`}
            alt={`${profile.name.first} `}
          />
        </GridListTile>
        {photos.map((photo, i) => (
          <GridListTile key={i} cols={xs ? 2 : 1}>
            <img src={`http://localhost:4000/${photo.path}`} alt={photo.name} />
            {userId === profile.agent && (
              <Button
                className={classes.delete}
                onClick={() => deletePhoto(photo._id)}
                aria-label="delete photo"
              >
                <DeleteOutlineIcon />
              </Button>
            )}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default Profile;
