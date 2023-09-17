import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'


function ProductDetail({ match }) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    // const productId = match.params.id; // Extract the product ID from the URL

    // Make a GET request to fetch the product by its ID
    axios.get(`http://127.0.0.1:8000//api/productdetail/${id}`)
      .then((response) => {
        console.log('*'*89)
        console.log(response.data.product_data)
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <h2>Product Detail</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>{product.product_data.name}</h3>
          <p>Description: {product.product_data.description}</p>
          <p>Price: ${product.product_data.price}</p>
          <img src={product.image_data_url} alt={product.name} />
          
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
