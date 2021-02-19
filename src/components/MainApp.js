import React, { useState, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
} from "@material-ui/core";
import { Equalizer, FitnessCenter, Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {
  fetchActivities,
  fetchExercises,
} from "../reducers/workout";
import { useDispatch } from "react-redux";
import { fetchWorkouts } from "../reducers/workout";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import UserList from "./UserList";
import Stats from "./Stats";

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
    minWidth: "400px",
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

  const [value, setValue] = useState("activities");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchExercises());
    dispatch(fetchWorkouts());
    dispatch(fetchActivities());
  }, [dispatch]);

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
