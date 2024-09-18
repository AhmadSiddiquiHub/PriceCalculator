import React from "react";
import { Link } from "react-router-dom";

const PaymentStatus = ({ status }) => {
  return (
    <div className="payment-status">
      {status ? (
        <div className="payment-success-content">
          <video
            autoPlay
            loop
            muted
            controlsList="nodownload"
            disablePictureInPicture
          >
            <source src="/gifs/payment-success.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div>
            <h2>Payment Successfull!</h2>
            <div className="back-home">
              <Link to="/">
                <i className="home-icon"></i>
                <p>Go Back Home</p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="payment-fail-content">
          <video
            autoPlay
            loop
            muted
            controlsList="nodownload"
            disablePictureInPicture
          >
            <source src="/gifs/payment-fail.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div>
            <h2>Payment Failed!</h2>
            <div className="back-home">
              <Link to="/">
                <i className="home-icon"></i>
                <p>Go Back Home</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
