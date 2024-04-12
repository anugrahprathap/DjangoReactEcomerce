import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';
import Navbar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Checkout from './components/checkout/Checkout';
import EditAddressForm from './components/EditAddressForm';
import PaymentPage from './components/PaymentPage';
import OrderHistory from './components/orders/OrderHistory';
import Topwear from './components/Topwear';
import Electronics from './components/Electronics';
import Footwear from './components/Footwear';
import CartCheckout from './components/CartCheckout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Footer from './components/Footer';
import HeroImage from './components/Hero';
import SearchResult from './components/search/SearchResults';
import ToolBar from './components/ToolBar';
import CheckoutNav from './components/checkout/Nav';
import './components/style.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topwear" element={<WithNavbar><Topwear /></WithNavbar>} />
          <Route path="/electronics" element={<WithNavbar><Electronics /></WithNavbar>} />
          <Route path="/footwear" element={<WithNavbar><Footwear /></WithNavbar>} />
          <Route path="/product/:id" element={<WithNavbar><ProductDetail /></WithNavbar>} />
          <Route path="/cart" element={<WithNavbar><ShoppingCart /></WithNavbar>} />
          <Route path="/register" element={<WithNavbar><RegistrationForm /></WithNavbar>} />
          <Route path="/login" element={<WithNavbar><LoginForm /></WithNavbar>} />
          <Route path="/checkout/:productId" element={<WithCheckout><Checkout /></WithCheckout>} />
          <Route path="/editaddress/:addId" element={<WithNavbar><EditAddressForm /></WithNavbar>} />
          <Route path="/payment/:orderId" element={<WithNavbar><PaymentPage /></WithNavbar>} />
          <Route path="/orders" element={<WithNavbar><OrderHistory /></WithNavbar>} />
          <Route path="/CartCheckout" element={<WithNavbar><CartCheckout /></WithNavbar>} />
          <Route path="/search" element={<WithNavbar><SearchResult/></WithNavbar>}/>
        </Routes>
      </div>
    </Router>
  );
}

function WithNavbar({ children }) {
  return (
    <>
      <Navbar />
      <ToolBar/>
      {children}
    </>
  );
}
function WithCheckout({children}){
  return(
    <>
    <CheckoutNav/>
    {children}
    </>
  );
}

function Home() {
  return (
    <div className='main-page'>
      <WithNavbar/>
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
