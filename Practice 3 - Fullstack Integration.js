// Practice 3 - Fullstack Integration.js
// --- Backend (Node.js/Express & Socket.io) ---
// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });
let users = [];
io.on('connection', (socket) => {
  socket.on('join', name => {
    users.push({ id: socket.id, name });
    io.emit('users', users);
  });
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
  socket.on('disconnect', () => {
    users = users.filter(u => u.id !== socket.id);
    io.emit('users', users);
  });
});
server.listen(5001, () => console.log('Chat server running on port 5001'));

// --- Frontend (React, Chat.js) ---
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5001');
function Chat() {
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on('message', msg => setMessages(m => [...m, msg]));
    // Optionally listen for user list updates
    return () => { socket.off('message'); };
  }, []);
  const send = () => {
    if (!name || !input) return;
    socket.emit('join', name);
    socket.emit('message', { user: name, text: input });
    setInput('');
  };
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" />
      <button onClick={send}>Send</button>
      <div>
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.user}:</strong> {msg.text}</div>
        ))}
      </div>
    </div>
  );
}
export default Chat;
