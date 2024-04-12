import React from 'react';
import ProductList from './ProductList';

function Topwear() {
  return (
    <div className='mx-2'>
      <h2>Topwear</h2>
      <ProductList category="Tshirts" />
    </div>
  );
}

export default Topwear;
