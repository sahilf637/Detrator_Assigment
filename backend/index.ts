import express, { Application } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mysql, { Connection } from "mysql2";
import path from "path";
import authRoutes from "./routes/auth";
import commentRoutes from "./routes/comments";

interface CustomApplication extends Application {
  db?: Connection;
  io?: Server;
}

const app: CustomApplication = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "AssignmentDB",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.set("db", db);
app.set("io", io);

app.use("/api", authRoutes);
app.use("/api", commentRoutes);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Listen for new comments from client
  socket.on("new-comment", (comment) => {
    console.log("New comment received:", comment);

    // Broadcast the comment to all connected clients
    io.emit("new-comment", comment);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
