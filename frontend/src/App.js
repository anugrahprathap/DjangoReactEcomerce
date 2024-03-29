import React, { useState } from 'react';
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
import Topwear from './components/Topwear';
import Electronics from './components/Electronics';
import Footwear from './components/Footwear';
import CartCheckout from './components/CartCheckout';
import SearchResults from './components/SearchResults';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Footer from './components/Footer';
import HeroImage from './components/Hero';
import SearchResult from './components/SearchResults';

function App() {
 

  // Handle the search results data and visibility
  

  return (
    <Router>
      <div className="App">
        <Navbar  />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topwear" element={<Topwear />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/footwear" element={<Footwear />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/checkout/:productId" element={<Checkout />} />
            <Route path="/editaddress/:addId" element={<EditAddressForm />} />
            <Route path="/payment/:orderId" element={<PaymentPage />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/CartCheckout" element={<CartCheckout />} />
            <Route path="/search" element={<SearchResult/>}/>
          </Routes>
     
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <HeroImage/>
      <Topwear />
      <Electronics />
      <Footwear />
      <Footer/>
    </div>
  );
}

export default App;
