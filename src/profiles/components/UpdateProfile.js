import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../shared/context/AuthContext";
import UpdateCover from "./UpdateCover";
import AddPhotos from "./AddPhotos";
import ErrorBar from "../../shared/UI/ErrorBar";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  formRow: {
    margin: theme.spacing(1),

    display: "flex",
    justifyContent: "space-around",
  },
  root: {
    margin: `0 auto ${theme.spacing(1)}`,
    padding: "1rem",
    width: "90%",
    maxWidth: "40rem",
    borderRadius: "6px",
    background: "white",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  name: {
    textTransform: "capitalize",
  },
}));

const UpdateProfile = (props) => {
  const classes = useStyles();
  // const history = useHistory();
  const profile = props.profile;
  const { token } = useContext(AuthContext);
  // let { id } = useParams();

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const clearError = () => {
    setError(null);
  };

  // function viewHandler(id) {
  //   history.push(`/profiles/${id}`);
  // }
  console.log(value);
  const handleChange = (e) => {
    const { name, value: val } = e.target;
    const newValues = { ...value, [name]: val };
    setValue(newValues);
    const newChanges = { ...changes, [name]: val };
    setChanges(newChanges);
  };
  console.log(value);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(value);
    console.log(changes);
    try {
      setIsLoading(true);

      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + `/profiles/${profile._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          method: "PUT",
          body: JSON.stringify(changes),
        },
      );
      if (!response.ok) {
        throw new Error(response.message || response.statusText);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.root}>
      {isLoading && <LoadingSpinner />}
      <h2 className={classes.name}>
        {profile.name.first} {profile.name.last}
      </h2>

      <form onSubmit={submitHandler} className={classes.form}>
        <TextField
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
          variant="outlined"
          multiline
        />

        <div className={classes.formRow}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={props.cancelHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={props.cancelHandler}
            // onClick={() => viewHandler(profile._id)}
            aria-label="view profile"
          >
            View Profile
          </Button>
        </div>
      </form>
      <div className={classes.formRow}>
        <UpdateCover profile={profile} />
        <AddPhotos profile={profile} />
      </div>
      <ErrorBar error={error} errorMessage={error} onClear={clearError} />
    </div>
  );
};

export default UpdateProfile;
