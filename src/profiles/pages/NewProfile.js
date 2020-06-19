import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorBar from "../../shared/UI/ErrorBar";

import "./NewProfile.css";

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

const NewProfile = () => {
  const classes = useStyles();

  const [error, setError] = useState();

  const clearError = () => {
    setError(null);
  };

  const history = useHistory();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      console.log(e.target, "form");
      console.log(data, "data");

      const response = await fetch("http://localhost:4000/api/profiles", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      console.log(response);
      // history.push('/')
    } catch (err) {
      console.log(err);

      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="profile-form">
      <form
        encType="multipart/form-data"
        className={classes.root}
        noValidate
        autoComplete="off"
        action="/profiles"
        method="POST"
        onSubmit={submitHandler}
      >
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First Name"
          variant="outlined"
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          variant="outlined"
          required
        />
        <TextField
          id="eyes"
          name="eyes"
          label="Eyes"
          variant="outlined"
          required
        />
        <TextField
          id="hair"
          name="hair"
          label="Hair"
          variant="outlined"
          required
        />

        <TextField
          id="height"
          name="height"
          label="Height (cm)"
          type="number"
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
        {/* <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        /> */}
        <div>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            name="avatar"
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
          Create Profile
        </Button>
      </form>
      <ErrorBar error={error} errorMessage={error} onClear={clearError} />
    </div>
  );
};

export default NewProfile;
