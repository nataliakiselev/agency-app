import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { AuthContext } from "../../shared/context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
  },
  details: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    width: "40%",
  },
}));

const ProfileCard = (profile) => {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <Typography component="h5" variant="h5">
          {profile.name.first} {profile.name.last}
        </Typography>
        <CardContent className={classes.content}>
          <dl>
            <dt>Height</dt>
            <dd>{profile.height} cm</dd>
            <dt>Waist</dt>
            <dd>{profile.waist} cm</dd>
            <dt>Hips</dt>
            <dd>{profile.hips} cm</dd>
            <dt>Shoes</dt>
            <dd>{profile.shoes}</dd>
            <dt>Hair</dt>
            <dd>{profile.hair}</dd>
            <dt>Eyes</dt>
            <dd>{profile.eyes}</dd>
            <dt>Agent</dt>
            <dd>{profile.agent}</dd>
            {auth.isLoggedIn && (
              <dl>
                <dt>Email</dt>
                <dd>{profile.email}</dd>
                <dt>Phone</dt>
                <dd>{profile.phone}</dd>

                <dt>Notes</dt>
                <dd>{profile.notes}</dd>
              </dl>
            )}
          </dl>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        src={`http://localhost:4000/${profile.mainImg}`} //specify height?
        alt={profile.name}
        title="Live from space album cover"
      />
      {auth.isLoggedIn && (
        <CardActions>
          <Button size="small" color="primary">
            Add Photos
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
export default ProfileCard;
