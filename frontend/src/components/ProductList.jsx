import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function ProductList({ category }) {
  // const config = require('./config.json');
  // const serverAddress = config.serverAddress;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    const apiUrl = `/api/products/?category=${category}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false); // Set loading to false on error
      });
  }, [category]);

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
  
    return (
<div
     
      onClick={onClick}
      style={{
        ...style,
        position: 'absolute',
        top: '40%', 
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        left: '0',
        zIndex: '10',
        width: '2.813rem',
        height: '6.25rem',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        textAlign: 'center', // Center the arrow vertically
        lineHeight: '100px',
        opacity:'.5',
        borderRadius:'.3rem'
      }}
    >        <FontAwesomeIcon icon={faChevronLeft} style={{ color: 'black', fontSize: '2rem' }} />

    </div>
    );
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
      
      onClick={onClick}
      style={{
        ...style,
        position: 'absolute',
        top: '40%', // Position vertically in the middle
        right: '0', // Adjust this value as needed
        zIndex: '10',
        width: '2.813rem',
        height: '6.25rem',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        borderRadius: '', // Make it circular
        textAlign: 'center',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        opacity:'.5',
        borderRadius:'.3rem'
      }}
    >
      <FontAwesomeIcon icon={faChevronRight} style={{ color: 'black', fontSize: '2rem' }} />
    </div>
    );
  };

  // Configuration for the react-slick carousel
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // Number of slides to show initially
    slidesToScroll: 4, // Number of slides to scroll
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return  (
    <>
      {loading && !products ? ( // Render loading spinner or message if loading
        <div>Loading...</div>
      ) : (
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.ProductId} className="">
              <Link to={`/product/${product.ProductId}`} className="text-decoration-none">
                <div className="card mx-2 mb-2 product-card" style={{ height: '300px' }}>
                  <div className="card-body">
                    <center>
                      {product.Image && (
                        <img
                          src={product.Image}
                          alt={product.ProductId}
                          className=""
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      )}
                    </center>
                    <h3 className="card-title">{product.ProductTitle}({product.Colour})</h3>
                    <div className="d-flex">
                      <h2 className="">₹{product.Price}</h2>
                      <span className="mx-2 my-1 discounted-price font-size-small ">
                        M.R.P: <strike>₹{product.Price + 500}</strike>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
    
}

export default ProductList;
