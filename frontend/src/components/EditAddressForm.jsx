import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap

function EditAddressForm({ address, onSuccess }) {
  const config = require('./config.json');
  const serverAddress = config.serverAddress;
  const [addressData, setAddressData] = useState({
    address_line1: address.address_line1,
    address_line2: address.address_line2 || '',
    city: address.city,
    state: address.state,
    postal_code: address.postal_code,
  });

  const [showModal, setShowModal] = useState(false); // State variable to control modal visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a PUT request to update the address
    axios
      .put(`${serverAddress}/api/address/${address.id}/edit_address/`, addressData, {
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
    <>
      <a href='#' className="text-decoration-none m-2" onClick={() => setShowModal(true)} >Edit Shipping Address</a>

      <Modal show={showModal} onHide={() => setShowModal(false)} 
       style={{ display: 'block', opacity: 1}}
      className='edit-address'
      >
        <Modal.Header className='model-header1' closeButton>
          <Modal.Title>Update your address</Modal.Title>
        </Modal.Header >
        <Modal.Body className={`modal ${showModal ? 'show' : ''} model-body1`}>
          <strong><h3>Edit your Address</h3></strong>
          <form className=" mb-3" onSubmit={handleSubmit}>
            <div className='form-row'>
            <div>
             <label htmlFor="address_line1" className='form-label mx-0'>Address Line 1:</label>
             <input
              placeholder='Address Line 1'
                type="text"
                name="address_line1"
                value={addressData.address_line1}
                onChange={handleChange}
                required
                className='form-control text-md'
              />
             </div>
              
            
            <div >
            <label htmlFor="address_line2" className='form-label mx-0'>Address Line 2:</label>
              <input
                type="text"
                name="address_line2"
                placeholder='Address Line 2:'
                value={addressData.address_line2}
                onChange={handleChange}
                className='form-control'
              />
            </div>
            <div className='row'>
              <div className='col'>
              <label htmlFor="city" className='form-label mx-0'>City:</label>
              <input type="text" name="city"
              className='form-control '
              value={addressData.city} onChange={handleChange} required />
              </div>
            <div className='col'>
            <label htmlFor="state" className='form-label mx-1'>State:</label>
              <input type="text" name="state" value={addressData.state} 
              className='form-control mx-2'
              onChange={handleChange} required />
            </div>
              
            </div>
            <div>
              <label htmlFor="postal_code" className='form-label mx-0'>Postal Code:</label>
              <input
                type="text"
                name="postal_code"
                value={addressData.postal_code}
                onChange={handleChange}
                className='form-control'
                required
              />
            </div>
            <div>
            
            </div>
            <div>
            <button  className='button-custom mt-3' type="submit">Update Address</button>
            </div>
            
            </div>
            
            
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditAddressForm;
