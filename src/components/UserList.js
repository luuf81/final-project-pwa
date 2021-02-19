import React, { useEffect } from "react";
import { fetchFollowed, fetchUsers } from "../reducers/user";
import { followUser, unfollowUser } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Badge,
  IconButton,
  Typography
} from "@material-ui/core";
import { PersonAdd, People } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export const UserList = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.user.login);
  const users = useSelector((store) => store.user.users);
  const onlineUsers = useSelector((store) => store.user.onlineUsers);
  const followedUsers = useSelector((store) => store.user.login.followedUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [onlineUsers]);

  useEffect(() => {
    dispatch(fetchFollowed());
  }, [followedUsers]);

  const handleFollowUser = (userName) => {
    dispatch(followUser(userName));
  };

  const handleUnfollowUser = (userName) => {
    dispatch(unfollowUser(userName));
  };

  return (
    <>
      <Typography align="center" variant="h5" style={{ margin: "20px" }}>
        💪 Your gym buddies 💪
      </Typography>
      {users.map((user) =>
        onlineUsers.find((item) => item === user.name) ? (
          <div
            key={user._id}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "5px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar style={{ backgroundColor: "#FF5722" }}>
                  {user.name.charAt(0)}
                </Avatar>
              </StyledBadge>
              <Typography style={{ marginLeft: "15px" }}>
                {user.name}
              </Typography>
            </div>
            {!currentUser.followedUsers.find((item) => item === user._id) ? (
              <IconButton
                aria-label="delete"
                onClick={(e) => handleFollowUser(user.name)}
              >
                <PersonAdd />
              </IconButton>
            ) : (
              <IconButton
                aria-label="delete"
                onClick={(e) => handleUnfollowUser(user.name)}
              >
                <People />
              </IconButton>
            )}
          </div>
        ) : (
          <div
            key={user._id}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "5px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar style={{ backgroundColor: "#FF5722" }}>
                {user.name.charAt(0)}
              </Avatar>
              <Typography style={{ marginLeft: "15px" }}>
                {user.name}
              </Typography>
            </div>
            {!currentUser.followedUsers.find((item) => item === user._id) ? (
              <IconButton
                aria-label="delete"
                onClick={(e) => handleFollowUser(user.name)}
              >
                <PersonAdd />
              </IconButton>
            ) : (
              <IconButton
                aria-label="delete"
                onClick={(e) => handleUnfollowUser(user.name)}
              >
                <People />
              </IconButton>
            )}
          </div>
        )
      )}
    </>
  );
};

export default UserList;
