import React, { useState } from 'react';
import axios from 'axios';
import '../css/Signup.css';


const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      setMessage(response.data.message);
      setTimeout(() => (window.location.href = '/login'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Signup failed');

    } finally {
      setIsLoading(false);

    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
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
      </div>
    </div>
  );
};

export default Signup;
