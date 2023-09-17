// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<ProductList/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/cart" element={<ShoppingCart/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
