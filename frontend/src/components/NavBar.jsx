import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import { useState } from 'react';
import axios from 'axios';

function Navbar() {
  const { loggedIn,logout  } = useAuth();
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchResult, setSearchResults] = useState('');
  const handleLogout = () => {
    // Call the logout function to log the user out
    logout();
  }; // Get the loggedIn status from the context
  
  const handleSearch = (e) => {
    console.log(searchQuery)
    e.preventDefault();
    axios.get(`http://127.0.0.1:8000/api/products/search/?query=${searchQuery}`)
    .then((response) => {
        
        setSearchResults(response.data);
        console.log(searchResult)
    })
    .catch((error) => {
        console.error('Error searching products:', error);
    });
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="navbar">
      <Link to="/" className='link-nav'>
        <div className="navbar-logo border">
          Home
        </div>
      </Link>

      <div className="search border">
      
        <input type="text"
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e);
          }
        }}
        onChange={(e) => setSearchQuery(e.target.value)} className="" />
        <div onClick={handleSearch} className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        
      </div>

      {loggedIn ? ( // Conditionally render based on loggedIn status
        // User is logged in, provide a link to the profile
        <Link to="/profile" className='link-nav'>
          <div className="nav-profile border">
            <p>
              <span className="nav-span">Profile</span>
            </p>
            <p>
            <span className='nav-return' onClick={handleLogout}>Logout</span>
            </p>
          </div>
        </Link>
      ) : (
        // User is not logged in, provide a link to the login page
        <Link to="/login" className='link-nav'>
          <div className="nav-signin border">
            <p>
              <span className="nav-span">Hello, sign in</span>
            </p>
          </div>
        </Link>
      )}
      <Link to="/orders" className='link-nav'>
      <div className="nav-return border">
        <span className="nav-return">Returns</span>
        <p className="nav-sec"> & Orders</p>
      </div>
      </Link>
      

      <Link to="/cart" className='link-nav'>
        <div className="nav-cart border">
          <FontAwesomeIcon icon={faShoppingCart} className='nav-cart-i' />
          <p>Cart</p>
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
