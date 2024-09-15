import React from "react";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row foot-content">
        <div className="col-md-6 col-12">
          <div className="logo foot-logo">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="VoletMarket.be"
                style={{ width: "200px" }}
              />
            </Link>
          </div>
          <div className="icon-cont">
            <i className="foot-icon">
              <TfiHeadphoneAlt />
            </i>
            <div className="foot-icon-cont">
              <span>contact@voletmarket.be</span>
              <p>+32 470 66 91 26</p>
            </div>
          </div>
          <div className="foot-contact">
            <h4>Contact info</h4>
            <p>Rue Potaerdenberg 342, 1080 Bruxelles, Belgique</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
