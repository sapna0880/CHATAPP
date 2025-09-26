// require('dotenv').config();
// const express = require('express');
// const http = require('http');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const { Server } = require('socket.io');
// const Message = require('./models/Message');

// const app = express();
// const server = http.createServer(app);

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 4000;
// const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-chat-js';

// mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB error', err));

// app.get('/api/messages', async (req, res) => {
//   const msgs = await Message.find().sort({ createdAt: 1 }).limit(100);
//   res.json(msgs);
// });

// const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
//     methods: ['GET','POST']
//   }
// });

// io.on('connection', (socket) => {
//   console.log('client connected', socket.id);

//   socket.on('join', (username) => {
//     socket.data.username = username || 'Anonymous';
//     console.log(`${socket.data.username} joined (${socket.id})`);
//   });

//   socket.on('message', async (payload) => {
//     // payload: { text, username }
//     const msg = new Message({
//       username: payload.username || socket.data.username || 'Anonymous',
//       text: payload.text
//     });
//     await msg.save();
//     io.emit('message', msg); // broadcast to all clients
//   });

//   socket.on('disconnect', () => {
//     console.log('client disconnected', socket.id);
//   });
// });

// server.listen(PORT, () => console.log('Server listening on', PORT));

require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

// Message model
const Message = require('./models/Message'); // Make sure this exists

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-chat-js';

// Connect to MongoDB
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));

// API route to get last 100 messages
app.get('/api/messages', async (req, res) => {
  const msgs = await Message.find().sort({ createdAt: 1 }).limit(100);
  res.json(msgs);
});

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Client connected', socket.id);

  socket.on('join', (username) => {
    socket.data.username = username || 'Anonymous';
    console.log(`${socket.data.username} joined (${socket.id})`);
  });

  socket.on('message', async (payload) => {
    // Save message to MongoDB
    const msg = new Message({
      username: payload.username || socket.data.username || 'Anonymous',
      text: payload.text
    });
    await msg.save();

    // Broadcast to all clients
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

server.listen(PORT, () => console.log('Server listening on port', PORT));
