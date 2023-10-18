import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './shoppingCart.css'; // Import your CSS file
import { Link } from 'react-router-dom';

function ShoppingCart() {
  const config = require('./config.json');
  const serverAddress = config.serverAddress;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from your API
    axios.get(`${serverAddress}/api/cart/get_queryset/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        console.log(response.data)
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const handleRemoveItem = (itemId) => {
    // Implement logic to remove the item from the cart
  };

  return (
    <div className="shopping-cart-container">
      <h2 className="cart-header">Your Cart</h2>
      {cartItems.map(item => (
        <div className="cart-item" key={item.id}>
          <img
            src={item.product.Image}
            alt={item.product.ProductTitle}
            className="product-image"
          />
          <div className="product-info">
            <p className="product-title">{item.product.ProductTitle}</p>
            <p>Colour: {item.product.Colour}</p>
            <p>Product Type: {item.product.ProductType}</p>
            <p>Category: {item.product.Category}</p>
            <p>Sub Category: {item.product.SubCategory}</p>
            <p>Usage: {item.product.Usage}</p>
            {/* <p className="quantity">Quantity: {item.quantity}</p> */}
            <button
              className="remove-button"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <center>
      <Link to="/CartCheckout">
      <button className="custom-checkout-button" >
        Checkout
      </button>
      </Link>
      </center>
    </div>
  );
}

export default ShoppingCart;
