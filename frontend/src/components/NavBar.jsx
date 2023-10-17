import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import axios from 'axios';

import './Navbar.css'; // Import your custom CSS

function Navbar() {
  const config = require('./config.json');
  const serverAddress = config.serverAddress;
  const { loggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResults] = useState('');
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null); // State for the profile menu anchor element

  const handleOpenProfileMenu = (event) => {
    setProfileMenuAnchor(event.currentTarget); // Open the profile menu
  };

  const handleCloseProfileMenu = () => {
    setProfileMenuAnchor(null); // Close the profile menu
  };

  const handleLogout = () => {
    logout(); // Logout when the "Logout" option is clicked
    handleCloseProfileMenu(); // Close the profile menu after logout
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`${serverAddress}/api/products/search/?query=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error searching products:', error);
      });
    console.log('Searching for:', searchQuery);
  };

  return (
    <AppBar className="AppBar" position="sticky">
      <Toolbar className='toolbar'>
        <Link to="/" className="link-nav">
          <Typography variant="h6" className="navbar-logo border">
            Home
          </Typography>
        </Link>

        <div className="search border">
          <InputBase
            type="text"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e);
              }
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            fullWidth={true}
          />
          <IconButton onClick={handleSearch} className="search-icon">
            <SearchIcon />
          </IconButton>
        </div>

        {loggedIn ? (
          <div>
            <Button
              onClick={handleOpenProfileMenu}
              className="nav-profile border"
            >
              Profile
            </Button>
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleCloseProfileMenu}
            >
              <MenuItem onClick={handleLogout}>
                Logout
                <ExitToAppIcon style={{ marginLeft: '8px' }} />
              </MenuItem>
              {/* Add other profile management options as MenuItem components */}
            </Menu>
          </div>
        ) : (
          <Link to="/login" className="link-nav">
            <Typography variant="h6" className="nav-signin border">
              Hello, sign in
            </Typography>
          </Link>
        )}
        <Link to="/orders" className="link-nav">
          <Typography variant="h6" className="nav-return border">
            Returns & Orders
          </Typography>
        </Link>
        <Link to="/cart" className="link-nav">
          <Button startIcon={<ShoppingCartIcon />} className="nav-cart border">
            Cart
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
