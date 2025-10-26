// Practice 3 - Authentication System (RBAC, Node.js/Express)
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const SECRET = 'your_jwt_secret';
// Dummy users for demo
const USERS = [
  { username: 'admin', password: 'pass', role: 'Admin' },
  { username: 'mod', password: 'pass', role: 'Moderator' },
  { username: 'user', password: 'pass', role: 'User' }
];
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}
app.get('/admin', authenticateToken, authorizeRoles('Admin'), (req, res) => {
  res.json({ message: 'Admin dashboard', user: req.user });
});
app.get('/moderator', authenticateToken, authorizeRoles('Moderator', 'Admin'), (req, res) => {
  res.json({ message: 'Moderator tools', user: req.user });
});
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'User profile', user: req.user });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
