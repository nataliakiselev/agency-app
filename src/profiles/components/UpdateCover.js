import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../shared/context/AuthContext";
import ErrorBar from "../../shared/UI/ErrorBar";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  formRow: {
    display: "flex",
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

const UpdateCover = ({ profile }) => {
  const classes = useStyles();
  const fileInput = React.createRef();
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const clearError = () => {
    setError(null);
  };

  const addPhotosHandler = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      setIsLoading(true);
      const data = new FormData();
      data.append("mainImg", fileInput.current.files[0]);

      console.log(Object.fromEntries(data), "data");
      const response = await fetch(
        `http://localhost:4000/api/profiles/${profile._id}/updatecover`,
        {
          method: "PUT",
          body: data,
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      if (!response.ok) {
        throw new Error(response.message || response.statusText);
      }
    } catch (err) {
      console.dir(err);
      setError(err.message || "Something went wrong");
    }
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorBar error={error} errorMessage={error} onClear={clearError} />
      )}
      <form
        encType="multipart/form-data"
        action="/profiles/:id/updateCover"
        method="put"
        className={classes.formRow}
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

        <label htmlFor="file">
          <Button
            // variant="outlined"
            // size="large"
            component="span"
            // className={classes.wideButton}
          >
            Change Cover
          </Button>
        </label>
        <Button type="submit" variant="outlined">
          Send
        </Button>
      </form>
    </>
  );
};

export default UpdateCover;
