import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import the useAuth hook
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import your custom CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar(props) {
  const navigate = useNavigate();
  const { loggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // State for the profile menu visibility

  const handleToggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen); // Toggle the profile menu visibility
  };

  const handleLogout = () => {
    logout(); // Logout when the "Logout" option is clicked
    setProfileMenuOpen(false); // Close the profile menu after logout
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand navbar-logo mr-3 ml-3">
        <FontAwesomeIcon icon={faHouse} style={{ color: 'white' }} />
      </Link>

      <div className="nav-item search-item-input" id="navbarSupportedContent">
        <form className="form-inline search-items">
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ borderBottomRightRadius: '0', borderTopRightRadius: '0' }}
          />
          <button
            className="btn-sm"
            type="submit"
            onClick={handleSearch}
            style={{ borderBottomLeftRadius: '0', borderTopLeftRadius: '0', minWidth: '45px', height: '100%' }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>

      <div className="navbar-items d-sm-inline-flex mr-auto ml-auto">
        {loggedIn ? (
          <div className="">
            
            <Dropdown data-bs-theme="dark"
            style={{display:'flex',alignItems:'center'}}
            >
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ color: 'white', backgroundColor: "#0000" }}>
                <FontAwesomeIcon icon={faUser} />
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ backgroundColor: '#343a40', border: 'none', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <Dropdown.Item style={{ color: 'white' }} onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
                {/* {/* <Dropdown.Item style={{ color: 'white' }} href="#/action-2">Another action</Dropdown.Item> */}
                <Dropdown.Item style={{ color: 'white' }} href="/cart">Cart</Dropdown.Item> 
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div className="nav-item ml-2">
            <Link to="/login" className="text-white" style={{ color: 'white' }}>
              Hello, sign in
            </Link>
          </div>
        )}

        {/* Potential Fix for Missing Collapse Functionality (Assuming JavaScript is Included): */}
        <div className="nav-item justify-content-center collapse navbar-collapse">  {/* Added 'show' class for initial visibility */}
          <Link to="/orders" className="text-white" style={{ color: 'white' }}>
            Returns & Orders
          </Link>
        </div>

        <div className="nav-item collapse navbar-collapse">
          <Link to="/cart" className="text-white">
            <FontAwesomeIcon icon={faCartShopping} style={{color:'white'}} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
