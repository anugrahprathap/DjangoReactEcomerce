// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';
import Navbar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm'
import Checkout from './components/Checkout';
import EditAddressForm from './components/EditAddressForm';
import PaymentPage from './components/PaymentPage';
import OrderHistory from './components/OrderHistory';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
       
        <Routes>
          <Route path="/" exact element={<ProductList/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/cart" element={<ShoppingCart/>} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/checkout/:productId" element={<Checkout/>} />
          <Route path="/editaddress/:addId" element={<EditAddressForm/>}/>
          <Route path="/payment/:orderId" element={<PaymentPage/>}/>
          <Route path="/orders" element={<OrderHistory/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
