import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { AuthContext } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  buttonGroup: {
    display: "flex",
    width: "100%",
    maxWidth: 300,
    margin: `0 auto ${theme.spacing(1)}px`,
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

const AddPhotos = ({ profile, setError }) => {
  const classes = useStyles();
  const fileInput = React.createRef();
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const addPhotosHandler = async (e) => {
    e.preventDefault();
    e.persist();
    const files = fileInput.current.files;

    console.log(files);
    try {
      setIsLoading(true);
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("photos", files[i]);
      }
      console.log(Object.fromEntries(formData), "dataObj");
      const response = await fetch(
        `http://localhost:4000/api/profiles/${profile._id}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      if (!response.ok) {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong");
    }
    setIsLoading(false);
  };
  return (
    <form
      action="/profiles/:id/upload"
      method="post"
      encType="multipart/form-data"
      className={classes.buttonGroup}
      onSubmit={addPhotosHandler}
    >
      <input
        accept=".jpg,.jpeg,.png"
        name="photos"
        id="files"
        className={classes.input}
        multiple
        type="file"
        ref={fileInput}
      />

      <label htmlFor="files" className={classes.wideButton}>
        <Button
          // variant="outlined"
          // size="large"
          component="span"
          className={classes.button}
        >
          Add Photos
        </Button>
      </label>
      <Button type="submit" variant="outlined">
        Send
      </Button>
    </form>
  );
};

export default AddPhotos;
