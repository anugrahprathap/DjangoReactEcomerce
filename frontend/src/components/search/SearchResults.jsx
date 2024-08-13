import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./search.scss";

const SearchResult = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const query = new URLSearchParams(location.search).get("query");
  const productsPerPage = 15;
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
 

  useEffect(() => {
    if (query) {
      axios
        .get(`/api/products/search/?query=${query}`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          setResults(data);
          setTotalProducts(data.length);
          setTotalPages(Math.ceil(data.length / productsPerPage));
          setCurrentPage(1);
        })
        .catch((error) => {
          console.error("Error searching products:", error);
        });
    }
  }, [query]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = results.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="row">
      <div className="col-md-2">
        {" "}
        {/* Left empty column */}
        {/* Empty column content */}
      </div>

      <div className="col-md-8">
        {" "}
        {/* Middle column */}
        <h1 className="mt-4">Results</h1>
        <span className="font-size-small ">Price and other details may vary based on product size and colour.</span>
        <div className="row">
          { Array.isArray(currentProducts) && currentProducts.map((result, index) => (
            <div key={index} className="col-md-4 mt-4">
              <Link to={`/product/${result.ProductId}`} className="text-decoration-none">
                <div className="card product-card">
                  <div className="card-body">
                    {result.Image && (
                      <img
                        src={result.Image}
                        alt={result.ProductId}
                        className="card-img-top "
                      />
                    )}
                    <div>
                      <span className="card-title ">
                        {result.ProductTitle} ({result.Colour})
                      </span>
                      
                    </div>
                    <div className="d-flex ">
                      <h2 className="">₹{result.Price}</h2>
                      <span className="mx-2 my-1 discounted-price font-size-small ">
                       M.R.P: <strike>₹{result.Price + 500}</strike> 
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="pagination">
          {" "}
          {/* Pagination */}
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={indexOfLastProduct >= totalProducts}
          >
            Next
          </button>
        </div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>

      <div className="col-md-2">
        {" "}
        {/* Right empty column */}
        {/* Empty column content */}
      </div>
    </div>
  );
};

export default SearchResult;
