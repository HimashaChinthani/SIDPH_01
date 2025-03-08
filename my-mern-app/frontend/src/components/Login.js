import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';  // Importing Login.css from the css folder
import CrickeImage from '../images/cricket3.png'; // Importing the image

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      setTimeout(() => (window.location.href = '/dashboard'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container"> {/* Apply the 'auth-container' class here */}
      
      <div className="auth-form">
        <h2>Login</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">Login</button>
          <div className='signupcontent'>
            <p>Do you haven't Signup yet ?</p>
            <a href="/signup">Signup</a>
          </div>
        </form>
      </div>

      <div className="image">
        <img src={CrickeImage} alt="Cricket Image" />
      </div>
    </div>
  );
};

export default Login;
