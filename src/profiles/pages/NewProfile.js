import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorBar from "../../shared/UI/ErrorBar";
import { AuthContext } from "../../shared/context/AuthContext";
import PageGrid from "../../shared/UI/PageGrid";
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

  const { userId, token } = useContext(AuthContext);
  console.log(userId);
  const [error, setError] = useState();

  const clearError = () => {
    setError(null);
  };

  const history = useHistory();
  const submitHandler = async (e) => {
    e.preventDefault();
    e.persist();
    const form = e.target;
    try {
      const data = new FormData(form);
      data.append("agent", userId);
      // console.log(e.target, "form");

      console.log(Object.fromEntries(data), "data");

      const response = await fetch("http://localhost:4000/api/profiles", {
        method: "POST",
        body: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      console.log(response);
      history.push("/");
    } catch (err) {
      console.log(err);

      setError(err.message || "Something went wrong");
    }
    form.reset();
  };

  return (
    <PageGrid>
      <div className="profile-form">
        <form
          encType="multipart/form-data"
          className={classes.root}
          action="/profiles"
          method="POST"
          onSubmit={submitHandler}
        >
          <TextField
            required
            id="firstName"
            name="name.first"
            label="First Name"
            variant="outlined"
          />
          <TextField
            id="lastName"
            name="name.last"
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
            type="tel"
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
              accept=".jpg,.jpeg,.png"
              className={classes.input}
              id="contained-button-file"
              type="file"
              name="mainImg"
              // required
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
            color="primary"
            size="large"
            className={classes.button}
          >
            Create Profile
          </Button>
        </form>
        <ErrorBar error={error} errorMessage={error} onClear={clearError} />
      </div>
    </PageGrid>
  );
};

export default NewProfile;
