// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Your logic to set the loggedIn state, typically from local storage, should be here.
    const token = localStorage.getItem('token');  
    setLoggedIn(!!token); // Assuming you set 'loggedIn' based on the presence of a token
  }, []);

  // Function to log the user out
  const logout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('token');

    // Update the loggedIn state to false
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
