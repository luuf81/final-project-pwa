import { createSlice } from "@reduxjs/toolkit";
//import io from "socket.io-client"

const initialState = {
  users: [],
  onlineUsers: [],
  login: {
    accessToken: localStorage.accessToken || null,
    userId: localStorage.userId || 0,
    statusMessage: "",
  },
};

//let socket

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setOnlineusers: (state, action) => {
      console.log(action.payload);
      state.onlineUsers.push(action.payload);
    },
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      console.log(`Access Token: ${accessToken}`);
      state.login.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      console.log(`User Id: ${userId}`);
      state.login.userId = userId;
      localStorage.setItem("userId", userId);
    },
    setStatusMessage: (state, action) => {
      const { statusMessage } = action.payload;
      console.log(`Status Message: ${statusMessage}`);
      state.login.statusMessage = statusMessage;
    },
    logout: (state, action) => {
      console.log("Logging out");
      state.login.userId = 0;
      state.login.accessToken = null;
    },
  },
});

export const fetchUsers = () => {
  return (dispatch) => {
    //console.log(localStorage.getItem('accessToken'))
    fetch("https://happyhabits.herokuapp.com/users", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("accessToken") },
    })
      .then((res) => res.json())
      .then((users) => {
        dispatch(user.actions.setUsers(users));
      });
  };
};

export const followUser = (userName) => {
  return (dispatch) => {
    console.log(userName);
    //console.log(localStorage.getItem('accessToken'))
    fetch("https://happyhabits.herokuapp.com/followuser", {
      method: "POST",
      headers: {'Content-Type': 'application/json', Authorization: localStorage.getItem('accessToken')},
      body: JSON.stringify({ name: userName }),
    })
      .then((res) => res.json())
      .then((users) => {
        dispatch(user.actions.setUsers(users));
        
      });
  };
};

// export const socketEvents = () => {
//   return(dispatch) => {
//   if(!socket) {
//     socket = io('http://localhost:3001')
//     socket.on()
//     console.log(socket)
//   }
// }}
