import React, { useState, useEffect } from 'react';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch shopping cart items from your backend API
    fetch('/api/cart')
      .then((response) => response.json())
      .then((data) => setCartItems(data));
  }, []);

  const handleRemoveFromCart = (productId) => {
    // Implement remove from cart functionality
  };

  const handleUpdateCart = (productId, quantity) => {
    // Implement update cart functionality
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity}
            <button onClick={() => handleRemoveFromCart(item.product.id)}>
              Remove
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleUpdateCart(item.product.id, e.target.value)
              }
            />
          </li>
        ))}
      </ul>
      {/* Add checkout button and total price here */}
    </div>
  );
}

export default ShoppingCart;
