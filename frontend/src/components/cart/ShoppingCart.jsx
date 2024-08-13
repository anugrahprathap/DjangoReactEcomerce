import React, { useEffect, useState } from "react";
import axios from "axios";
import "./shoppingCart.css"; // Import your CSS file
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Import the useAuth hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck
} from "@fortawesome/free-solid-svg-icons";
function ShoppingCart() {
 
  const [cartItems, setCartItems] = useState([]);
  const { loggedIn } = useAuth(); // Get the loggedIn status from the AuthContext
  const [totalPrice,settotalPrice] = useState('')
  const feachData = () => {
    axios
    .get(`/api/cart/get_queryset/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      setCartItems(response.data);
      let total = 0;
      response.data.forEach(order => {
        total += order.product.Price*order.quantity;
        
    });
    
    
    settotalPrice(total);
      
    })
    .catch((error) => {
      console.error("Error fetching cart items:", error);
    });
    }
  useEffect(() => {
    if (!loggedIn) return; // Don't fetch cart items if user is not logged in
    // Fetch cart items from your API
    
    feachData();
  }, [loggedIn]); // Run useEffect when loggedIn status changes

  const handleRemoveItem = (itemId) => {
    
      axios.delete(`/api/cart/remove_from_cart/`, {
        
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        
          data: {
              id: itemId
          }
      })
      .then(response => {
          // Handle success
          console.log('Item removed from cart successfully');
      })
      .catch(error => {
          // Handle error
          console.error('Error removing item from cart:', error);
      });
      feachData();
      


  };

  if (!loggedIn) {
    return (
      <div className="shopping-cart-container">
        <h2 className="cart-header">
          Please log in to view your shopping cart.
        </h2>
      </div>
    );
  }


  return (
    <div className=" shopping-cart-container">
      <div className="row">
        <div className="col margin-left shopping-cart-items">
          <div className="mt-4">
          <span className="mt-4 mx-4 cart-header">Shopping Cart</span>
          <br />
          <div className="cart-headings">
          <span className="mx-4"><a href="#" className="cartitem-ancor">Deselect all items</a></span>
          <span className="my-2 price">Price</span>
          </div>
          
          </div>
          <hr className="mt-0" />
          {cartItems.map((item) => (
            <div className="d-flex mt-2 cart-item" key={item.id}>
              <input type="checkbox" name="" className="mx-2" id={item.id} />
              <img
                src={item.product.Image}
                alt={item.product.ProductTitle}
                className="product-image"
              />
              <div className="product-info">
                <div className="d-flex wrap mt-4 ">
                  <span className="product-title">
                  {item.product.ProductTitle}({item.product.Colour})
                
                  </span>
                </div>
                <span className="mt-2" style={{color:'#007600'}}>in stock</span>
                <div className="mt-4  d-flex">
                
                <select name="" id="" className="mx-2">
                  <option value={item.quantity}>
                  Quantity: {item.quantity}
                  </option>
                </select>
                <i style={{color:'#dddd'}}>|</i>
                <a href="#"
                  className="mx-2 remove-item"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </a>
                <i style={{color:'#dddd'}}>|</i>
                <a href="#" className="mx-2 remove-item">
                  Share
                </a>
                </div>
                
                
                {/*  */}
                
              </div>
              <div className="mx-4 item-price">
                <span>  
                ₹{item.product.Price}
                </span>
              
              </div>
              
            </div>
          ))}
          
          
      
        </div>
        <div className="col-md-3 margin-right">
          <div className="mt-0 checkout-card">
            <span className="d-flex">
            <FontAwesomeIcon icon={faCheck} className="mx-2 icon" />
            <span style={{color:'#067D62',fontWeight:'bold'}}>
            Your order is eligible for FREE Delivery.
            </span>
            </span>
          
            <span className="mb-3">
           Choose <a className="free-delivary">FREE Delivery</a> option at checkout.
          </span>
          
          <span>Subtotal ({cartItems.length} items):  ₹{totalPrice}</span>
          <Link to="/CartCheckout">
            <button className="custom-checkout-button">Checkout</button>
          </Link>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
