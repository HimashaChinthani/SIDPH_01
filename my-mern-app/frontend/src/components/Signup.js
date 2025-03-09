import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import '../css/Message.css';
import '../css/Signup.css';

import CrickeImage from '../images/cricketsignup.png'; // Import the image

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // To manage the type of message (error/success)
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data", formData);
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType('error');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    setIsLoading(true);

    try {
      // Check if the username is already registered
      // const checkUser = await axios.get(`http://localhost:5000/api/check-username/${formData.username}`);

      // if (checkUser.data.exists) {
      //   setMessage("Username already taken. Please try another one.");
      //   setIsLoading(false);
      //   return;
      // }

      // If the username is available, proceed with signup
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData,{
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Response Data", response.data);
      setMessage(response.data.message);
      setShowMessage(true); // Show message
      localStorage.setItem('token', response.data.token);
      setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds

      setTimeout(() => {
        window.location.href = '/login'; // Redirect to login page after successful signup
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Signup failed');
      setMessageType('error'); // Set the message type to error
      setShowMessage(true); // Show message
      setTimeout(() => setShowMessage(false), 3000); // Hid
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="both">
    <div className="signup-container">
      {showMessage && (
          <div className={`message ${messageType} fade-in`}>
            <span className={`message-icon ${messageType === 'success' ? 'success-icon' : 'error-icon'}`}>
              {messageType === 'success' ? '✔️' : '❌'}
            </span>
            {message}
          </div>
        )}
      <div className="signup-box">
        <h1>Signup</h1>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Signup'}
          </button>
        </form>

        <div className="already-registered">

          <h3>Already have an account? <Link to="/login">Login here</Link></h3>
        </div>
      

      {/* Image Section */}
      <div className="image-container">
        <img src={CrickeImage} alt="Signup" className="signup-image" />

          
        </div>
      </div>

     
    </div>
    </div>
    
  );
};

export default Signup;
