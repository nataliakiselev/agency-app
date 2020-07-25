import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import ErrorBar from "../../shared/UI/ErrorBar";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: "flex",

    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

const AddPhotos = ({ profile, error, setError }) => {
  const classes = useStyles();
  const fileInput = React.createRef();
  const [isLoading, setIsLoading] = useState(false);

  const clearError = () => {
    setError(null);
  };
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
    <React.Fragment>
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
        <label htmlFor="files">
          <Button component="span">Add Photos</Button>
        </label>
        <Button type="submit" variant="outlined">
          Send
        </Button>
      </form>
      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorBar error={error} errorMessage={error} onClear={clearError} />
      )}
    </React.Fragment>
  );
};

export default AddPhotos;
