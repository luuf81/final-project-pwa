import React, { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  Box,
  Switch,
  FormControlLabel,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Avatar,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export const ActivityList = () => {
  
  const classes = useStyles();

  const workouts = useSelector((store) => store.workout.workouts);
  const currentUser = useSelector((store) => store.user.login);
  const users = useSelector((store) => store.user.users);

  const followed = users.filter(item => (currentUser.followedUsers.find( user => user === item._id)))

  const myWorkouts = workouts.filter(
    (item) => item.user._id === currentUser.userId
  );
  const allWorkouts = workouts.filter((item) =>
    currentUser.followedUsers.find((user) => user === item.user._id)
  );

  const [all, setAll] = useState(true);

  const handleSwitch = (event) => {
    setAll(!all);
  };

  return (
    <Box mt={10} style={{ marginTop: "0" }}>
      <FormControlLabel
        style={{ width: "100%", justifyContent: "flex-end" }}
        value="end"
        control={
          <Switch
            color="primary"
            checked={all}
            onChange={handleSwitch}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        }
        label={all ? "Feed" : "Mine"}
      />
      {all && (
        <AvatarGroup max={8} style={{ marginLeft: "25px" }}>
          {followed.map((item) => (
            <Tooltip key={item._id} title={item.name}>
            <Avatar
              className={classes.small}
              style={{ backgroundColor: "#FF5722" }}
            >
              {item.name.charAt(0)}
            </Avatar></Tooltip>
          ))}
        </AvatarGroup>
      )}

      {(all ? allWorkouts : myWorkouts).map((item) => (
        <Box key={item._id} m={3}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          ><Tooltip title={item.user.name}>
            <Avatar style={{ backgroundColor: "#FF5722" }}>
              {item.user.name.charAt(0)}
            </Avatar>
            </Tooltip>
            <Typography variant="subtitle2">
              {moment(item.sessionDate).format("YYYY-MM-DD")}
            </Typography>
          </div>
          <TableContainer component={Box}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "900" }}>Exercise</TableCell>
                  <TableCell style={{ fontWeight: "900" }} align="right">
                    Sets
                  </TableCell>
                  <TableCell style={{ fontWeight: "900" }} align="right">
                    Reps
                  </TableCell>
                  <TableCell style={{ fontWeight: "900" }} align="right">
                    Weight
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item.activities.map((activity) => (
                  <TableRow key={activity._id}>
                    <TableCell component="th" scope="row">
                      {activity.type.name}
                    </TableCell>
                    <TableCell align="right">{activity.sets}</TableCell>
                    <TableCell align="right">{activity.reps}</TableCell>
                    <TableCell align="right">{activity.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
};

export default ActivityList;
