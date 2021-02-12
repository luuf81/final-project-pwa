import React, { useState, useEffect } from "react";
import { Container, Paper, Snackbar } from "@material-ui/core";
import { user } from "./reducers/user";
import { useSelector } from "react-redux";

export const NewActivity = () => {
  const [open, setOpen] = useState(false);

  const newActivity = useSelector((store) => store.workout.newActivity);

  useEffect(() => {
    if (newActivity) setOpen(true);
  }, [newActivity]);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={
          newActivity &&
          `🏋🏻‍♂️  ${newActivity.user.name} logged ${newActivity.sets} sets ${newActivity.type.name} at ${newActivity.weight} kg🏋🏻‍♂️`
        }
      />
    </>
  );
};

export default NewActivity;
