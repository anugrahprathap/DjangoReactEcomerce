import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css'

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Define the API endpoint URL for fetching products
    const apiUrl = 'http://127.0.0.1:8000/api/products/';

    // Use Axios to fetch products from the Django backend
    axios.get(apiUrl)
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className='content'>
      
      
      
      {products.map((product) => (
    <div key={product.ProductId} className='box'>
        <Link to={`/product/${product.ProductId}`} className='link'>
            <div className='box-content'>
                <h3>{product.ProductTitle}</h3>
            
                {product.Image && (
                    <img src={product.Image} alt={product.ProductId} className='box-img'/>
                )}
            </div>
            <div className='product-btn'>
                <div className='product-buy'>
                    Buy Now
                </div>
                <div className='product-cart'>
                    Add To Cart
                </div>
            </div>
        </Link>
    </div>
))}

     
    </div>
  );
}

export default ProductList;
