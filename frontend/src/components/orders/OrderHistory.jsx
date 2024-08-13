import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orderHistory.css"; // Import your CSS file
import { useAuth } from "../../AuthContext"; // Import the useAuth hook
import { Dropdown } from "react-bootstrap";

function OrderHistory() {

  const [orders, setOrders] = useState([]);
  const { loggedIn } = useAuth(); // Get the loggedIn status from the AuthContext

  // const style = {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   width: "100%",
  // };

  useEffect(() => {
    if (!loggedIn) return; // Don't fetch order history if user is not logged in
    // Fetch order history from your API
    axios
      .get(`/api/orders/myOrders/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Format the order date before setting it in the state
        const formattedOrders = response.data.map((order) => ({
          ...order,
          OrderDate: new Date(order.OrderDate).toLocaleString(), // Format the date
        }));
        setOrders(formattedOrders);
        console.log(orders);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
  }, [loggedIn]); // Run useEffect when loggedIn status changes

  if (!loggedIn) {
    return (
      <div className="order-history-container">
        <h2>Please log in to view your order history.</h2>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-2">
        {" "}
        {/* Right empty column */}
        {/* Empty column content */}
      </div>
      <div className="mt-4  col-md-8 order-history-container">
        <div className="order-history-header">
          <h1>Your Orders</h1>

          <div className="d-flex mb-4">
            <div className="">
              <input
                type="text"
                className="form-control search-order"
                placeholder="Search orders"
              />
            </div>

            <button className="mx-4 order-search-button">Search orders</button>
          </div>
        </div>
        <div className="order-type-list">
          <ul>
            <li>Orders</li>
            <li>Buy again</li>
            <li>Not Shipped</li>
            <li>Cancelled Orders</li>
          </ul>
        </div>
        <hr />
        <div className="mt-4 d-flex  order-filter-section">
          <span className="my-2">
            {" "}
            <b>12 orders </b>
            Palced in
          </span>
          <Dropdown className="mx-2">
            <Dropdown.Toggle
              className="Dropdown"
              variant=""
              id="dropdown-basic"
            >
              last 3 months
            </Dropdown.Toggle>

            <Dropdown.Menu className="Dropdown-option">
              <Dropdown.Item eventKey="last 3 months">
                last 3 months
              </Dropdown.Item>
              <Dropdown.Item eventKey="2024">2024</Dropdown.Item>
              <Dropdown.Item eventKey="2023">2023</Dropdown.Item>
              <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
              <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {orders.map((order) => (
          <div key={order.OrderId} className="mt-2  order-card">
            <div className="order-card-heading">
              <div className="row">
                <div className="col">
                  <span>ORDER PLACED</span>
                  <br />
                  <span>{order.OrderDate}</span>
                </div>
                <div className="col">
                  <span>TOTAL</span>
                  <br />
                  <span>{order.TotalPrice}</span>
                </div>
                <div className="col">ORDER # {order.OrderId}</div>
              </div>
            </div>
            <div className="order-details">
              <div className="mt-2 order-details-topic-flex">
                <div>
                <div className=" m-4">
                <span style={{ fontSize: "18px" }}>Delivered 14-Mar-2024</span>
                <br />
                <span className="font-size-small">Package was handed to resident</span>
              </div>  
                <div className=" d-flex ">
                  <div className="order-details-topic-flex">
                    <img src={order.ProductDetails[0].Image} alt="Product" />
                  </div>
                  <div>
                    <a href="#">
                      {order.ProductDetails[0].ProductTitle} (
                      {order.ProductDetails[0].Color})
                    </a>
                    <p>Return window closed on 26-Dec-2019</p>
                    <div className="mb-4 d-flex">
                      <button className="buy-again">Buy it again</button>
                      <button className="mx-2 view-item">View your item</button>
                    </div>
                  </div>
                </div>
                </div>
                
                <div className="mt-0 track-review-buttons">
                  <button className="mx-2 mb-2 track-item">
                    Track package
                  </button>
                  <button className="mx-2 mb-2 product-support">
                    Buy it again
                  </button>
                  <button className="mx-2 mb-2 track-item">
                    Leave seller feedback
                  </button>
                  <button className="mx-2 mb-2 track-item">
                    Leave delivery feedback
                  </button>
                  <button className="mx-2 mb-2 track-item">
                    Write a product review
                  </button>
                </div>
              </div>

              {/* <div>
                <p>
                  {" "}
                  {order.Status === "success"
                    ? "Ordered"
                    : order.Status} on {order.OrderDate}
                </p>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <div className="col-md-2">
        {" "}
        {/* Right empty column */}
        {/* Empty column content */}
      </div>
    </div>
  );
}

export default OrderHistory;
