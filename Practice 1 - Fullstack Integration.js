// Practice 1 - Fullstack Integration
// --- Backend (Express.js) ---
// app.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const products = [
  { name: 'Product A', price: 20 },
  { name: 'Product B', price: 40 },
  { name: 'Product C', price: 60 },
];
app.get('/api/products', (req, res) => {
  res.json(products);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('API running on port', PORT));

// --- Frontend (React, client/src/Products.js) ---
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => { setItems(res.data); setLoading(false); })
      .catch(() => { setError('Error fetching data'); setLoading(false); });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <ul>
      {items.map((p, idx) => (
        <li key={idx}>{p.name}: ₹{p.price}</li>
      ))}
    </ul>
  );
}
export default Products;
