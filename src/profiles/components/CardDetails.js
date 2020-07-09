import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Typography } from "@material-ui/core";
import { AuthContext } from "../../shared/context/AuthContext";

const useStyles = makeStyles((theme) => ({
  content: {
    // display: "flex",
    // flexWrap: "wrap",
    textAlign: "right",
    // justifyContent: "flex-end",
    // marginLeft: theme.spacing(5),
  },
  contact: {
    marginTop: theme.spacing(5),
  },
}));

const CardDetails = (profile) => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  return (
    <>
      {auth.isLoggedIn && (
        <CardContent component="dl" className="contact">
          <Typography component="dt" variant="h6">
            Email
          </Typography>
          <Typography component="dd" variant="h5">
            {profile.email}
          </Typography>
          <Typography component="dt" variant="h6">
            Phone
          </Typography>
          <Typography component="dd" variant="h5">
            {profile.phone}
          </Typography>

          <Typography component="dt" variant="h6">
            Notes
          </Typography>
          <Typography component="dd" variant="h5">
            {profile.notes}
          </Typography>
        </CardContent>
      )}
      <CardContent className={classes.content}>
        <Typography component="h4" variant="h4">
          {profile.name.first} {profile.name.last}
        </Typography>

        <dl>
          <Typography component="dt" variant="h6">
            Height
          </Typography>
          <Typography component="dd" variant="h5">
            {profile.height} cm
          </Typography>
          <Typography component="dt" variant="h6">
            Bust
          </Typography>
          <Typography component="dd" variant="h5">
            {profile.bust} cm
          </Typography>
          <Typography component="dt" variant="h6">
            Waist
          </Typography>
          <Typography component="dd" variant="h5">
            {profile.waist} cm
          </Typography>
          <Typography component="dt" variant="h6">
            Hips
          </Typography>
          <Typography component="dd" variant="h5">
            {profile.hips} cm
          </Typography>
          <Typography component="dt" variant="h6">
            Shoes
          </Typography>
          <Typography component="dd" variant="h5">
            {profile.shoes}
          </Typography>
          <Typography component="dt" variant="h6">
            Hair
          </Typography>
          <Typography component="dd" variant="h5">
            {profile.hair}
          </Typography>
          <Typography component="dt" variant="h6">
            Eyes
          </Typography>
          <Typography component="dd" variant="h5">
            {profile.eyes}
          </Typography>
        </dl>
      </CardContent>
    </>
  );
};

export default CardDetails;
