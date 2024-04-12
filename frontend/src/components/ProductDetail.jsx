import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../AuthContext";
import lock from "./../images/lock.png";
import free from "./../images/free_shipping.png";
import payod from "./../images/payod.png";

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
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#fccf03"
            className="bi bi-star-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-star"
            viewBox="0 0 16 16"
          >
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
          </svg>
        );
      }
    }
    return stars;
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
              className="image-main "
            />
          )}
        </div>
      )}
      <div className="product-text col2">
        <div className="product-content">
          <h2 style={{ color: "#0f1111" }}>{product.ProductTitle}</h2>
          <p>Colour: {product.Colour}</p>
          <span style={{fontSize:'1.5rem'}}>3.8 &nbsp;</span>
          <span>{renderStars(3.6)}</span>
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
              <span style={{ color: "#565959" }}>
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
              <br />
              <span>Inclusive of all taxes</span>
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
        <div className="second-card">
          <div className="">
            <img src={free} alt="" />
            <br />
            <span>Free Delivery</span>
          </div>
          <div>
            <img src={payod} alt="" />
            <br />
            <span className="">Pay on Delivery</span>
          </div>
        </div>
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #ccc",
            margin: "20px 0",
          }}
        />
        <div className="quantity1">
          <label htmlFor="quantity">Quantity:&nbsp;</label>
          <select
            className=""
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
        <div className="product-details1">
          <h3>Specifications</h3>
          <p>Product Type: {product.ProductType}</p>
          <p>Category: {product.Category}</p>
          <p>Sub Category: {product.SubCategory}</p>
          <p>Usage: {product.Usage}</p>
          <p>Colour: {product.Colour}</p>
        </div>
      </div>
      <div className="col3">
        <div className=" box-product">
          <span style={{ alignSelf: "flex-start" }}>
            <b> Product Price</b>
          </span>

          <div style={{ alignSelf: "flex-start" }}>
            <span style={{ color: "#B12704" }}>
              <b>{product.Price}</b>
            </span>
            &nbsp;
            <span style={{ color: "" }}>
              <strike>
                <b>{product.Price + 200}</b>
              </strike>
            </span>
          </div>
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
          {/* <hr
            style={{
              border: "none",
              borderTop: "1px solid #ccc",
              margin: "20px 0",
            }}
          /> */}
          {/* <div className="wishlist">
            <span>Add to Wishlist</span>
            <select name="" id="" placeholder="Add to Wishlist">
              <option value=""></option>
              <option value="">option 1</option>
            </select>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
