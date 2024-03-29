import React from 'react';

function SearchResults({ results }) {
    
  return (
    <div className="search-results-container">
      <h1>Search Results</h1>
      {results.map((result) => (
        <div key={result.id} className="search-result">
          {/* Display individual search results */}
          <h3>{result.ProductTitle} ({result.Colour})</h3>
          {result.Image && (
                    <img src={result.Image} alt={result.ProductId} className='image-main border' />
                )}
              <div style={{display:'inline-flex'}}><h3>₹{result.Price}</h3>&nbsp;&nbsp;<h3 style={{ textDecoration: 'line-through',fontWeight: 'normal'}}>₹{result.Price + 500}</h3></div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
