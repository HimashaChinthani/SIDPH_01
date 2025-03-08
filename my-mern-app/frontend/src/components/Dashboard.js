import React from 'react';
import '../css/Dashboard.css';  // Importing Dashboard.css from the css folder

const Dashboard = () => {
  const username = localStorage.getItem('username') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
