import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = 'https://computersproducts-4.onrender.com';
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    let data;
try {
  data = await res.json();
} catch (e) {
  console.error('Failed to parse JSON:', e);
  const text = await res.text();
  console.error('Raw response:', text);
  alert('Login failed. Server error.');
  return;
}

    if (res.ok) {
      login(data.token);
      navigate('/products');
    } else {
      alert('Login failed');
    }
  };

  return (
      <div className="login-wrapper">
         <form onSubmit={handleSubmit} className="login-card">
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>

      </div>
   
  );
}
