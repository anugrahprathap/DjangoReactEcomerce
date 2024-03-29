import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styled from '@mui/styled-engine-sc'; // Import styled from styled-engine-sc
import './style.css';
    

const StyledContainer = styled('div')({
  /* Add your container styles here */
  display: 'flex',
  overflowX: 'scroll',
  flexFlow: 'column',
  overflowY: 'hidden', // Enable horizontal scrolling
  width: '100%',
  height: '350px',
  // whiteSpace: 'nowrap',
  padding: '10px', // Add some padding for spacing
  // margin:"20px",
  backgroundColor: "#e2e7e6",
  flexWrap:'wrap',
  
});

const StyledPaper = styled(Paper)({
  /* Add your Paper styles here */
  color: '#0F1111',
  display: 'flex',
  flexWrap:"wrap",
  margin: '15px',
  backgroundColor: 'white',
  height: '280px',
  width: '311px',
  padding: '20px 0px 15px',
  borderRadius: '8px',
});

const StyledBoxContent = styled('div')({
  /* Add your box content styles here */
  color: '#0F1111',
  marginLeft: '1rem',
  marginRight: '1rem',
  display: 'flex',
  flexDirection: 'column', // Changed to column
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  alignItems: 'center',
});

const StyledBoxImg = styled('img')({
  /* Add your box image styles here */

  height: '150px',
  width: '80%',
  marginTop: '5px',
  marginBottom: '1rem',
  backgroundSize: 'cover',
});

function ProductList({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Define the API endpoint URL for fetching products
    const apiUrl = `http://127.0.0.1:8000/api/products/?category=${category}`;

    // Use Axios to fetch products from the Django backend
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [category]);

  return (
    <StyledContainer>
      {products.map((product) => (
        <StyledPaper key={product.ProductId}>
          <Link to={`/product/${product.ProductId}`} className="link">
            <StyledBoxContent>
              <Typography variant="h6">{product.ProductTitle}</Typography>

              {product.Image && (
                <StyledBoxImg
                  src={product.Image}
                  alt={product.ProductId}
                />
              )}
              <Typography variant="subtitle1">Price: ${product.Price}</Typography>
              <Typography variant="subtitle1">Color: {product.Colour}</Typography>
            </StyledBoxContent>
          </Link>
        </StyledPaper>
      ))}
    </StyledContainer>
  );
}

export default ProductList;
