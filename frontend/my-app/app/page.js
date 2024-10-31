"use client";
import React, { useState, useEffect } from "react";
import axios from "./utils/api";
import { io } from "socket.io-client";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";

const HomePage = () => {
  const socket = io("ws://localhost:4000", {
    transports: ["websocket"],
  });

  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");

      socket.on("new-comment", (comment) => {
        console.log("Received new comment from server:", comment);
        setComments((prevComments) => [comment, ...prevComments]);
      });
    });

    return () => {
      socket.off("new-comment");
      socket.off("connect");
    };
  }, []);

  const handleLogin = async () => {
    const response = await axios.post("/login", { username });
    if (response.data.sessionID) {
      setLoggedIn(true);
    }
  };

  const handleAddComment = async (comment) => {
    const response = await axios.post("/comments", { username, comment });
    if (response.status === 200) {
      socket.emit("new-comment", response.data);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {!loggedIn ? (
        <Paper
          elevation={3}
          sx={{ padding: 4, borderRadius: 3, textAlign: "center" }}
        >
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            Welcome to Chat
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
            Please enter your name to join the conversation.
          </Typography>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            sx={{ py: 1 }}
          >
            Join Chat
          </Button>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", mb: 2 }}
          >
            Live Comments
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              mb: 3,
              paddingRight: 1,
            }}
          >
            <CommentList comments={comments} currentUsername={username} />
          </Box>
          <Divider sx={{ mb: 2 }} />
          <CommentForm onAddComment={handleAddComment} />
        </Paper>
      )}
    </Container>
  );
};

export default HomePage;
