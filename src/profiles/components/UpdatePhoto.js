import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

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

const UpdatePhoto = ({ profile, setError }) => {
  const classes = useStyles();
  const fileInput = React.createRef();

  const addPhotosHandler = async (e) => {
    e.preventDefault();
    e.persist();
    const data = fileInput.current.file;

    console.log(data);
    try {
      const response = await fetch(
        `http://localhost:4000/api/profiles/${profile._id}`,
        {
          method: "PUT",
          body: data,
        },
      );
      if (!response.ok) {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong");
    }
  };
  return (
    <form
      action="/profiles/:id"
      method="put"
      className={classes.buttonGroup}
      onSubmit={addPhotosHandler}
    >
      <input
        accept=".jpg,.jpeg,.png"
        name="mainImg"
        id="file"
        className={classes.input}
        type="file"
        ref={fileInput}
      />

      <label htmlFor="file" className={classes.wideButton}>
        <Button
          variant="outlined"
          size="large"
          component="span"
          className={classes.button}
        >
          Change Cover Photo
        </Button>
      </label>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
      >
        Save
      </Button>
    </form>
  );
};

export default UpdatePhoto;
