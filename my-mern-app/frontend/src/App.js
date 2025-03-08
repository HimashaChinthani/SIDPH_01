import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';



const App = () => {
  return (
    <Router>
      <Routes>

        {/* Redirect to /login when user visits the root path */}
        <Route path="/" element={<Navigate to="/login" />} />
         <Route path="/" element={<Navigate to="/signup" />} /> 
         <Route path="/signup" element={<Signup />} /> 
        {/* Route for Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
