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

const Auth = (props) => {
  console.log(props);
  const auth = useContext(AuthContext);
  let history = useHistory();
  const classes = useStyles();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const clearError = () => {
    setError(null);
  };
  const authSubmitHandler = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(e.target, "form");
    console.log(data, "data");
    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await fetch("http://localhost:4000/api/users/login", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        });

        const resJson = await response.json();

        if (!response.ok) {
          throw new Error(resJson.message);
        }
        console.log(resJson); // Should set this into state...
        setIsLoading(false);

        auth.login(resJson.user._id); // ...here
        history.push("/");
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong");
      }
    } else {
      try {
        const response = await fetch("http://localhost:4000/api/users/signup", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        });

        const resJson = await response.json();

        if (!response.ok) {
          throw new Error(resJson.message);
        }

        console.log(resJson);
        setIsLoading(false);
        auth.login(resJson.user._id);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong");
      }
    }
  };
  const switchToRegister = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <Card className="authentication">
      {isLoading && <LoadingSpinner />}
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
        <Button type="submit" variant="contained">
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
