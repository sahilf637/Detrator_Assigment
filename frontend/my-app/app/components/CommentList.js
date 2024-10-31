import React, { useEffect, useRef } from "react";
import { List, ListItem, ListItemText, Divider, Box } from "@mui/material";

const CommentList = ({ comments, currentUsername }) => {
  const endOfListRef = useRef(null);

  // Scroll to the bottom whenever comments change
  useEffect(() => {
    endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  // Sort comments by timestamp in ascending order
  const sortedComments = [...comments].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
  );

  return (
    <List sx={{ maxHeight: "400px", overflowY: "auto" }}>
      {sortedComments.map((comment) => (
        <React.Fragment key={comment.id}>
          <ListItem
            sx={{
              display: "flex",
              justifyContent:
                comment.username === currentUsername
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                bgcolor:
                  comment.username === currentUsername ? "#DCF8C6" : "#EAEAEA",
                padding: 2,
                borderRadius: 2,
                alignSelf:
                  comment.username === currentUsername
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <ListItemText
                primary={`${comment.username}: ${comment.comment}`}
                secondary={new Date(comment.timestamp).toLocaleString()}
              />
            </Box>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      {/* Dummy div to scroll into view */}
      <div ref={endOfListRef} />
    </List>
  );
};

export default CommentList;
