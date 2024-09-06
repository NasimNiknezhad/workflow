'use client';

import { useState } from 'react';
import type { UserList } from '@/types/userType';
import '../css/components/login.css';

interface LoginProps {
  onLogin: () => void;
  users: UserList[]; 
}

export default function Login({ onLogin, users }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  console.log('component-user' , users)


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) {
      setErrorMessage('User not found');
      return;
    }

    if (foundUser.password === password) {
      localStorage.setItem('authToken', 'mockToken');
      setErrorMessage('');
      onLogin();
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}