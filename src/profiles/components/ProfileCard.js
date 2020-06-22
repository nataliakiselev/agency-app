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

const ProfileCard = ({ props }) => {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <Typography component="h5" variant="h5">
          {props.name.first} {props.name.last}
        </Typography>
        <CardContent className={classes.content}>
          <dl>
            <dt>Height</dt>
            <dd>{props.height} cm</dd>
            <dt>Waist</dt>
            <dd>{props.waist} cm</dd>
            <dt>Hips</dt>
            <dd>{props.hips} cm</dd>
            <dt>Shoes</dt>
            <dd>{props.shoeSize}</dd>
            <dt>Hair</dt>
            <dd>{props.hair}</dd>
            <dt>Eyes</dt>
            <dd>{props.eyes}</dd>
            <dt>Agent</dt>
            <dd>{props.agent}</dd>
            {auth.isLoggedIn && (
              <dl>
                <dt>Email</dt>
                <dd>{props.email}</dd>
                <dt>Phone</dt>
                <dd>{props.phone}</dd>

                <dt>Notes</dt>
                <dd>{props.notes}</dd>
              </dl>
            )}
          </dl>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        src={`http://localhost:4000/${props.mainImg}`} //specify height?
        alt={props.name.first}
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
