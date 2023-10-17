import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './RegistrationForm.css'
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const config = require('./config.json');
  const serverAddress = config.serverAddress;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Add a confirmPassword field
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const response = await axios.post(`${serverAddress}/api/register/`, formData);

      if (response.status === 201) {
        alert('Registration Successful');
        navigate("/");
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-content">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {!passwordMatch && <p className="password-mismatch">Passwords do not match.</p>}
          <button type="submit">Register</button>
        </form>
        <p className="login-link"> Already have an account? <Link to="/login" >Login</Link></p>
      </div>
    </div>
  );
}

export default RegistrationForm;
