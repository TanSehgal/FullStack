// Practice 3 - Backend.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/bankdemo');
const accountSchema = new mongoose.Schema({ name: String, balance: Number });
const Account = mongoose.model('Account', accountSchema);
// Sample accounts can be manually added to DB
app.post('/transfer', async (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const sender = await Account.findOne({ name: from });
  const receiver = await Account.findOne({ name: to });
  if (!sender || !receiver) {
    return res.status(404).json({ error: 'Account not found' });
  }
  if (sender.balance < amount) {
    return res.status(400).json({ error: 'Insufficient funds' });
  }
  sender.balance -= amount;
  receiver.balance += amount;
  await sender.save();
  await receiver.save();
  res.json({ message: 'Transfer successful', from: sender.name, to: receiver.name });
});
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log('Server running on port', PORT));
