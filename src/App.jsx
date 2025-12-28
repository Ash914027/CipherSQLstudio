import React, { useState, useEffect } from 'react';
import './App.scss';
import LoginSignup from './components/LoginSignup';
import SQLStudio from './components/SQLStudio';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="app">
      {user ? (
        <SQLStudio user={user} onLogout={handleLogout} />
      ) : (
        <LoginSignup onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;