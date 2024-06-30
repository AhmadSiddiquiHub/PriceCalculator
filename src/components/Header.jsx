// React component
import React from "react";
import { Link } from "react-router-dom";
import cartStore from "../store";
import { useSnapshot } from "valtio";

const Header = () => {
  const cart = useSnapshot(cartStore);
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
          <Link to="/checkout">
            <i className="fa fa-2x fa-shopping-bag" aria-hidden="true"></i>
            <span>{cart.items.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
