import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
} from "@material-ui/core";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend
} from "recharts";

export const Stats = () => {

  let setsData = [
    {
      muscle: "Chest",
      sets: 0,
      allSets: 0
    },
    {
      muscle: "Shoulders",
      sets: 0,
      allSets: 0
    },
    {
      muscle: "Triceps",
      sets: 0,
      allSets: 0
    },
    {
      muscle: "Biceps",
      sets: 0,
      allSets: 0
    },
    {
      muscle: "Back",
      sets: 0,
      allSets: 0
    },
    {
      muscle: "Abs",
      sets: 0,
      allSets: 0
    },
    {
      muscle: "Front Legs",
      sets: 0,
      allSets: 0
    },
    {
      muscle: "Back Legs",
      sets: 0,
      allSets: 0
    },
    {
      muscle: "Glutes",
      sets: 0,
      allSets: 0
    },
    {
      muscle: "Calves",
      sets: 0,
      allSets: 0
    },
  ] 

  
  const activities = useSelector((store) => store.workout.activities);
  const currentExercise = useSelector((store) => store.workout.currentExercise.name);
  const currentUser = useSelector((store) => store.user.login);

  const allActivities = activities.filter(item => ((currentUser.followedUsers.find( user => user === item.user._id)) || item.user._id === currentUser.userId))
  const myActivities = activities.filter(item => item.user._id === currentUser.userId)

  const currentExerciseActivity = myActivities.filter(item => item.type.name === currentExercise)

  //calculate average sets per muscle group for followed users and sets per muscle group for logged in user

  allActivities.forEach(item => {
    const found = setsData.find(exercise => exercise.muscle === item.type.primaryMuscle)
    if(item.user._id === currentUser.userId) found.sets += item.sets
    else found.allSets += (item.sets / currentUser.followedUsers.length)
  })  

  const exerciseWeight = myActivities
    .filter((item) => item.type.name === currentExercise)
    .reverse();

  function formatXAxis(activityDate) {
    return moment(activityDate).format("ddd");
  }

  function customTick({ payload, x, y, textAnchor, stroke, radius }) {
    return (
      <g
        className="recharts-layer recharts-polar-angle-axis-tick"
      >
        <text
          radius={radius}
          fill="white"
          stroke={stroke}
          x={x}
          y={y}
          className="recharts-text recharts-polar-angle-axis-tick-value"
          textAnchor={textAnchor}
        >
          <tspan x={x} dy="0em">
            {payload.value}
          </tspan>
        </text>
      </g>
    );
  }

  return (
    <>
    <Container>
    <Typography style={{marginTop:"30px"}}>Your muscle (im)balance for logged activities compared to your followed users</Typography>
    <RadarChart outerRadius={90} width={350} height={300} data={setsData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="muscle"  tick={customTick}/>

        <Radar
          name="Followed"
          dataKey="allSets"
          stroke="#FF5722"
          fill="#FF5722"
          fillOpacity={0.6}
        />
        <Radar
          name="You"
          dataKey="sets"
          stroke="#90CAF9"
          fill="#90CAF9"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
      {(currentExercise && currentExerciseActivity.length !== 0) && <>
      <Typography style={{margin:"30px"}}>Your recent {currentExercise} workout history </Typography>
      <LineChart width={300} height={250} data={exerciseWeight}>
        <Line type="monotone" dataKey="weight" stroke="#90CAF9" strokeWidth={3}/>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="activityDate" tickFormatter={formatXAxis} />
        <YAxis />
        <Tooltip label="activityDate" />
      </LineChart></>}
      </Container>
    </>
  );
};

export default Stats;
