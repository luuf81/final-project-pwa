import React from "react";
import {
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import io from "socket.io-client"

import MainApp from "./components/MainApp";
import { user } from "./reducers/user";
import { workout } from "./reducers/workout";
import UserOnline from "./UserOnline"
import LoginForm from "./components/LoginForm";
import NewActivity from "./NewActivity";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#a6d4fa",
    },
  },
  typography: {
    button: {
      marginTop: "20px",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
}));

export const App = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);

  //Socket client-side
  var socket;
  if (accessToken) {
    socket = io("https://happyhabits.herokuapp.com/");
    socket.emit('user', accessToken)
  }

  if(socket)socket.on('user', userSocket => {
    dispatch(user.actions.setOnlineusers( userSocket.name ))
  })

  if(socket)socket.on('activity', activity => {
    dispatch(workout.actions.setNewActivity(activity))
  })

  return (
    <Container className={classes.mainContainer}>
      {!accessToken && <LoginForm />}
      {accessToken && <MainApp />}
      <UserOnline/>
      <NewActivity/>
    </Container>
  );
};

export default App;

