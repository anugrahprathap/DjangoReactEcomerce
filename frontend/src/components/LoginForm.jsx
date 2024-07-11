import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import logo from "../images/amazon-logo.png";

function LoginForm() {

  const { loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store the token in local storage
        setLoggedIn(true);
        alert("Success");
        navigate("/");
      } else {
        // Handle login error
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (loggedIn) {
    navigate("/");
  } else {
    return (
      <div className=" col-md-12 login-container  ">
        <div className="login-logo">
          <img src={logo} alt="" />
        </div>
        <div className="login-content">
          
            <span className="mx-5">Sign In</span>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Email or phone number:</label>
                <input
                  className="form-control"
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
              <button type="submit" className="form-control">Login</button>

              </div>
            </form>
            
          </div> 
          <Link to="/register">
          <div className=" form-control mt-4 button-border">
          <p className="register-link">
              Create your Amazon account
            </p>
          </div>
          </Link>
        </div>
      
    );
  }
}

export default LoginForm;
