import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup'; // Correct path for Signup component
import Login from './components/Login';   // Correct path for Login component
import Dashboard from './components/Dashboard'; // Correct path for Dashboard component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect to /login when user visits the root path */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Route for Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Route for Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
