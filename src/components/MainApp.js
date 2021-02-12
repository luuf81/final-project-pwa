import React, { useState, useEffect } from "react";
import {
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Grid,
  TextField,
  FormControl,
  Paper,
} from "@material-ui/core";
import { Folder, Restore, Favorite, LocationOn, Equalizer, FitnessCenter, Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import io from "socket.io-client"

import { user } from "../reducers/user";
import {
  fetchActivities,
  fetchExercises,
  postActivity,
} from "../reducers/workout";
import { workout } from "../reducers/workout"
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkouts } from "../reducers/workout";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import UserList from "./UserList";
import Stats from "./Stats";

const URL = "https://happyhabits.herokuapp.com/users";

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: "800px",
    width: "600px",
    margin: "30px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0,
    },
  },
  userPaper: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "100%"
    },
  },
  activitiesPaper: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "100%"
    },
  },
  statsPaper: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "100%"
    },
  },
  hiddenPaper: {
    minWidth: "410px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  stickyNav: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "black",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export const MainApp = (props) => {
  const dispatch = useDispatch();

  const classes = useStyles(props);

  const workouts = useSelector((store) => store.workout.workouts);
  const activities = useSelector((store) => store.workout.activities);

  const [value, setValue] = useState("activities");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchExercises());
    dispatch(fetchWorkouts());
    dispatch(fetchActivities());
  }, []);

  return (
    <>
      <Grid container item wrap="nowrap" justify="center">
        <Paper elevation={0}
          className={
            (classes.paper, value === "users" ? classes.userPaper : classes.hiddenPaper)
          }
        >
          <UserList />
        </Paper>
        <Paper elevation={0} className={(classes.paper, value === "activities" ? classes.activitiesPaper : classes.hiddenPaper)}>
          <ActivityForm />
          <ActivityList />
        </Paper>
        <Paper elevation={0} className={(classes.paper, value === "stats" ? classes.statsPaper : classes.hiddenPaper)}>
          <Stats />
        </Paper>
      </Grid>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.stickyNav}
      >
        <BottomNavigationAction
          label="Users"
          value="users"
          icon={<Person />}
        />
        <BottomNavigationAction
          label="Activities"
          value="activities"
          icon={<FitnessCenter/>}
        />
        <BottomNavigationAction
          label="Stats"
          value="stats"
          icon={<Equalizer />}
        />
      </BottomNavigation>
    </>
  );
};
export default MainApp;
