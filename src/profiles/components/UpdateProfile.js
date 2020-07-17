import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UpdateCover from "./UpdateCover";
import AddPhotos from "./AddPhotos";
import ErrorBar from "../../shared/UI/ErrorBar";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: "theme.spacing(1)",
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
  // const history = useHistory();
  const profile = props.profile;
  // const auth = useContext(AuthContext);
  // let { id } = useParams();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
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
    // console.log("name", name);
    // console.log("value", val);
    // console.log("original state", value);
    const newValues = { ...value, [name]: val };
    // console.log("newValues", newValues);
    setValue(newValues);
    // console.log("original changes", changes);
    const newChanges = { ...changes, [name]: val };
    // console.log("newChanges", newChanges);
    setChanges(newChanges);
    // console.log(value);
  };
  console.log(value);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(value);
    console.log(changes);
    try {
      setIsLoading(true);

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
    setIsLoading(false);
  };

  return (
    <div className={classes.root}>
      {isLoading && <LoadingSpinner />}
      <h2>
        {profile.name.first} {profile.name.last}
      </h2>
      <form onSubmit={submitHandler}>
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
      <UpdateCover profile={profile} setError={setError} />
      <AddPhotos profile={profile} setError={setError} />
      <div>
        <Button
          variant="contained"
          size="large"
          className={classes.button}
          onClick={props.onClick}
          // onClick={() => viewHandler(profile._id)}
          aria-label="view profile"
        >
          View Profile
        </Button>
      </div>
      <ErrorBar error={error} errorMessage={error} onClear={clearError} />
    </div>
  );
};

export default UpdateProfile;
