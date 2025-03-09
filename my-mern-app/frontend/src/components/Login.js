import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';  // Importing Login.css from the css folder
import '../css/Message.css';  // Importing message.css from the css folder
import CrickeImage from '../images/cricket3.png'; // Importing the image

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // To manage the type of message (error/success)
  const [showMessage, setShowMessage] = useState(false); // To control showing and hiding of messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation for empty fields
    if (!formData.username || !formData.password) {
      setMessage('Please fill in both fields');
      setMessageType('error'); // Set the message type to error
      setShowMessage(true); // Show message
      setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      setMessage(response.data.message);
      setMessageType('success'); // Set the message type to success
      setShowMessage(true); // Show message
      localStorage.setItem('token', response.data.token);
      setTimeout(() => (window.location.href = '/dashboard'), 2000);
      setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
      setMessageType('error'); // Set the message type to error
      setShowMessage(true); // Show message
      setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
    }
  };

  return (
    <div className="auth-container"> {/* Apply the 'auth-container' class here */}
      <div className="auth-form">
        {showMessage && (
          <div className={`message ${messageType} fade-in`}>
            <span className={`message-icon ${messageType === 'success' ? 'success-icon' : 'error-icon'}`}>
              {messageType === 'success' ? '✔️' : '❌'}
            </span>
            {message}
          </div>
        )}
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={formData.username}
            onChange={handleChange} 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange} 
          />
          <button type="submit">Login</button>
          <div className='signupcontent'>
            <p>Don't have an account yet?</p>
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
