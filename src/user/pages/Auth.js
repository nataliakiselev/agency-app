import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../shared/UI/Card";
import { AuthContext } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import ErrorBar from "../../shared/UI/ErrorBar";
import "./Auth.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80%",
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

const Auth = () => {
  const classes = useStyles();

  let history = useHistory();
  const { login } = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = () => {
    setError(null);
  };
  const authSubmitHandler = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + "/users/login",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
          },
        );

        const resJson = await response.json();
        if (!response.ok) {
          throw new Error(response.message || response.statusText);
        }
        console.log(resJson.userId);
        login(resJson.userId, resJson.token); //set user into state

        history.push("/");
      } catch (err) {
        console.log(err);

        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + "/users/signup",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
          },
        );

        const resJson = await response.json();

        if (!response.ok) {
          throw new Error(response.message || response.statusText);
        }

        console.log(resJson);

        login(resJson.userId, resJson.token);
        history.push("/");
      } catch (err) {
        console.log(err);

        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  };
  const switchToRegister = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <Card className="authentication">
      {/* {isLoading && <LoadingSpinner />} */}
      <LoadingSpinner open={isLoading} />
      <h2>Login Required</h2>
      <hr />
      <form className={classes.root} onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <TextField
            variant="outlined"
            id="name"
            name="name"
            label="Your Name"
            required
          />
        )}
        {!isLoginMode && (
          <TextField
            variant="outlined"
            id="location"
            name="location"
            label="Your City"
            required
          />
        )}
        <TextField
          variant="outlined"
          id="email"
          name="email"
          type="email"
          label="Email"
          required
          autoComplete="email"
        />
        <TextField
          variant="outlined"
          id="password"
          name="password"
          type="password"
          label="Password"
          required
          autoComplete="on"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {isLoginMode ? "Login" : "New Account"}
        </Button>
        <Button variant="outlined" onClick={switchToRegister}>
          Switch to {isLoginMode ? "Register" : "Login"}
        </Button>
      </form>

      <ErrorBar error={error} errorMessage={error} onClear={clearError} />
    </Card>
  );
};

export default Auth;
