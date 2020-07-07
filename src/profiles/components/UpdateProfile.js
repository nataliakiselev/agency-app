import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UpdatePhoto from "./UpdatePhoto";
import AddPhotos from "./AddPhotos";
import ErrorBar from "../../shared/UI/ErrorBar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  buttonGroup: {
    display: "flex",
  },
  wideButton: {
    flexGrow: 1,
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
  };
  const [value, setValue] = useState(initialState);
  const [changes, setChanges] = useState({});
  const [error, setError] = useState(null);
  const clearError = () => {
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
    setChanges({ ...changes, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
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
      <div className={classes.root} onSubmit={submitHandler}>
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
      </div>
      <UpdatePhoto profile={profile} setError={setError} />
      <AddPhotos profile={profile} setError={setError} />
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
      <ErrorBar error={error} errorMessage={error} onClear={clearError} />
    </>
  );
};

export default UpdateProfile;
