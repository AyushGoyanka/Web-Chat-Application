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


import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const ROOM = "group";
const users = {}; // username -> socketId

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("joinRoom", async (userName) => {
    userName = userName.trim();

    if (users[userName]) {
      socket.emit("usernameTaken");
      return;
    }

    users[userName] = socket.id;

    await socket.join(ROOM);

    io.emit("onlineUsers", Object.keys(users));

    socket.to(ROOM).emit("roomNotice", `${userName} joined`);
  });

  socket.on("chatMessage", (msg) => {
    socket.to(ROOM).emit("chatMessage", msg);
  });

  socket.on("privateMessage", ({ sender, receiver, text }) => {
    const receiverSocketId = users[receiver];

    const msg = {
      id: Date.now(),
      sender,
      text,
      ts: Date.now(),
      private: true,
    };

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("privateMessage", {
        ...msg,
        partner: sender,
      });
    }

    socket.emit("privateMessage", {
      ...msg,
      partner: receiver,
    });
  });

  socket.on("typing", (userName) => {
    socket.to(ROOM).emit("typing", userName);
  });

  socket.on("stopTyping", (userName) => {
    socket.to(ROOM).emit("stopTyping", userName);
  });

  socket.on("disconnect", () => {
    const username = Object.keys(users).find(
      (key) => users[key] === socket.id
    );

    if (username) {
      delete users[username];
      io.emit("onlineUsers", Object.keys(users));
    }
  });
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

server.listen(4600, () => {
  console.log("http://localhost:4600");
});