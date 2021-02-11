import React, { useState, useEffect } from "react";
import moment from "moment";
import { user } from "../reducers/user";
import { fetchActivities, postActivity, workout } from "../reducers/workout";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkouts } from "../reducers/workout";
import { Box, Switch, FormControlLabel, Card, CardContent, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Avatar } from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
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

const URL = "https://happyhabits.herokuapp.com/users";
export const ActivityList = () => {

  const classes = useStyles();

  const dispatch = useDispatch();
  const activities = useSelector((store) => store.workout.activities);
  const workouts = useSelector((store) => store.workout.workouts);
  const currentUser = useSelector((store) => store.user.login)

  const myWorkouts = workouts.filter(item => item.user._id === currentUser.userId)
  const allWorkouts = workouts.filter(item => currentUser.followedUsers.find( user => user === item.user._id))

  const [all, setAll] = useState(true)

  const handleSwitch = (event) => {
    setAll(!all); //...state, [event.target.name]: event.target.checked }
  };
  console.log(all)
  
  //workouts.activities.map(item => console.log(item))
  //activities.map(item => console.log(item.user.name))

  return (
    
    <Box mt={10} style={{marginTop:"0"}}>
      <FormControlLabel style={{width:"100%", justifyContent:"flex-end"}}
      value="end"
      control={
       <Switch
       color="primary"
        checked={all}
        onChange={handleSwitch}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />}label={all ? "Feed" : "Mine"}/>
      <AvatarGroup max={4}>
      {allWorkouts.map(item => <Avatar className={classes.small} style={{ backgroundColor:"#FF5722"}}>{item.user.name.charAt(0)}</Avatar>)}
    </AvatarGroup>
      {/* <Paper> */}
        {(all ? allWorkouts : myWorkouts).map((item) => (
          <Box m={3}>
            {/* <Card >
              <CardContent> */}
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <Avatar style={{ backgroundColor:"#FF5722"}}>{item.user.name.charAt(0)}</Avatar>
                {/* <Typography>Username: {item.user.name}</Typography> */}
                <Typography variant="subtitle2">{moment(item.sessionDate).format("YYYY-MM-DD")}</Typography></div>
                <TableContainer component={Box}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:"900"}}>Exercise</TableCell>
                            <TableCell style={{fontWeight:"900"}} align="right">Sets</TableCell>
                            <TableCell style={{fontWeight:"900"}} align="right">Reps</TableCell>
                            <TableCell style={{fontWeight:"900"}} align="right">Weight</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {item.activities.map(activity => (
                                <TableRow>
                                    <TableCell component="th" scope="row">{activity.type.name}</TableCell>
                                    <TableCell align="right">{activity.sets}</TableCell>
                                    <TableCell align="right">{activity.reps}</TableCell>
                                    <TableCell align="right">{activity.weight}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                </Table>
                </TableContainer>
              {/* </CardContent>
            </Card> */}
          </Box>
        ))}
      {/* </Paper> */}
    </Box>
  );
};

export default ActivityList;
