import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import './PaymentPage.css'; // Import your CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handlePaymentSubmit = () => {
    if( selectedPayment ===''){
        alert("Select a Payment Method")
    }
    else{
        setIsDialogOpen(true);
    }
      

  };

  const handleConfirmationDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmation = async () => {
    try {
      // Send the order ID to the backend with a PUT request to update the status
      const response = await axios.put(
        `http://127.0.0.1:8000/api/orders/${orderId}/update_order/`, // Replace with your endpoint URL
        { status: 'success' }, // Update the status to 'success'
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // Handle the success response here
        alert('Order status updated successfully');
        navigate('/');
      } else {
        // Handle errors
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Close the dialog
    setIsDialogOpen(false);

    // Clear the selection
    setSelectedPayment('');
  };

  return (
    <center>
    <div className="container">
        <h3>Select a Payment Method</h3>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="payment-method"
          name="payment-method"
          value={selectedPayment}
          onChange={handlePaymentChange}
          
          required
        >
          <FormControlLabel
            value="UPI"
            control={<Radio />}
            label={
              <div className="radio-label">
                <span className="icon">📱</span>UPI
              </div>
            }
            disabled
          />
          <FormControlLabel
            value="CreditCard"
            control={<Radio />}
            label={
              <div className="radio-label">
                <span className="icon">💳</span>Credit Card
              </div>
            }
            disabled
          />
          <FormControlLabel
            value="DebitCard"
            control={<Radio />}
            label={
              <div className="radio-label">
                <span className="icon">💳</span>Debit Card
              </div>
            }
            disabled
          />
          <FormControlLabel
            value="CashOnDelivery"
            control={<Radio />}
            label={
              <div className="radio-label">
                <span className="icon">💵</span>Cash on Delivery
              </div>
            }
          />
        </RadioGroup>
        <div className="button-container">
        <Button
          variant="contained"
          color="primary"
          onClick={handlePaymentSubmit}
        >
          Submit Payment
        </Button>
      </div>
      </FormControl>
      
      <Dialog
        open={isDialogOpen}
        onClose={handleConfirmationDialogClose}
        maxWidth="xs"
      >
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to proceed with Cash on Delivery?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmation} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </center>
  );
}

export default PaymentPage;
