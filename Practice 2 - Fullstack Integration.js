// Practice 2 - Fullstack Integration
// --- Redux Toolkit Shopping Cart Example ---
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
const initialCart = [];
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    addItem: (state, action) => {
      const existing = state.find(i => i.name === action.payload.name);
      if (existing) existing.qty++;
      else state.push({ ...action.payload, qty: 1 });
    },
    removeItem: (state, action) => state.filter(i => i.name !== action.payload),
    updateQty: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) item.qty = action.payload.qty;
    }
  }
});
export const { addItem, removeItem, updateQty } = cartSlice.actions;
export const store = configureStore({ reducer: { cart: cartSlice.reducer } });
// App.js (excerpt)
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQty } from './store';
const products = [
  { name: 'Laptop', price: 50000 },
  { name: 'Phone', price: 30000 }
];
function App() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.name}>
          {p.name}: ₹{p.price}
          <button onClick={() => dispatch(addItem(p))}>Add to Cart</button>
        </div>
      ))}
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : cart.map(i => (
        <div key={i.name}>
          {i.name} × {i.qty} = ₹{i.price * i.qty}
          <button onClick={() => dispatch(removeItem(i.name))}>Remove</button>
          <input type="number" value={i.qty} min="1" onChange={e => dispatch(updateQty({ name: i.name, qty: +e.target.value }))} />
        </div>
      ))}
    </div>
  );
}
// index.js should wrap App in <Provider store={store}>
export default App;
