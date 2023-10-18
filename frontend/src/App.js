import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';
import Navbar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Checkout from './components/Checkout';
import EditAddressForm from './components/EditAddressForm';
import PaymentPage from './components/PaymentPage';
import OrderHistory from './components/OrderHistory';
import Topwear from './components/Topwear'; // Import Topwear component
import Electronics from './components/Electronics'; // Import Electronics component
import Footwear from './components/Footwear'; // Import Footwear component
import CartCheckout from './components/CartCheckout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/topwear" element={<Topwear />} /> {/* Topwear category */}
          <Route path="/electronics" element={<Electronics />} /> {/* Electronics category */}
          <Route path="/footwear" element={<Footwear />} /> {/* Footwear category */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/checkout/:productId" element={<Checkout />} />
          <Route path="/editaddress/:addId" element={<EditAddressForm />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/CartCheckout" element={<CartCheckout />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <Topwear />
      <Electronics />
      <Footwear />
      {/* Add more category components as needed */}
    </div>
  );
}

export default App;
