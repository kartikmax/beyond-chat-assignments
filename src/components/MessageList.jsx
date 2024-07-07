// MessageList.js
import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectMessage } from "../redux/selectedMessageSlice";

function extractTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export const MessageList = ({ title, msgCount, status, time, id }) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        border: "1px solid",
        padding: "10px",
        borderRadius: "8px",
        margin: "10px 0",
        backgroundColor: "#f9f9f9",
        cursor: "pointer"
      }}
      onClick={() => {
        dispatch(selectMessage(id));
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar>{title.charAt(0).toUpperCase()}</Avatar>
        <Stack flex={1}>
          <Typography variant="subtitle1" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {status}
          </Typography>
        </Stack>
        <Stack alignItems="flex-end">
          <Typography variant="caption" color="red">
            {extractTime(time)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {msgCount}
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};
