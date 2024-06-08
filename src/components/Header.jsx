// React component
import React from "react";

const Header = () => {
  return (
    <header className="header-main">
      <div className="header">
        <div className="logo">
          <h1 className="logo-text">
            VoletMarket<span>.be</span>
          </h1>
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
