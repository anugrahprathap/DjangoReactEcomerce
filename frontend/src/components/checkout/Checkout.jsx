import React, { useState, useEffect, useCallback } from "react";
import EditAddressForm from "../EditAddressForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Checkout.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";

function Checkout() {
  const config = require("../config.json");
  const serverAddress = config.serverAddress;
  const navigate = useNavigate();
  const { productId } = useParams();
  const { id } = useParams();
  const [address, setAddress] = useState(null);
  const [editingAddress, setEditingAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressTemp, setSelectedAddressTemp] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addressesAdded, setAddressesAdded] = useState(0);
  const [productDetails, setProductDetails] = useState(null); // State for product details
  const [showAddressSelection, setShowAddressSelection] = useState(false);

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
          setSelectedAddress(responseData[0]);
          setSelectedAddressTemp(responseData[0]);
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
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }, [productId]);

  const handleAddressChange = () => {
    setShowAddressSelection(!showAddressSelection);
  };

  useEffect(() => {
    // Fetch the initial data when the component mounts
    fetchAddressData();
    fetchProductDetails(); // Fetch product details
  }, []); // Include productId in the dependency array

  const handleEditAddress = (add) => {
    // Enable editing of the address
    setSelectedAddress(add);
    setEditingAddress(!editingAddress);
  };

  const handleAddressSubmit = (newAddress) => {
    // Handle the submission of the address form and update the address state
    fetchAddressData();
    const updatedAddressList = address.map((add) =>
      add.id === newAddress.id ? newAddress : add
    );
    setAddress(updatedAddressList);
    setEditingAddress(false);

    if (addressesAdded === 3) {
      setShowAddAddress(false);
    }
  };

  const handleAddAddressClick = () => {
    // Toggle the visibility of the "Add Address" field
    setShowAddAddress(!showAddAddress);
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    // Check if an address is selected
    if (!selectedAddress) {
      alert("Please add shipping address.");
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
          address: selectedAddress.id,
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
      {productDetails ? (
        <div className="checkout-main">
          <div className="checkout-header-add">
            <div className="checkout-header-add">
              {showAddressSelection ? (
                <div className="">
                  <div className="address-list-heading">
                    <strong className="heading">
                      1 &nbsp; Select a delivery address
                    </strong>
                    <a href="#" onClick={handleAddressChange}>
                      Close X
                    </a>
                  </div>
                  <div>
                    <div className="address-list">
                      <span className="span">
                        <strong>Your addresses</strong>
                      </span>
                      <hr />
                      {address
                        ? address.map((add) => (
                            <div
                              key={add.id}
                              className={`address-card-select ${
                                add === selectedAddressTemp
                                  ? "selected-address"
                                  : ""
                              }`}
                             
                            >
                              {" "}
                              <input
                                type="radio"
                                name="address"
                                value={add.id}
                                onChange={() => {
                                  setSelectedAddressTemp(add);
                                  // Update the selected address
                                }}
                                checked={add === selectedAddressTemp}
                              />
                              <span
                               onClick={() => {
                                setSelectedAddressTemp(add);
                                // Update the selected address
                              }}
                              > {add.address_line1},</span>
                              <span
                               onClick={() => {
                                setSelectedAddressTemp(add);
                                // Update the selected address
                              }}>
                                {add.add_line2 && <>{add.address_line2},</>}
                                {add.city}, {add.state},{add.postal_code}
                              </span>
                              
                              <span>

                                
                               
                                  <EditAddressForm
                                    address={add}
                                    onSuccess={handleAddressSubmit}
                                  />
                             <span>| </span>

                                <a href="#" className="text-decoration-none">Add delivery instructions</a>
                              </span>
                            </div>
                          ))
                        : null}
                    </div>
                    <div className="change-address-div">
                      <button
                        className="change-address-button"
                        onClick={() => {
                          handleAddressChange();
                          setSelectedAddress(selectedAddressTemp);
                        }}
                      >
                        Use this address
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="shiping-header">
                  <h3>
                    <b>1</b>
                  </h3>

                  <h3 style={{ marginLeft: "1rem" }}>
                    <b>Delivery address</b>
                  </h3>
                </div>
              )}
            </div>
            <div className="address-header">
              {!showAddressSelection ? (
                <>
                  {selectedAddress ? (
                    <div key={selectedAddress.id} className="address-card">
                      <p className="address-line">
                        {selectedAddress.address_line1}
                      </p>
                      {selectedAddress.address_line2 && (
                        <p className="address-line">
                          {selectedAddress.address_line2}
                        </p>
                      )}
                      <p className="address-details">
                        {selectedAddress.city}, {selectedAddress.state} -{" "}
                        {selectedAddress.postal_code}
                      </p>
                    </div>
                  ) : null}
                </>
              ) : (
                <></>
              )}
            </div>

            <div>
              <>
                {!showAddressSelection ? (
                  <div>
                    <a href="#" onClick={handleAddressChange}>
                      change
                    </a>
                  </div>
                ) : (
                  <></>
                )}
              </>
            </div>
          </div>
          <hr />
          <div className="checkout-header-pay">
            <div className="shiping-header ">
              <h1>
                <b>2</b>
              </h1>
              <h3>
                <b>Select Payment Method</b>
              </h3>
            </div>
            <div className="payment-methods">
              <div>
                <input type="radio" name="radio" id="" />
                <label htmlFor="">razorpay</label>
              </div>
              <div>
                <input type="radio" name="radio" id="" />
                <label htmlFor="">Cash On Delivery</label>
              </div>
            </div>
            <div>
              <a href="#">change</a>
            </div>
          </div>
          <hr />
          <div className="checkout-header-item">
            <div className="shiping-header ">
              <h1>
                <b>3</b>
              </h1>
              <div>
                <h3>
                  <b> Review items and delivery</b>
                </h3>

                <div className="product-details">
                  <h4>Arriving 16 Apr 2024</h4>
                  <div className="product-card">
                    <div></div>
                    {productDetails.Image && (
                      <div>
                        <img
                          src={productDetails.Image}
                          alt={productDetails.ProductId}
                          className="product-image"
                        />
                      </div>
                    )}
                    <div>
                      <p>
                        <strong>
                          {productDetails.ProductTitle}({productDetails.Colour})
                        </strong>
                      </p>
                      <p style={{ color: "#b12704" }}>
                        <strong>₹{productDetails.Price}</strong>
                      </p>
                      <p></p>
                      <span>
                        <label htmlFor="quantity">Qty:</label>
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
                      </span>
                    </div>
                  </div>
                </div>

                <div className="checkout-header-pay">
                  <div></div>
                  <div className="checkout-button-section">
                    <button className="checkout-button" onClick={handleOrder}>
                      Palce your order
                    </button>
                    <div>
                      <span className="span">
                        <strong> Order Total: ₹{productDetails.Price}</strong>
                      </span>
                      <br />

                      <span className="span1">
                        By placing your order, you agree to Amazon's privacy
                        notice and conditions of use.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Checkout;
