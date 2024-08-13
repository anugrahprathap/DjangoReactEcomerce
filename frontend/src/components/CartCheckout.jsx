import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Checkout.css'; // Import your CSS file

function CartCheckout() {

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    // Fetch cart items and addresses from your API when the component loads
    axios.get(`/api/cart/get_queryset/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setCartItems(response.data);
        calculateTotalPrice(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });

    axios.get(`/api/address/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setAddresses(response.data);
      })
      .catch(error => {
        console.error('Error fetching addresses:', error);
      });
  }, []);

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach(item => {
      total += item.product.Price * item.quantity;
    });
    setTotalPrice(total);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  };

  const handleCheckout = async () => {
    try {
        console.log("button clicked")
        console.log(cartItems)
      for (const cartItem of cartItems) {
        const selectedAddressId = selectedAddress; // Replace with the actual address ID
        const productDetails = cartItem.product;
  
        // Create an order for the current product
        const response = await axios.post(`/api/orders/post/`, {
          address: selectedAddressId,
          items: [productDetails.ProductId],
          total_price: productDetails.Price * cartItem.quantity,
          quantity: [cartItem.quantity],
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        alert('Order placed successfully for product:', productDetails.ProductTitle);
        // You can perform additional actions after a successful order placement, such as redirecting the user.
      }
    } catch (error) {
      console.error('Error placing orders:', error);
      // Handle errors and provide feedback to the user.
    }
  };
  
  const handleQuantityChange = (itemId, newQuantity) => {
    // Implement logic to update the quantity for the specified item in the cart
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">Checkout</h2>
      <div className="cart-items">
        {Array.isArray(cartItems) && cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <p>{item.product.ProductTitle} - ${item.product.Price} - Quantity:
            <select
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            
            </p>
            <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Total Price: ${totalPrice}</p>
      </div>
      <div className="checkout-form">
       
          <div className="address-selection">
            <h3>Shipping Address</h3>
            {isEditingAddress ? (
              <div>
                <input
                  type="text"
                  placeholder="Edit Address"
                  value={selectedAddress}
                  onChange={e => setSelectedAddress(e.target.value)}
                />
                <button onClick={() => setIsEditingAddress(false)}>Cancel</button>
              </div>
            ) : (
              <div>
                <select value={selectedAddress} onChange={e => setSelectedAddress(e.target.value)}>
                  <option value="">Select an address</option>
                  {Array.isArray(addresses) && addresses.map(address => (
                    <option key={address.id} value={address.id}>
                      {address.address_line1}
                    </option>
                  ))}
                </select>
                <button onClick={() => setIsEditingAddress(true)}>Edit Address</button>
              </div>
            )}
          </div>
          <button className="checkout-button" onClick = {handleCheckout} type="submit">
            Place Order
          </button>
        
      </div>
    </div>
  );
}

export default CartCheckout;
