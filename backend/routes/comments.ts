import express, { Request, Response } from "express";
import { Connection } from "mysql2";
import { Server } from "socket.io";

const router = express.Router();

router.get("/comments", (req: Request, res: Response) => {
  const db = req.app.get("db") as Connection;
  db.query("SELECT * FROM comments ORDER BY timestamp DESC", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

router.post("/comments", (req: Request, res: Response) => {
  const { username, comment } = req.body;
  const db = req.app.get("db") as Connection;
  const io = req.app.get("io") as Server;

  if (!username || !comment) {
    return res.status(400).json({ error: "Username and comment are required" });
  }

  db.query(
    "INSERT INTO comments (username, comment) VALUES (?, ?)",
    [username, comment],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database insertion error" });
      }

      const newComment = {
        id: results.insertId,
        username,
        comment,
        timestamp: new Date(),
      };

      io.emit("new_comment", newComment);
      res.status(200).json(newComment);
    },
  );
});

export default router;
