import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { user } from "../reducers/user";
import {
  Paper,
  Container,
  Button,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
const SIGNUP_URL = "https://happyhabits.herokuapp.com/users";
const LOGIN_URL = "https://happyhabits.herokuapp.com/sessions";

export const LoginForm = () => {
  
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSuccess = (loginResponse) => {
    console.log(loginResponse);
    localStorage.setItem("superToken", loginResponse.accessToken);
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    );
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(user.actions.setFollowedUsers(loginResponse.followedUsers));
    dispatch(user.actions.setStatusMessage({ statusMessage: "Login Success" }));
  };

  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  // To sign up a user.
  const handleSignup = (event) => {
    event.preventDefault();

    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };

  // To login a user
  const handleLogin = (event) => {
    event.preventDefault();
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };

  // If user is logged out, show login form
  return (
    <Container maxWidth="xs">
      <Paper elevation={0} style={{backgroundColor:"#333333"}}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography variant="h3">Happy Habits</Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          label="Password"
          margin="normal"
          fullWidth
          variant="outlined"
          required
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
        >
          Sign-Up
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Grid>
      </Paper>
    </Container>
  );
};
export default LoginForm;
