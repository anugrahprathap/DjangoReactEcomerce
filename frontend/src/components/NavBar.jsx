import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import the useAuth hook
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import your custom CSS
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCartShopping,
  
  faUser,
  faRightToBracket,   
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

function Navbar(props) {
  

  const navigate = useNavigate();

  const { loggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // State for the profile menu visibility
  const [results ,setResults]= useState([]);
  
  const handleToggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen); // Toggle the profile menu visibility
  };

  const handleLogout = () => {
    logout(); // Logout when the "Logout" option is clicked
    setProfileMenuOpen(false); // Close the profile menu after logout
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery !== "") {
        axios
          .get(`/api/products/search/?query=${searchQuery}`)
          .then((response) => {
            const data = response.data;
            console.log(data);
            setResults(data);
          })
          .catch((error) => {
            console.error("Error searching products:", error);
          });
      } else {
        // Clear results if search query is empty
        setResults([]);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value.trim()); // Update searchQuery state with the trimmed input value
  };
  const handleSearch = (e, query) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
    setSearchQuery('');
    setResults([]);
  };
  const handleBlur = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest('.search-reconendation')) {
      setSearchQuery(''); // Clear search recommendations when input field loses focus
      setResults([]);
    }// Clear search recommendations when input field loses focus
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark font-size-small">
      <Link to="/" className="nav-logo border-blink mr-3 ml-3">

        <div className=" logo img-fluid"></div>
      </Link>

      <div className="nav-item search-item-input" id="navbarSupportedContent">
        <form className="form-inline search-items">
          <input
            className="form-control dropdown-toggle"
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
            style={{ borderBottomRightRadius: "0", borderTopRightRadius: "0" }}
            onBlur={handleBlur} 
          />
          
          <button
            className="btn-sm"
            type="submit"
            onClick={(e) => handleSearch(e, searchQuery)}
            style={{
              borderBottomLeftRadius: "0",
              borderTopLeftRadius: "0",
              minWidth: "45px",
              height: "100%",
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        {searchQuery  &&
          <div className="search-reconendation">
            <a href="#" onClick={(e) => handleSearch(e, searchQuery)}>
              {searchQuery}
            </a>
            {Array.isArray(results) && results.slice(0, 10).map((result, index) => (
              <a href="#" key={index} onClick={(e) => handleSearch(e, result.ProductTitle)}>
                {result.ProductTitle}
              </a>
            ))}
          </div>
        }
        
      </div>

      <div className="navbar-items d-sm-inline-flex mr-auto ml-auto">
        {loggedIn ? (
          <div className="border-blink">
            <Dropdown
              data-bs-theme="dark"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                style={{ color: "white", backgroundColor: "#0000" }}
              >
                <FontAwesomeIcon icon={faUser} />
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  backgroundColor: "#343a40",
                  border: "none",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Dropdown.Item
                  style={{ color: "white" }}
                  onClick={handleLogout}
                >
                  Logout
                </Dropdown.Item>
                {/* {/* <Dropdown.Item style={{ color: 'white' }} href="#/action-2">Another action</Dropdown.Item> */}
                <Dropdown.Item style={{ color: "white" }} href="/cart">
                  Cart
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div className="nav-item ml-2">
            <Link to="/login" className="text-white" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faRightToBracket} />
            </Link>
          </div>
        )}

        <div className="nav-item justify-content-center collapse navbar-collapse border-blink">
          {" "}
          {/* Added 'show' class for initial visibility */}
          <Link to="/orders" className="text-white" style={{ color: "white" }}>
            Returns & Orders
          </Link>
        </div>

        <div className="collapse navbar-collapse  border-blink">
          <Link to="/cart" className="d-flex">
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ color: "white", fontSize: "2.5rem", paddingTop: "1px" }}
            />
            <sub style={{ color: "white", fontSize: "1rem" }}> Cart</sub>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
