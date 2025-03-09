import React from 'react';
import '../css/Dashboard.css';

const Dashboard = () => {
  const username = localStorage.getItem('username') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2 className="welcome-message">Welcome, {username}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
