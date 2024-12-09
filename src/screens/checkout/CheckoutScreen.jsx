import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { RiQuestionLine } from "react-icons/ri";
import { GrLock } from "react-icons/gr";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CountrySelect from "../../components/CountrySelect";
import { useSnapshot } from "valtio";
import cartStore from "../../store";
import { BsCartXFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import PayPalButton from "../../components/PaypalButton";
import PaymentStatus from "../../components/PaymentStatus";

const CheckoutPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [selectedOption, setSelectedOption] = useState("card");
  const [showShippingPolicy, setShowShippingPolicy] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    phone: "",
    country: null,
  });

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const toggleShippingPolicy = () => {
    setShowShippingPolicy(!showShippingPolicy);
  };

  const handleClosePopup = (e) => {
    if (e.target.classList.contains("shipping-policy-popup")) {
      setShowShippingPolicy(false);
    }
  };

  const handleCountryChange = (country) => {
    setFormData((prevData) => ({ ...prevData, country }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isFormValid = () => {
    // Ensure all required fields are filled
    const requiredFields = [
      "email",
      "firstName",
      "lastName",
      "address",
      "postalCode",
      "city",
      "phone",
    ];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        return false;
      }
    }

    // Validate email format (simple regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      return false;
    }

    // Validate phone number length (assuming it should be at least 10 digits)
    if (formData.phone.length < 10) {
      return false;
    }

    return true;
  };

  const cart = useSnapshot(cartStore);

  const totalPrice = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handlePaymentSuccess = () => {
    setPaymentStatus(true);
  };

  const handlePaymentFailure = () => {
    setPaymentStatus(false);
  };

  return (
    <div className="checkout-page">
      {paymentStatus ? (
        <PaymentStatus status={paymentStatus} />
      ) : (
        <div className="container-fluid checkout-container">
          <div className="row">
            <div className="col-md-7 payment-section">
              <div className="checkout-form">
                <div className="checkout-section"></div>
                <form>
                  <div className="checkout-section">
                    <h3 className="section-head">Delivery</h3>
                    <CountrySelect
                      value={formData.country}
                      onChange={handleCountryChange}
                    />
                    <div className="row delivery-form">
                      <div className="col-md-6">
                        <input
                          className="inp-outline"
                          type="text"
                          placeholder="First name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className="inp-outline"
                          type="text"
                          placeholder="Last name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <input
                          className="inp-outline"
                          type="text"
                          placeholder="Address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className="inp-outline"
                          type="text"
                          placeholder="Postal code"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className="inp-outline"
                          type="text"
                          placeholder="City"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <input
                          className="inp-outline"
                          type="text"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-12 inp-symbol">
                        <input
                          className="inp-outline"
                          type="text"
                          placeholder="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                        <i>
                          <AiOutlineInfoCircle className="info-icon-phone" />
                        </i>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="payment-gateways">
                <h3 className="section-head">Payment</h3>
                <div className="payment-description">
                  All transactions are secure and encrypted.
                </div>
                <div className="payment-container">
                  <div
                    className={`card-cont ${
                      selectedOption === "card" ? "selected" : ""
                    }`}
                  >
                    <div className="payment-option card-option">
                      <input
                        type="radio"
                        id="card"
                        name="payment"
                        value="card"
                        checked={selectedOption === "card"}
                        onChange={() => handleOptionChange("card")}
                      />
                      <label htmlFor="card" className="payment-label">
                        <span>Credit card</span>
                        <div className="card-imgs">
                          <img
                            src="/images/visa.png"
                            alt="Card Logos"
                            className="payment-logo"
                          />
                          <img
                            src="/images/master.png"
                            alt="Card Logos"
                            className="payment-logo"
                          />
                          <img
                            src="/images/union.png"
                            alt="Card Logos"
                            className="payment-logo"
                          />
                        </div>
                      </label>
                    </div>
                    {selectedOption === "card" && (
                      <div className="payment-details">
                        <form>
                          <div className="row">
                            <div className="col-md-12 gr-lock">
                              <input
                                className="inp-outline"
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="Card number"
                              />
                              <i className="icon">
                                <GrLock className="lock-icon" />
                              </i>
                            </div>
                            <div className="col-md-6">
                              <input
                                className="inp-outline"
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                placeholder="Expiration date (MM / YY)"
                              />
                            </div>
                            <div className="col-md-6 question-mark">
                              <input
                                className="inp-outline"
                                type="text"
                                id="cvv"
                                name="cvv"
                                placeholder="Security code"
                              />
                              <i className="icon">
                                <RiQuestionLine />
                              </i>
                            </div>
                            <div className="col-md-12">
                              <input
                                className="inp-outline"
                                type="text"
                                id="nameOnCard"
                                name="nameOnCard"
                                placeholder="Name on card"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  <div
                    className={`card-cont ${
                      selectedOption === "paypal" ? "selected" : ""
                    }`}
                  >
                    <div className="payment-option">
                      <input
                        type="radio"
                        id="paypal"
                        name="payment"
                        value="paypal"
                        checked={selectedOption === "paypal"}
                        onChange={() => handleOptionChange("paypal")}
                        disabled={cart.items.length === 0}
                      />
                      <label htmlFor="paypal" className="payment-label">
                        <span>PayPal</span>
                        <img
                          src="/images/paypal.webp"
                          alt="PayPal Logo"
                          className="payment-logo"
                        />
                      </label>
                    </div>
                    {selectedOption === "paypal" && (
                      <div className="payment-details">
                        <p>
                          After clicking "Pay with PayPal", you will be
                          redirected to PayPal to complete your purchase
                          securely.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div type="submit">
                {selectedOption === "paypal" && isFormValid() ? (
                  <PayPalButton
                    totalPrice={totalPrice}
                    formData={formData}
                    cartItems={cart.items}
                    onSuccess={handlePaymentSuccess}
                    onFailure={handlePaymentFailure}
                    disabled={!isFormValid()}
                  />
                ) : (
                  <button
                    className="pay-button"
                    disabled={cart.items.length === 0 || !isFormValid()}
                  >
                    Fill the Form First!
                  </button>
                )}
              </div>
            </div>

            {/* Right Side */}
            <div className="col-md-5 right-sec">
              {cart.items.length === 0 ? (
                <div className="empty-cart">
                  <p style={{ fontSize: "30px", fontWeight: "bolder" }}>
                    Your cart is empty!
                  </p>
                  <i style={{ fontSize: "80px" }}>
                    <BsCartXFill />
                  </i>
                </div>
              ) : (
                <>
                  {cart.items.map((item) => (
                    <div key={item.id}>
                      <div className="cart-item">
                        <div className="item-image">
                          <img src={item.image} alt={item?.name} />
                        </div>
                        <div className="item-details">
                          <h3>{item.name}</h3>
                          <div className="cart-detail">
                            <p>
                              {item.dimensions && (
                                <>
                                  Dimensions: {item.dimensions} <br />
                                </>
                              )}
                              {item.color && (
                                <>
                                  Color: {item.color} <br />
                                </>
                              )}
                              {item.motor?.name && (
                                <>
                                  Motor: {item.motor.name} <br />
                                </>
                              )}
                              {item.interrupteur && (
                                <>
                                  Interrupteur: {item.interrupteur} <br />
                                </>
                              )}
                              {item.cable && <>Cable: {item.cable}</>}
                            </p>
                            <span className="cart-action">
                              <p>Quantity: {item.quantity}</p>
                              <i onClick={() => cartStore.removeItem(item.id)}>
                                <MdDelete />
                              </i>
                            </span>
                          </div>
                        </div>
                        <div className="item-price">€{item.price}</div>
                      </div>
                    </div>
                  ))}
                  <hr />
                  <div className="cart-summary">
                    <div className="subtotal">
                      <span>Subtotal</span>
                      <span>€{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="shipping">
                      <span>
                        Shipping
                        <span
                          className="info-icon"
                          onClick={toggleShippingPolicy}
                        >
                          <RiQuestionLine />
                        </span>
                      </span>

                      <span>FREE</span>
                    </div>
                    <div className="cart-total">
                      <span>Total</span>
                      <span>
                        <span className="cart-curr">EUR</span> €
                        {totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {showShippingPolicy && (
                      <div
                        className="shipping-policy-popup"
                        onClick={handleClosePopup}
                      >
                        <div className="popup-content animate-popup">
                          <div className="popup-head">
                            <div>
                              <h3>Shipping Policy</h3>
                              <button onClick={toggleShippingPolicy}>
                                <MdOutlineCancel />
                              </button>
                            </div>
                            <p>
                              All orders placed will be dispatched from our
                              warehouse within 3-10 business days. Please note
                              all shipping timeframe are calculated from date of
                              dispatch.
                              <br />
                              All dispatch times and shipping times are
                              estimated in business days (Monday - Friday) as
                              outlined here. Estimated delivery timeframes are
                              based on Metro areas only. Shipping times exclude
                              customs clearance delays and any other delays
                              caused in circumstances that are outside our
                              control.
                              <br />
                              We cannot make changes to your shipping addresses
                              or redirect your parcel once your order has been
                              confirmed.
                              <br />
                              Please note that it might not be possible for us
                              to deliver each service to some locations, and we
                              may not be able to offer equivalent delivery
                              options to your location. If we are unable to
                              deliver to your location, we will inform you, or
                              alternatively arrange with you for cancellation of
                              the order or delivery to an alternative delivery
                              address.
                              <br />
                              Any further questions please contact
                              help@hismileteeth.com
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
