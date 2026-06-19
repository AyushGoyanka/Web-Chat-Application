import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import Message from "./models/Message.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = createServer(app);

const io = new Server(server, {
cors: {
origin: "*",
},
});

const ROOM = "group";

// username -> socket id
const users = {};

// socket id -> profile
const socketUsers = {};

io.on("connection", (socket) => {
console.log("Connected:", socket.id);

// JOIN USER WITH PROFILE
socket.on("joinRoom", (profile) => {
const { username, bio, avatar } = profile;


if (!username?.trim()) return;

if (users[username]) {
  socket.emit("usernameTaken");
  return;
}

users[username] = socket.id;

socketUsers[socket.id] = {
  username,
  bio,
  avatar,
};

socket.join(ROOM);

io.emit(
  "userStatus",
  Object.values(socketUsers).map((user) => ({
    ...user,
    online: true,
  }))
);

socket.to(ROOM).emit(
  "roomNotice",
  `${username} joined`
);


});

// GROUP MESSAGE
socket.on("chatMessage", async (msg) => {
const sender = socketUsers[socket.id];


const message = {
  ...msg,
  avatar: sender?.avatar || null,
  bio: sender?.bio || "",
};

try {
  await Message.create({
    sender: msg.sender,
    receiver: "GROUP",
    text: msg.text,
    isPrivate: false,
    avatar: sender?.avatar || "",
    bio: sender?.bio || "",
  });
} catch (error) {
  console.error("Message Save Error:", error);
}

io.to(ROOM).emit("chatMessage", message);


});

// PRIVATE MESSAGE
socket.on("privateMessage", ({ sender, receiver, text }) => {
const senderData = socketUsers[socket.id];

const message = {
  id: Date.now(),
  sender,
  text,
  ts: Date.now(),
  avatar: senderData?.avatar || null,
  bio: senderData?.bio || "",
  private: true,
};

const receiverSocket = users[receiver];

if (receiverSocket) {
  io.to(receiverSocket).emit("privateMessage", {
    ...message,
    partner: sender,
  });
}

socket.emit("privateMessage", {
  ...message,
  partner: receiver,
});


});

// TYPING
socket.on("privateTyping", ({ sender, receiver }) => {
const receiverSocket = users[receiver];


if (receiverSocket) {
  io.to(receiverSocket).emit(
    "privateTyping",
    sender
  );
}


});

socket.on("stopPrivateTyping", ({ sender, receiver }) => {
const receiverSocket = users[receiver];


if (receiverSocket) {
  io.to(receiverSocket).emit(
    "stopPrivateTyping",
    sender
  );
}


});

// DISCONNECT
socket.on("disconnect", () => {
const profile = socketUsers[socket.id];


if (profile) {
  delete users[profile.username];
  delete socketUsers[socket.id];

  io.emit("userOffline", profile.username);

  io.emit(
    "userStatus",
    Object.values(socketUsers).map((user) => ({
      ...user,
      online: true,
    }))
  );
}

console.log("Disconnected:", socket.id);


});
});

app.get("/", (req, res) => {
res.json({
message: "Server Running",
mongodb: "Connected",
});
});

server.listen(process.env.PORT || 4600, () => {
console.log(
`Server running on http://localhost:${process.env.PORT || 4600}`
);
});
