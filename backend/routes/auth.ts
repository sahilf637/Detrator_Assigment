import express, { Request, Response } from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/login", (req: Request, res: Response) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const sessionID = crypto.randomBytes(16).toString("hex");
  res.json({ sessionID, username });
});

export default router;
