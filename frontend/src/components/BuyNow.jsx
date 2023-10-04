import React, { useState } from 'react';
import axios from 'axios';

function BuyNowButton({ product }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleBuyNow = (product_id) => {
    const requestData = {
      product_id: product_id,
      quantity: quantity,
    };

    // Send a POST request to your Django API to add the product to the cart
    axios.post(`http://127.0.0.1:8000/api/cart/add_to_cart/`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      if (response.status === 200) {
        // Handle successful purchase or redirection to the checkout page
        alert("Success: Product added to cart.");
      } else {
        // Handle error
        console.error('Error:', response.data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <label htmlFor="quantity">Quantity:&nbsp;</label>
      <select id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange}>
        {Array.from({ length: 10 }, (_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <button onClick={() => handleBuyNow(product.ProductId)}>Buy Now</button>
    </div>
  );
}

export default BuyNowButton;
