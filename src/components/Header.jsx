// React component
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-main">
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="VoletMarket.be"
              style={{ width: "200px" }}
            />
          </Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <div className="cart-icon">
          <i className="fa fa-2x fa-shopping-bag" aria-hidden="true"></i>
          <span>0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
