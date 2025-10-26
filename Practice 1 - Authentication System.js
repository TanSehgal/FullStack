// Practice 1 - Authentication System (React)
import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password are required.');
    } else {
      setError('');
      console.log('Username:', username);
      console.log('Password:', password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
