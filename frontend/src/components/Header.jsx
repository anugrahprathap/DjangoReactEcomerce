// Checkout.js

import React, { useState, useEffect, useCallback } from "react";
import AddressForm from "./AddressForm";
import EditAddressForm from "./EditAddressForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Checkout.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";

function Checkout() {
  const config = require("./config.json");
  const serverAddress = config.serverAddress;
  const navigate = useNavigate();
  const { productId } = useParams();
  const { id } = useParams();
  const [address, setAddress] = useState(null);
  const [editingAddress, setEditingAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addressesAdded, setAddressesAdded] = useState(0);
  const [productDetails, setProductDetails] = useState(null); // State for product details

  const fetchAddressData = async () => {
    // Fetch the user's address when the component mounts
    try {
      const response = await axios.get(`${serverAddress}/api/address/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        const responseData = response.data;

        if (Array.isArray(responseData) && responseData.length > 0) {
          setAddress(responseData);
          setAddressesAdded(responseData.length);
        } else {
          setAddress(null);
        }
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const fetchProductDetails = useCallback(async () => {
    // Fetch product details based on the product ID
    try {
      const response = await axios.get(
        `${serverAddress}/api/productdetail/${productId}/`
      );

      if (response.status === 200) {
        setProductDetails(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }, [productId]);

  useEffect(() => {
    // Fetch the initial data when the component mounts
    fetchAddressData();
    fetchProductDetails(); // Fetch product details

    // Poll for updates every 10 seconds (adjust the interval as needed)
    const intervalId = setInterval(() => {
      fetchAddressData();
      fetchProductDetails(); // Fetch product details
    }, 10000); // 10 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [id, fetchProductDetails]); // Include productId in the dependency array

  const handleEditAddress = (id) => {
    // Enable editing of the address
    setSelectedAddressId(id);
    setEditingAddress(true);
  };

  const handleAddressSubmit = (newAddress) => {
    // Handle the submission of the address form and update the address state
    const updatedAddressList = address.map((add) =>
      add.id === newAddress.id ? newAddress : add
    );
    setAddress(updatedAddressList);
    setEditingAddress(false);
    setSelectedAddressId(null);

    if (addressesAdded === 3) {
      setShowAddAddress(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedAddressId(id);
  };

  const handleAddAddressClick = () => {
    // Toggle the visibility of the "Add Address" field
    setShowAddAddress(!showAddAddress);
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    // Check if an address is selected
    if (!selectedAddressId) {
      alert("Please select a shipping address.");
      return;
    }

    // Check if productDetails is available
    if (!productDetails) {
      alert("Product details are not available.");
      return;
    }

    try {
      // Create an order with the selected address, product, quantity, and user ID
      const response = await axios.post(
        `${serverAddress}/api/orders/post/`,
        {
          address: selectedAddressId,
          items: [productDetails.ProductId],
          total_price: productDetails.Price,
          quantity: [parseInt(document.getElementById("quantity").value)], // Include the quantity in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        const orderID = response.data.order_id;
        navigate(`/payment/${orderID}`);
      } else {
        console.error("Order creation failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h2>Checkout</h2>
      </div>
      <div className="product-details">
        {productDetails ? (
          <div className="product-card">
            {productDetails.Image && (
              <img
                src={productDetails.Image}
                alt={productDetails.ProductId}
                className="product-image"
              />
            )}
            <p>
              <strong>Name:</strong> {productDetails.ProductTitle}
            </p>
            <p>
              <strong>Price:</strong> {productDetails.Price}
            </p>
            <p>
              <strong>Color:</strong> {productDetails.Colour}
            </p>
            <label htmlFor="quantity">Quantity:</label>
            <select
              id="quantity"
              name="quantity"
              defaultValue="1" // You can set the default quantity here
              className="quantity-select"
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>
      <div className="address-section">
        <h3 className="address-heading">Shipping Address</h3>
        {address
          ? address.map((add) => (
              <div key={add.id} className="address-card">
                <p className="address-line">{add.address_line1}</p>
                {add.address_line2 && (
                  <p className="address-line">{add.address_line2}</p>
                )}
                <p className="address-details">
                  {add.city}, {add.state} - {add.postal_code}
                </p>
                <div className="address-actions">
                  <input
                    type="checkbox"
                    name="add"
                    id={add.id}
                    checked={add.id === selectedAddressId}
                    onChange={() => handleCheckboxChange(add.id)}
                    required
                  />
                  {!editingAddress ? (
                    <button
                      onClick={() => handleEditAddress(add.id)}
                      className="edit-address-button"
                    >
                      Edit Address
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          : null}
        {editingAddress ? (
          <EditAddressForm
            address={address.find((add) => add.id === selectedAddressId)}
            onSuccess={handleAddressSubmit}
          />
        ) : (
          showAddAddress &&
          addressesAdded < 3 && <AddressForm onSuccess={handleAddressSubmit} />
        )}
        {addressesAdded < 3 && (
          <button
            onClick={handleAddAddressClick}
            className="add-address-button"
          >
            {showAddAddress ? "Hide Add Address" : "Add Address"}
          </button>
        )}
      </div>
      <div className="checkout-button-section">
        <button className="checkout-button" onClick={handleOrder}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Checkout;
