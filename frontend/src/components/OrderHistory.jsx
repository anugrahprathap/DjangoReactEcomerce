import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './orderHistory.css'; // Import your CSS file

function OrderHistory() {
  const config = require('./config.json');
  const serverAddress = config.serverAddress;
  const [orders, setOrders] = useState([]);
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  };
  useEffect(() => {
    // Fetch order history from your API
    axios
      .get(`${serverAddress}/api/orders/myOrders/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Format the order date before setting it in the state
        const formattedOrders = response.data.map((order) => ({
          ...order,
          OrderDate: new Date(order.OrderDate).toLocaleString(), // Format the date
        }));
        setOrders(formattedOrders);
      })
      .catch((error) => {
        console.error('Error fetching order history:', error);
      });
  }, []);

  return (
    <div className="order-history-container">
      <h2>Your Order History</h2>
      {orders.map((order) => (
        <div key={order.OrderId} className="order-card">
          <div className="order-details" style={style}>
            <div className="product-image">
              <img src={order.ProductDetails[0].Image} alt="Product" />
            </div>
            <div>
            <h3>{order.ProductDetails[0].ProductTitle}</h3>
            </div>
            <div>
            <p>Color: {order.ProductDetails[0].Color}</p>
            </div>
              <div>
              <p>₹ {order.TotalPrice}</p>
              </div>
              <div>
              <p> {order.Status === 'success' ? 'Ordered' : order.Status} on {order.OrderDate}</p>
              </div>
              
            
            <div className="product-info">
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
