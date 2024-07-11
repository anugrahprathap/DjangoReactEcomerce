import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './RegistrationForm.css'
import { Link } from 'react-router-dom';
import logo from '../images/amazon-logo.png'
function RegistrationForm() {
  // const config = require('./config.json');
  // const serverAddress = config.serverAddress;
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
      const response = await axios.post(`/api/register/`, formData);

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
      <Link to="/" >
      <img src={logo} alt="" className='mt-4 mb-4' />
      </Link>
      <div className="registration-content">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
            className='form-control'
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" >Email:</label>
            <input
            className='form-control'
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
            className='form-control'
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
              className='form-control'
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group"'>
          {!passwordMatch && <p className="password-mismatch">Passwords do not match.</p>}
          <button type="submit" className='form-control'>Register</button>
          </div>
          
        </form>
        <p className="login-link"> Already have an account? <Link to="/login" >Login</Link></p>
      </div>
    </div>
  );
}

export default RegistrationForm;
