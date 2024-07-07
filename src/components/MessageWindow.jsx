// MessageWindow.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";

const fetchMessages = async (messageId, setMessages) => {
  try {
    const res = await axios.get(
      `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${messageId}`
    );
    setMessages(res.data.data);
  } catch (err) {
    console.error(err);
  }
};

const Message = ({ message, sender, timestamp, isSender }) => (
  <Box
    display="flex"
    flexDirection={isSender ? "row-reverse" : "row"}
    alignItems="center"
    mb={2}
  >
    <Avatar alt={sender.name} src={sender.avatar || "U"} />
    <Paper
      elevation={3}
      style={{
        padding: "10px",
        marginLeft: isSender ? "0" : "10px",
        marginRight: isSender ? "10px" : "0",
        // maxWidth: "60%",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        {sender.name}
      </Typography>
      <Typography variant="body1">{message}</Typography>
      <Typography variant="caption" color="textSecondary">
        {new Date(timestamp).toLocaleString()}
      </Typography>
    </Paper>
  </Box>
);

const MessageList = ({ messages }) => (
  <Box>
    {messages.map((msg, index) => (
      <React.Fragment key={msg.id}>
        {(index === 0 ||
          new Date(messages[index - 1].created_at).toDateString() !==
            new Date(msg.created_at).toDateString()) && (
          <Divider
            style={{
              margin: "10px 0",
            }}
          >
            {new Date(msg.created_at).toDateString()}
          </Divider>
        )}
        <Message
          message={msg.message}
          sender={msg.sender}
          timestamp={msg.created_at}
          isSender={msg.sender.name !== "BeyondChat"}
        />
      </React.Fragment>
    ))}
  </Box>
);

export const MessageWindow = () => {
  const [messages, setMessages] = useState([]);
  const messageId = useSelector((state) => state.selectedMessage.messageId);

  useEffect(() => {
    if (messageId) {
      fetchMessages(messageId, setMessages);
    }
  }, [messageId]);

  return (
    <Container
      maxWidth="md"
      style={{
        padding: "20px",
        borderRadius: "10px",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h5"
        style={{
          marginBottom: "20px",
          zIndex: 2,
          position: "fixed",
        }}
      >
        Chat
      </Typography>
      <MessageList messages={messages} />
    </Container>
  );
};
