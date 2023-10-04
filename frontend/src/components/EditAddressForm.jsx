// EditAddressForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditAddressForm.css'; // Import your CSS file


function EditAddressForm({ address, onSuccess }) {
  const [addressData, setAddressData] = useState({
    address_line1: address.address_line1,
    address_line2: address.address_line2 || '',
    city: address.city,
    state: address.state,
    postal_code: address.postal_code,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a PUT request to update the address
    axios
      .put(`http://127.0.0.1:8000/api/address/${address.id}/edit_address/`, addressData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
            alert("Success")
            onSuccess(response.data); 
          // Address update successful
          onSuccess(response.data);
        } else {
          // Handle error
          console.error('Error:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div  className="edit-address-container">
      <h3>Edit Shipping Address</h3>
      <form className="edit-address-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address_line1">Address Line 1:</label>
          <input
            type="text"
            name="address_line1"
            value={addressData.address_line1}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address_line2">Address Line 2:</label>
          <input
            type="text"
            name="address_line2"
            value={addressData.address_line2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input type="text" name="city" value={addressData.city} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input type="text" name="state" value={addressData.state} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="postal_code">Postal Code:</label>
          <input
            type="text"
            name="postal_code"
            value={addressData.postal_code}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Address</button>
      </form>
    </div>
  );
}

export default EditAddressForm;
