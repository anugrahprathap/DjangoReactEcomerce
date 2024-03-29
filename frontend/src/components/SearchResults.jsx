// import React from 'react';
// import { Link } from 'react-router-dom';
// function SearchResults({ results }) {
    
//   return (
//     <div className="search-results-container">
//       <h1>Search Results</h1>
//       {results.map((result) => (
//         <Link to={`/product/${result.ProductId}`} className="link">
//         <div key={result.id} className="search-result">
          
//           <h3>{result.ProductTitle} ({result.Colour})</h3>
//           {result.Image && (
//                     <img src={result.Image} alt={result.ProductId} className='image-main border' />
//                 )}
//               <div style={{display:'inline-flex'}}><h3>₹{result.Price}</h3>&nbsp;&nbsp;<h3 style={{ textDecoration: 'line-through',fontWeight: 'normal'}}>₹{result.Price + 500}</h3></div>
//         </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default SearchResults;


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const SearchResult = () => {
    const location = useLocation();
    const [results, setResults] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const query = new URLSearchParams(location.search).get('query')
    const productsPerPage = 15;
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const config = require('./config.json');
    const serverAddress = config.serverAddress;
    useEffect(() => {
        if (query) {
            axios.get(`${serverAddress}/api/products/search/?query=${query}`)
                .then((response) => {
                    const data = response.data;
                    console.log(data)
                    setResults(data);
                    setTotalProducts(data.length);
                    setTotalPages(Math.ceil(data.length / productsPerPage));
                })
                .catch((error) => {
                    console.error('Error searching products:', error);
                });
        }
    }, [query]);

    const pagesToShow = [];
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pagesToShow.push(i);
    }
    if (totalPages > 3) {
        pagesToShow.push(totalPages);
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = results.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="search-results">
            <h1>Search results</h1>
            <div className="results">
                {currentProducts.map((result) => (
                    <Link to={`/product/${result.ProductId}`} className="link">
                            <div key={result.id} className="search-result">
                              
                             <h3>{result.ProductTitle} ({result.Colour})</h3>
                              {result.Image && (
                                        <img src={result.Image} alt={result.ProductId} className='image-main border' />
                                    )}
                                  <div style={{display:'inline-flex'}}><h3>₹{result.Price}</h3>&nbsp;&nbsp;<h3 style={{ textDecoration: 'line-through',fontWeight: 'normal'}}>₹{result.Price + 500}</h3></div>
                            </div>
                            </Link>
                ))}
            </div>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                {/* {pagesToShow.map((page) => (
                    <button key={page} onClick={() => setCurrentPage(page)}>{page}</button>
                ))} */}
                <button onClick={nextPage} disabled={indexOfLastProduct >= totalProducts}>Next</button>
            </div>
            <p>Page {currentPage} of {totalPages}</p>
        </div>
    );
};

export default SearchResult;
