import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import the useAuth hook
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import your custom CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar(props) {
  const navigate = useNavigate();
  const { loggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
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
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }

  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link to="/" className="navbar-brand navbar-logo mr-3 ml-3">
    <FontAwesomeIcon icon={faHouse} style={{color:'white'}}/>
  </Link>

  <div className=" nav-item search-item-input" id="navbarSupportedContent">
    <form className="form-inline search-items">
      <input
        className="form-control"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ borderBottomRightRadius: '0', borderTopRightRadius: '0', }}
      />
      <button
        className="btn-sm" type="submit"
        onClick={handleSearch}
        style={{ borderBottomLeftRadius: '0', borderTopLeftRadius: '0', minWidth: '45px',height:'100%' }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  </div>

  <div className="navbar-items .d-sm-inline-flex mr-auto ml-auto">
    {loggedIn ? (
      <div className="dropdown ">
        <button className="dropdown-toggle btn nav-profile" onClick={handleOpenProfileMenu}
        style={{color:'white',backgroundColor:"#0000"}}
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    ) : (
      <div className="nav-item ml-2">
        <Link to="/login" className="text-white"
        style={{color:'white'}}
        >
          Hello, sign in
        </Link>
      </div>
    )}

    <div className="nav-item justify-content-center collapse navbar-collapse">
      <Link to="/orders" className="text-white" style={{color:'white'}}>
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
