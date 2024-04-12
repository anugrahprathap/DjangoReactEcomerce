import React from 'react';
import ProductList from './ProductList';

function Footwear() {
  return (
    <div className='mx-2'>
      <h2>Footwear</h2>
      <ProductList category="Sports Shoes" />
    </div>
  );
}

export default Footwear;
