// import { createServer } from 'node:http';
// import express from 'express';
// import { Server } from 'socket.io';

// const app = express();

// const server = createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: '*',
//     },
// });

// const ROOM = 'group';

// io.on('connection', (socket) => {
//     console.log('a user connected', socket.id);

//     socket.on('joinRoom', async (userName) => {
//         console.log(`${userName} is joining the group.`);

//         await socket.join(ROOM);

//         // send to all
//         // io.to(ROOM).emit('roomNotice', userName);

//         // broadcast
//         socket.to(ROOM).emit('roomNotice', userName);
//     });

//     socket.on('chatMessage', (msg) => {
//         socket.to(ROOM).emit('chatMessage', msg);
//     });

//     socket.on('typing', (userName) => {
//         socket.to(ROOM).emit('typing', userName);
//     });

//     socket.on('stopTyping', (userName) => {
//         socket.to(ROOM).emit('stopTyping', userName);
//     });
// });

// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
// });

// server.listen(4600, () => {
//     console.log('server running at http://localhost:4600');
// });




import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());

// ── In-memory state ──────────────────────────────────────
const onlineUsers = new Map();   // username → socketId
const roomMessages = {};         // room → [messages]
const dmMessages = {};           // dmKey → [messages]
const PUBLIC_ROOMS = ["general", "random", "tech", "gaming"];

// Pre-create room message arrays
PUBLIC_ROOMS.forEach((r) => (roomMessages[r] = []));

// ── REST: rooms list ──────────────────────────────────────
app.get("/rooms", (req, res) => res.json(PUBLIC_ROOMS));

// ── Socket.io ─────────────────────────────────────────────
io.on("connection", (socket) => {
  console.log("🔌 Connected:", socket.id);

  // ── joinRoom ────────────────────────────────────────────
  socket.on("joinRoom", ({ username, room = "general" }) => {
    socket.username = username;
    socket.currentRoom = room;

    socket.join(room);
    onlineUsers.set(username, socket.id);

    // Send updated online list to everyone
    io.emit("onlineUsers", [...onlineUsers.keys()]);

    // Send message history for this room
    socket.emit("messageHistory", roomMessages[room] || []);

    // Notify others in room
    socket.to(room).emit("systemMessage", {
      id: Date.now(),
      text: `${username} joined #${room}`,
      ts: Date.now(),
      isSystem: true,
    });
  });

  // ── switchRoom ──────────────────────────────────────────
  socket.on("switchRoom", (room) => {
    if (socket.currentRoom) socket.leave(socket.currentRoom);
    socket.currentRoom = room;
    socket.join(room);

    if (socket.username) {
      onlineUsers.set(socket.username, socket.id);
      io.emit("onlineUsers", [...onlineUsers.keys()]);
    }

    socket.emit("messageHistory", roomMessages[room] || []);
  });

  // ── chatMessage ─────────────────────────────────────────
  socket.on("chatMessage", (msg) => {
    const room = msg.room || socket.currentRoom || "general";
    const saved = { ...msg, id: msg.id || Date.now() };

    // Store in memory
    if (!roomMessages[room]) roomMessages[room] = [];
    roomMessages[room].push(saved);

    // Broadcast to others in room (sender already has it optimistically)
    socket.to(room).emit("chatMessage", saved);
  });

  // ── privateMessage ──────────────────────────────────────
  socket.on("privateMessage", ({ to, text }) => {
    const from = socket.username;
    if (!from) return;

    const dmKey = [from, to].sort().join("__dm__");
    const msg = {
      id: Date.now(),
      sender: from,
      text,
      ts: Date.now(),
      dmKey,
    };

    if (!dmMessages[dmKey]) dmMessages[dmKey] = [];
    dmMessages[dmKey].push(msg);

    // Send to recipient
    const recipientSocketId = onlineUsers.get(to);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("privateMessage", msg);
    }

    // Echo back to sender
    socket.emit("privateMessage", msg);
  });

  // ── openDM ──────────────────────────────────────────────
  socket.on("openDM", ({ withUser }) => {
    const me = socket.username;
    if (!me) return;
    const dmKey = [me, withUser].sort().join("__dm__");
    socket.emit("dmHistory", { dmKey, withUser, history: dmMessages[dmKey] || [] });
  });

  // ── addReaction ─────────────────────────────────────────
  socket.on("addReaction", ({ messageId, emoji, room, dmKey }) => {
    const username = socket.username;

    // Find message in room or DM
    const list = dmKey ? dmMessages[dmKey] : roomMessages[room || socket.currentRoom];
    if (!list) return;

    const msg = list.find((m) => m.id === messageId);
    if (!msg) return;

    if (!msg.reactions) msg.reactions = {};
    if (!msg.reactions[emoji]) msg.reactions[emoji] = [];

    const users = msg.reactions[emoji];
    if (users.includes(username)) {
      msg.reactions[emoji] = users.filter((u) => u !== username);
    } else {
      msg.reactions[emoji] = [...users, username];
    }

    // Broadcast updated reactions to the room
    const target = dmKey
      ? [onlineUsers.get(socket.username), ...Object.values(Object.fromEntries(onlineUsers))]
      : null;

    if (dmKey) {
      // Notify both DM participants
      const [a, b] = dmKey.split("__dm__");
      [a, b].forEach((u) => {
        const sid = onlineUsers.get(u);
        if (sid) io.to(sid).emit("reactionUpdated", { messageId, reactions: msg.reactions, dmKey });
      });
    } else {
      io.to(room || socket.currentRoom).emit("reactionUpdated", {
        messageId,
        reactions: msg.reactions,
        room,
      });
    }
  });

  // ── typing ───────────────────────────────────────────────
  socket.on("typing", (username) => {
    socket.to(socket.currentRoom).emit("typing", username);
  });
  socket.on("stopTyping", (username) => {
    socket.to(socket.currentRoom).emit("stopTyping", username);
  });

  // ── disconnect ───────────────────────────────────────────
  socket.on("disconnect", () => {
    if (socket.username) {
      onlineUsers.delete(socket.username);
      io.emit("onlineUsers", [...onlineUsers.keys()]);
      console.log(`👋 ${socket.username} disconnected`);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));