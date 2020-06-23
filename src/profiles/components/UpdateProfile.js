import React, { useState } from "react";

import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import "../pages/NewProfile.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

const UpdateProfile = ({ props }, handleCancel) => {
  const classes = useStyles();

  const [initialValue, setValue] = useState({});
  // const profileId = useParams().profileId;

  // const identifiedProfile = DUMMY_PROFILES.find(
  //   (item) => item.id === profileId,
  // );

  // if (!identifiedProfile) {
  //   return (
  //     <div className="center">
  //       <h2>Could not find profile!</h2>
  //     </div>
  //   );
  // }

  return (
    <form
      className={classes.root}

      // onSubmit={submitHandler}
    >
      <TextField
        id="height"
        name="height"
        label="Height (cm)"
        type="number"
        value={props.height}
        variant="outlined"
        required
      />
      <TextField
        id="bust"
        name="bust"
        label="Bust"
        type="number"
        variant="outlined"
        required
      />
      <TextField
        id="waist"
        name="waist"
        label="Waist"
        type="number"
        variant="outlined"
        required
      />

      <TextField
        id="hips"
        name="hips"
        label="Hips"
        type="number"
        variant="outlined"
        required
      />
      <TextField
        id="shoes"
        name="shoes"
        label="Shoes"
        type="number"
        variant="outlined"
        required
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        type="email"
        variant="outlined"
        required
      />
      <TextField
        id="phone"
        name="phone"
        label="Phone"
        type="number"
        variant="outlined"
        required
      />

      <TextField
        id="notes"
        name="notes"
        label="Notes"
        variant="outlined"
        multiline
      />
      <div>
        <input
          // accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          name="mainImg"
          required
        />

        <label htmlFor="contained-button-file">
          <Button
            className={classes.button}
            variant="outlined"
            size="large"
            component="span"
          >
            Upload Photo
          </Button>
        </label>
      </div>

      <Button
        type="submit"
        variant="contained"
        // color="secondary"
        size="large"
        className={classes.button}
        // onClick={(e) => props.onSubmit(e)}
      >
        Save
      </Button>
      <Button
        variant="contained"
        size="large"
        className={classes.button}
        onClick={props.onClick}
      >
        Cancel
      </Button>
    </form>
  );
};

export default UpdateProfile;
