// Practice 1 - Backend.js
const express = require('express');
const app = express();
// Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
// Auth Middleware
function authMiddleware(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || auth !== 'Bearer mysecrettoken') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
app.get('/public', (req, res) => res.json({ message: 'Public route accessible' }));
app.get('/protected', authMiddleware, (req, res) => res.json({ message: 'Protected route accessed!' }));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
