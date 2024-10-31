import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const CommentForm = ({ onAddComment }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
        Post
      </Button>
    </Box>
  );
};

export default CommentForm;
