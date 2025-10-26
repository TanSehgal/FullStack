// Practice 2 - Backend.js
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const SECRET = 'mybanksecret';
const USER = { username: 'user', password: 'pass', balance: 1000 };
// Fake DB
let user = { ...USER };
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, userPayload) => {
    if (err) return res.sendStatus(403);
    req.user = userPayload;
    next();
  });
}
app.get('/balance', auth, (req, res) => {
  res.json({ balance: user.balance });
});
app.post('/deposit', auth, (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  user.balance += amount;
  res.json({ balance: user.balance });
});
app.post('/withdraw', auth, (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  if (user.balance < amount) {
    return res.status(400).json({ error: 'Insufficient funds' });
  }
  user.balance -= amount;
  res.json({ balance: user.balance });
});
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log('Server running on port', PORT));
