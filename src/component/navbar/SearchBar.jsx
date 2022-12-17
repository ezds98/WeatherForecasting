import React from "react";
import "./searchbar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
// import "./navbar.css";

function SearchBar() {
  return (
    <div className="container">
      <div className="input">
        <input type="text" placeholder="search for city.." className="search" />
        <div className="icon">
          <AiOutlineSearch style={{ fontSize: "30px" }} />
          <GoLocation style={{ fontSize: "30px" }} />
        </div>
      </div>

      <div className="celsiusFaranite">
        <button name="metric" className="celsius">
          °C
        </button>
        <p className="para">|</p>
        <button name="imperial" className="farahenite">
          °F
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
