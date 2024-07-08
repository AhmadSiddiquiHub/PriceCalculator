import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { RiQuestionLine } from "react-icons/ri";
import { GrLock } from "react-icons/gr";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CountrySelect from "../../components/CountrySelect";
import { RiSmartphoneLine } from "react-icons/ri";
import { useSnapshot } from "valtio";
import cartStore from "../../store";
import { BsCartXFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import PayPalButton from "../../components/PaypalButton";

const CheckoutPage = () => {
  const [selectedOption, setSelectedOption] = useState("card");
  const [discountCode, setDiscountCode] = useState("");
  const [showShippingPolicy, setShowShippingPolicy] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedShippingOption, setSelectedShippingOption] =
    useState("standard");
  const [isChecked, setIsChecked] = useState(false);
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleApplyDiscount = () => {
    console.log("Discount code applied:", discountCode);
  };

  const toggleShippingPolicy = () => {
    setShowShippingPolicy(!showShippingPolicy);
  };

  const handleClosePopup = (e) => {
    if (e.target.classList.contains("shipping-policy-popup")) {
      setShowShippingPolicy(false);
    }
  };

  const handleShippingOptionChange = (event) => {
    setSelectedShippingOption(event.target.value);
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

  return (
    <div className="checkout-page">
      <div className="container-fluid checkout-container">
        <div className="row">
          <div className="col-md-7 payment-section">
            <div className="checkout-form">
              <div className="checkout-section">
                <h3 className="section-title">Express checkout</h3>
                <div className="checkout-button-container">
                  <button className="checkout-button shop-pay-btn">
                    <img src="/images/shop-pay.webp" alt="Shop Pay" />
                  </button>
                  <button className="checkout-button paypal-btn">
                    <img src="/images/paypal.webp" alt="PayPal" />
                  </button>
                  <button className="checkout-button google-btn">
                    <img src="/images/google.png" alt="Google Pay" />
                    <span className="google-btn-text">Pay</span>
                  </button>
                </div>

                <div className="divider">
                  <span className="divider-text">OR</span>
                </div>
                {/* <button className="log-in-button">Log in</button> */}
              </div>
              <form>
                <div className="checkout-section">
                  <h3 className="section-head">Contact</h3>
                  <input
                    className="inp-outline"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="customCheckbox"
                      className="custom-checkbox"
                    />

                    <span>Email me with news and offers</span>
                  </div>
                </div>
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
                    <div className="col-md-12">
                      <input
                        className="inp-outline"
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        name="apartment"
                        value={formData.apartment}
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
                    <div className="col-md-12 inp-symbol">
                      <input
                        className="inp-outline"
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      <i>
                        <AiOutlineInfoCircle className="info-icon-phone" />
                      </i>
                    </div>
                  </div>

                  {/* <div className="shipping-options">
                  <h3>How do you want your order delivered?</h3>
                  <p>
                    Please allow 1 - 4 business days processing time before
                    dispatch.
                  </p>
                  {!postalCode ? (
                    <p className="shipping-note">
                      Enter your shipping address to view available shipping
                      methods.
                    </p>
                  ) : (
                    <div className="shipping-inp">
                      <div
                        className={`option ${
                          selectedOption === "standard" ? "selected" : ""
                        }`}
                        onClick={() => setSelectedShippingOption("standard")}
                      >
                        <input
                          type="radio"
                          id="standard"
                          name="shipping"
                          value="standard"
                          checked={selectedShippingOption === "standard"}
                          onChange={handleShippingOptionChange}
                        />
                        <div className="option-label">
                          <span>
                            Tracked Standard Shipping (4-8 Business Days)
                          </span>
                          <span>€5.99</span>
                        </div>
                      </div>
                      <div
                        className={`option ${
                          selectedOption === "express" ? "selected" : ""
                        }`}
                        onClick={() => setSelectedShippingOption("express")}
                      >
                        <input
                          type="radio"
                          id="express"
                          name="shipping"
                          value="express"
                          checked={selectedShippingOption === "express"}
                          onChange={handleShippingOptionChange}
                        />
                        <div className="option-label">
                          <span>Express Shipping (2-3 business days)</span>
                          <span>€9.99</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div> */}

                  {showAddress && (
                    <div className="address-input">
                      <input type="text" placeholder="Enter your address" />
                    </div>
                  )}
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
                        After clicking "Pay with PayPal", you will be redirected
                        to PayPal to complete your purchase securely.
                      </p>
                    </div>
                  )}
                </div>

                <div
                  className={`card-cont ${
                    selectedOption === "clearpay" ? "selected" : ""
                  }`}
                >
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="clearpay"
                      name="payment"
                      value="clearpay"
                      checked={selectedOption === "clearpay"}
                      onChange={() => handleOptionChange("clearpay")}
                    />
                    <label htmlFor="clearpay" className="payment-label">
                      <span>Clearpay</span>
                      <img
                        src="/images/clear-pay.png"
                        alt="Clearpay Logo"
                        className="payment-logo"
                      />
                    </label>
                  </div>
                  {selectedOption === "clearpay" && (
                    <div className="payment-details">
                      <div>
                        <img src="/images/card.png" alt="card-image" />
                      </div>
                      <p>
                        After clicking “Pay now”, you will be redirected to
                        <br />
                        Clearpay to complete your purchase securely.
                      </p>
                    </div>
                  )}
                </div>

                <div
                  className={`card-cont ${
                    selectedOption === "klarna" ? "selected" : ""
                  }`}
                >
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="klarna"
                      name="payment"
                      value="klarna"
                      checked={selectedOption === "klarna"}
                      onChange={() => handleOptionChange("klarna")}
                    />
                    <label htmlFor="klarna" className="payment-label">
                      <span>Klarna - Flexible payments</span>
                      <img
                        src="/images/klarna.png"
                        alt="Klarna Logo"
                        className="payment-logo"
                      />
                    </label>
                  </div>
                  {selectedOption === "klarna" && (
                    <div className="payment-details klarna-option">
                      <div>
                        <img src="/images/card.png" alt="card-image" />
                      </div>
                      <p>
                        After clicking “Pay now”, you will be redirected to
                        Klarna <br /> - Flexible payments to complete your
                        purchase securely.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {selectedOption === "card" && (
                <>
                  <h3 className="section-head">Remember me</h3>
                  <div className="remember-me-container">
                    <div className="remember-checkbox-container">
                      <input
                        type="checkbox"
                        id="remember-me"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="remember-me">
                        Save my information for a faster checkout
                      </label>
                    </div>
                    {isChecked && (
                      <div className="additional-content">
                        <div className="phone-input">
                          <div className="mobile-inp">
                            <i className="icon">
                              <RiSmartphoneLine />
                            </i>
                            <input
                              className="inp-outline"
                              type="text"
                              id="phone-number"
                              name="phone-number"
                              placeholder="Mobile phone number"
                            />
                          </div>
                        </div>
                        <p className="info-text">
                          Next time you check out here or on other stores
                          powered by Shopify, you’ll receive a code by text
                          message to securely purchase with Shop Pay.
                        </p>
                        <p className="terms-text">
                          By continuing, you agree to Shop Pay’s{" "}
                          <a href="#">Privacy Policy</a> and{" "}
                          <a href="#">Terms of Service</a>.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div type="submit">
              {selectedOption === "paypal" && isFormValid() ? (
                <PayPalButton
                  totalPrice={totalPrice}
                  formData={formData}
                  cartItems={cart.items}
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
                <div className="discount-code">
                  <input
                    type="text"
                    placeholder="Discount code or gift card"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button onClick={handleApplyDiscount}>Apply</button>
                </div>
                <div className="cart-summary">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <span>€{totalPrice}</span>
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
                            warehouse within 3-10 business days. Please note all
                            shipping timeframe are calculated from date of
                            dispatch.
                            <br />
                            All dispatch times and shipping times are estimated
                            in business days (Monday - Friday) as outlined here.
                            Estimated delivery timeframes are based on Metro
                            areas only. Shipping times exclude customs clearance
                            delays and any other delays caused in circumstances
                            that are outside our control.
                            <br />
                            We cannot make changes to your shipping addresses or
                            redirect your parcel once your order has been
                            confirmed.
                            <br />
                            Please note that it might not be possible for us to
                            deliver each service to some locations, and we may
                            not be able to offer equivalent delivery options to
                            your location. If we are unable to deliver to your
                            location, we will inform you, or alternatively
                            arrange with you for cancellation of the order or
                            delivery to an alternative delivery address.
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
    </div>
  );
};

export default CheckoutPage;
