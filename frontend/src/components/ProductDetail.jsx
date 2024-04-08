import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {  useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../AuthContext";
import lock from "./../images/lock.png";

function ProductDetail({ match }) {
  const config = require("./config.json");
  const serverAddress = config.serverAddress;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { loggedIn } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleAddToCart = (productId) => {
    if (loggedIn) {
      const requestData = {
        product_id: productId,
        quantity: quantity,
      };
      axios
        .post(`${serverAddress}/api/cart/add_to_cart/`, requestData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            alert("Success");
            alert(response.data.message); // Assuming 'message' is part of the response data
          } else {
            console.error("Error:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Please login to add to cart.");
      navigate("/login");
    }
  };

  const handleBuyNow = () => {
    if (loggedIn) {
      // Redirect to checkout page if logged in
      navigate(`/checkout/${product.ProductId}`);
    } else {
      // Display a message or prompt the user to log in
      alert("Please login to proceed with the purchase.");
      // Optionally, you can navigate to the login page as well
      // navigate("/login");
    }
  };

  useEffect(() => {
    axios
      .get(`${serverAddress}/api/productdetail/${id}/`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  // Function to calculate percentage difference
  const calculatePercentageDifference = (oldValue, newValue) => {
    const difference = newValue - oldValue;
    const percentageDifference = (difference / oldValue) * 100;
    return Math.round(percentageDifference);
  };

  return (
    <div className="main-content">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="image col1">
          {/* <h2>{product.ProductTitle} ({product.Colour})</h2> */}
          {product.Image && (
            <img
              src={product.Image}
              alt={product.ProductId}
              className="image-main border"
            />
          )}
        </div>
      )}
      <div className="product-text col2">
        <div className="product-content">
          <h2 style={{color:'0f1111'}}>{product.ProductTitle}</h2>
          <p>Colour: {product.Colour}</p>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #ccc",
              margin: "20px 0",
            }}
          />
          {product.Price && (
            <>
              <div style={{ display: "inline-flex" }}>
                <>
                  <h2 style={{ color: "#CC0C39" }}>
                    {/* Calculate percentage difference and display */}
                    {calculatePercentageDifference(
                      product.Price + 500,
                      product.Price
                    )}
                    % &nbsp;
                  </h2>
                  <h2 style={{ color: "#0f1111" }}>₹{product.Price}</h2>
                  &nbsp;&nbsp;
                </>
              </div>
              <br />
              <span style={{color:'#565959'}}>
                M.R.P.:
                <span
                  style={{
                    textDecoration: "line-through",
                    fontWeight: "normal",
                  }}
                >
                  ₹{product.Price + 500}
                </span>
                
              </span>
            </>
          )}
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #ccc",
              margin: "20px 0",
            }}
          />
        </div>
        <div className="quantity1">
          <label htmlFor="quantity">Quantity:&nbsp;</label>
          <select
            className="form-select form-select-lg mb-3"
            style={{ height: "2rem" }}
            aria-label=".form-select-lg example"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          >
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
      <div className="col3">
        <div className=" box-product">
          <span>
            <b> Product Price</b>
          </span>
          <br />
          <span style={{ color: "#B12704" }}>
            <b>{product.Price}</b>
          </span>
          &nbsp;
          <span style={{ color: "" }}>
            <strike>
              <b>{product.Price + 200}</b>
            </strike>
          </span>
          <div
            className="cart"
            onClick={() => handleAddToCart(product.ProductId)}
          >
            Add To Cart
          </div>
          <div className="product-btn2">
            <div className="buy" onClick={handleBuyNow}>
              Buy Now
            </div>
          </div>
          <div className="secure">
            <img src={lock} alt="" />
            <span>Secure Transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
