import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorBar from "../../shared/UI/ErrorBar";

// import { AuthContext } from "../../shared/context/AuthContext";

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

const UpdateProfile = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const profile = props.profile;

  const initialState = {
    height: "",
    bust: "",
    waist: "",
    hips: "",
    shoes: "",
    email: "",
    phone: "",
    notes: "",
    mainImg: null,
  };
  const [value, setValue] = useState(initialState);
  const [changes, setChanges] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
    setChanges({ ...changes, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // e.persist();
    try {
      console.log(changes, "changes");
      console.log(profile._id);

      const response = await fetch(
        `http://localhost:4000/api/profiles/${profile._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(changes),
        },
      );
      if (!response.ok) {
        throw new Error(response.message);
      }
      console.log(response);
    } catch (err) {
      console.log(err);

      setError(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <h2>
        {profile.name.first} {profile.name.last}
      </h2>
      <form className={classes.root} onSubmit={submitHandler}>
        <TextField
          // id="height"
          name="height"
          label="Height (cm)"
          type="number"
          value={value.height}
          onChange={handleChange}
          placeholder={String(profile.height)}
          variant="outlined"
        />
        <TextField
          id="bust"
          name="bust"
          label="Bust"
          type="number"
          value={value.bust}
          onChange={handleChange}
          placeholder={String(profile.hips)}
          variant="outlined"
        />
        <TextField
          id="waist"
          name="waist"
          label="Waist"
          type="number"
          value={value.waist}
          onChange={handleChange}
          placeholder={String(profile.waist)}
          variant="outlined"
        />

        <TextField
          id="hips"
          name="hips"
          label="Hips"
          type="number"
          value={value.hips}
          onChange={handleChange}
          placeholder={String(profile.hips)}
          variant="outlined"
        />
        <TextField
          id="shoes"
          name="shoes"
          label="Shoes"
          type="number"
          value={value.shoes}
          onChange={handleChange}
          placeholder={String(profile.shoes)}
          variant="outlined"
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={value.email}
          onChange={handleChange}
          placeholder={profile.email}
          variant="outlined"
        />
        <TextField
          id="phone"
          name="phone"
          label="Phone"
          type="tel"
          value={value.phone}
          onChange={handleChange}
          placeholder={String(profile.phone)}
          variant="outlined"
        />

        <TextField
          id="notes"
          name="notes"
          label="Notes"
          placeholder={profile.notes}
          value={value.notes}
          onChange={handleChange}
          placeholder={profile.notes}
          variant="outlined"
          multiline
        />

        <Button
          type="submit"
          variant="contained"
          // color="secondary"
          size="large"
          className={classes.button}
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
      <div>
        <input
          accept="image/*"
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
            Change Photo
          </Button>
        </label>
      </div>
      <div>
        <Button
          variant="contained"
          size="large"
          className={classes.button}
          onClick={props.onClick}
        >
          View Profile
        </Button>
      </div>
    </>
  );
};

export default UpdateProfile;
