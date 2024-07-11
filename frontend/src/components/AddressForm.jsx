import React, { useState } from 'react';
import axios from 'axios';

function AddressForm({ onSuccess }) {

 
  const [addressData, setAddressData] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to your Django API to create the address
    axios.post(`/api/address/create_address/`, addressData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      if (response.status === 201) {
        // Address creation successful
        onSuccess(); // Call the onSuccess callback to continue with the checkout process
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
      <h3>Add Shipping Address</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address_line1">Address Line 1:</label>
          <input type="text" name="address_line1" value={addressData.address_line1} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="address_line2">Address Line 2:</label>
          <input type="text" name="address_line2" value={addressData.address_line2} onChange={handleChange} />
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
          <input type="text" name="postal_code" value={addressData.postal_code} onChange={handleChange} required />
        </div>
        <button type="submit">Submit Address</button>
      </form>
    </div>
  );
}

export default AddressForm;
