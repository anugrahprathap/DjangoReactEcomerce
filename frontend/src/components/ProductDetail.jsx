import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';

function ProductDetail({ match }) {
  const config = require('./config.json');
  const serverAddress = config.serverAddress;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
      setQuantity(newQuantity);
    };

    const handleAddToCart = (product_id) => {
      const requestData = {
        product_id: product_id,
        quantity: quantity
    };
      // Send a POST request to your Django API to add the product to the cart
      axios.post(`${serverAddress}/api/cart/add_to_cart/`, requestData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        alert("Success");
        alert(response.data.message); // Assuming 'message' is part of the response data
      } else {
        // Handle error
        console.error('Error:', response.data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  useEffect(() => {
    
    axios.get(`${serverAddress}/api/productdetail/${id}`)
      .then((response) => {
        console.log('*'*89)
        console.log(response.data)
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });

      
  }, [id]);

  return (
    <div className='main-content'>
     
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='image'>
          <h2>{product.ProductTitle} ({product.Colour})</h2>
          {product.Image && (
                    <img src={product.Image} alt={product.ProductId} className='image-main border' />
                )}
          <div className='product-btn2'>
          <Link to={`/checkout/${product.ProductId}`}>
            <div className='buy'>Buy Now</div>
            </Link>
        
          <div className='cart' onClick={() => handleAddToCart(product.ProductId)}>Add To Cart</div>
        </div> 
          
        </div>
      )}
      <div className='product-text'>
        <div className='product-content'>
          <h2>{product.ProductTitle}</h2>
          <p>Colour: {product.Colour}</p>
          <div style={{display:'inline-flex'}}><h3>₹{product.Price}</h3>&nbsp;&nbsp;<h3 style={{ textDecoration: 'line-through',fontWeight: 'normal'}}>₹{product.Price + 500}</h3></div>
          
        </div>
        <div>
        <label htmlFor="quantity">Quantity:&nbsp;</label>
        <select id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange}>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
        <h3>Specifications</h3>
        <p>Product Type: {product.ProductType}</p>
        <p>Category: {product.Category}</p>
        <p>Sub Category: {product.SubCategory}</p>
        <p>Usage: {product.Usage}</p>
        <p>Colour: {product.Colour}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
