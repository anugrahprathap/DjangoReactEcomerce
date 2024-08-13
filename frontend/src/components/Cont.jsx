import React from 'react'
import data from "./TemplateData.json";
import { useState } from 'react';
import './cont.css';
const Cont = () => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
      <>
        <div className="templateContainer">
          <div className="searchInput_Container">
            <input id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {
              setSearchTerm(event.target.value);
            }} />
          </div>
          <div className="template_Container">
            {Array.isArray(data) && 
              data 
                .filter((val) => {
                  if(searchTerm == ""){
                    return val;
                  }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val;
                  }
                })
                .map((val) => {
                  return(
                    <div className="template" key={val.id}>
                        <img src={val.image} alt="" />
                        <h3>{val.title}</h3>
                        <p className="price">${val.price}</p>
                    </div> 
                  )
                })
            }
          </div>
        </div>
      </>
    )
}

export default Cont