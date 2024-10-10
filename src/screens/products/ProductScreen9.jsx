import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Length and Width arrays
const lengths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700,
];
const widths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900,
];

const prices = [
  [58, 62, 66, 71, 75, 79, 82, 86, 91, 95, 99, 103],
  [61, 65, 69, 74, 78, 82, 86, 90, 95, 99, 104, 108],
  [63, 67, 72, 77, 81, 86, 90, 94, 100, 104, 109, 113],
  [64, 69, 73, 79, 83, 88, 93, 97, 103, 107, 112, 116],
  [66, 71, 76, 82, 87, 92, 96, 101, 107, 112, 117, 122],
  [69, 74, 79, 85, 90, 95, 100, 105, 111, 116, 122, 127],
  [70, 75, 81, 87, 92, 97, 103, 108, 114, 120, 125, 130],
  [72, 78, 83, 90, 95, 101, 107, 112, 119, 124, 130, 135],
  [74, 80, 86, 93, 99, 105, 110, 116, 123, 129, 135, 141],
  [76, 82, 88, 95, 101, 107, 113, 119, 126, 132, 138, 144],
  [78, 84, 91, 98, 104, 110, 117, 123, 130, 137, 143, 149],
  [80, 87, 93, 101, 107, 114, 121, 127, 135, 141, 148, 154],
  [82, 89, 96, 104, 111, 118, 124, 131, 139, 146, 153, 160],
  [84, 91, 98, 106, 113, 120, 127, 134, 142, 149, 156, 163],
  [86, 93, 101, 109, 116, 123, 131, 138, 146, 154, 161, 168],
  [88, 96, 103, 112, 119, 127, 135, 142, 151, 158, 166, 173],
  [90, 98, 105, 114, 122, 129, 137, 145, 153, 161, 169, 177],
  [92, 100, 108, 117, 125, 133, 141, 149, 158, 166, 174, 182],
  [94, 102, 111, 120, 128, 136, 145, 153, 162, 171, 179, 187],
  [96, 104, 113, 122, 130, 139, 147, 156, 165, 174, 182, 191],
];
// Define a color map object
const colorMap = {
  Blanc: "#ffffff",
};

// Colors array
const colors = ["Blanc"];

const ProductScreen3 = ({ onAddToCart }) => {
  const [selectedLength, setSelectedLength] = useState(lengths[0]);
  const [selectedWidth, setSelectedWidth] = useState(widths[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [price, setPrice] = useState(null);

  const minLength = Math.min(...lengths);
  const maxLength = Math.max(...lengths);

  const handleLengthChange = (e) => {
    const value = e.target.value;
    // Check if the input is empty or a valid number
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setSelectedLength(value); // Update state with raw input
    }
  };

  const handleLengthBlur = () => {
    let newLength = parseFloat(selectedLength);

    if (isNaN(newLength)) {
      newLength = minLength; // Reset to min if invalid
    }

    // Enforce minimum and maximum constraints
    if (newLength < minLength) {
      newLength = minLength;
    } else if (newLength > maxLength) {
      newLength = maxLength;
    }

    setSelectedLength(newLength); // Update state with constrained value

    updatePrice(
      newLength,
      selectedWidth,
      selectedColor,
      selectedMotor,
      selectedInterrupteur
    );
  };

  const minWidth = Math.min(...widths);
  const maxWidth = Math.max(...widths);

  const handleWidthChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setSelectedWidth(value);
    }
  };

  const handleWidthBlur = () => {
    let newWidth = parseFloat(selectedWidth);
    if (isNaN(newWidth)) {
      newWidth = minWidth;
    }
    if (newWidth < minWidth) {
      newWidth = minWidth;
    } else if (newWidth > maxWidth) {
      newWidth = maxWidth;
    }
    setSelectedWidth(newWidth);
    updatePrice(
      selectedLength,
      newWidth,
      selectedColor,
      selectedMotor,
      selectedInterrupteur
    );
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    updatePrice(selectedLength, selectedWidth, newColor);
  };

  const findIndexInRange = (value, array) => {
    for (let i = 0; i < array.length - 1; i++) {
      if (value >= array[i] && value < array[i + 1]) {
        return i;
      }
    }
    if (value >= array[array.length - 1]) {
      return array.length - 1;
    }
    return -1;
  };

  const updatePrice = (length, width, color) => {
    const lengthIndex = findIndexInRange(length, lengths);
    const widthIndex = findIndexInRange(width, widths);

    if (
      lengthIndex !== -1 &&
      widthIndex !== -1 &&
      prices[lengthIndex][widthIndex] !== undefined
    ) {
      let basePrice = prices[lengthIndex][widthIndex];

      // Adjust base price based on color
      if (colors.indexOf(color) > 1) {
        basePrice += basePrice * 0.12;
      }

      // setPrice(basePrice);
      // Apply 21% tax
      const finalPriceWithTax = basePrice * 1.21;

      setPrice(finalPriceWithTax);
    } else {
      setPrice(null);
    }
  };

  useEffect(() => {
    updatePrice(selectedLength, selectedWidth, selectedColor);
  }, [selectedLength, selectedWidth, selectedColor]);

  const handleAddToCart = () => {
    const product = {
      id: 9,
      name: "TABLIER PVC 37",
      category: "VOLET",
      dimensions: `${selectedWidth} X ${selectedLength}`,
      color: selectedColor,
      image: "/images/prod-1.png",
      price: price,
      quantity: 1,
    };
    onAddToCart(product);
  };

  return (
    <>
      <div className="container prod-page">
        <div className="row">
          <div className="col-md-6 col-12 left">
            <img
              className="prod-img"
              src="/images/prod-1.png"
              alt="Product Image"
            />
          </div>
          <div className="col-md-6 col-12 right">
            <h1 className="main-head">
              <span className="sub-heading">Personnalisez votre</span> <br />
              <div class="spaced-text">
                <span>T A B L I E R</span>
                <span>P V C</span>
                <span>3 7</span>
              </div>
            </h1>

            <div className="dimensions">
              <h2 className="sub-head">DIMENSIONS</h2>
              <div className="row dim-cont">
                <div className="col-6 sel-inp dimension-back-1">
                  <label className="labels">
                    <span className="labels-head">Largeur</span>
                    <br />
                    Min (800mm) & Max (1900mm)
                  </label>
                  <input
                    type="number"
                    className="field__input dimension-inp-left"
                    value={selectedWidth}
                    min={minWidth}
                    max={maxWidth}
                    step="0.1"
                    onChange={handleWidthChange}
                    onBlur={handleWidthBlur}
                  />
                  {/* <p>
                    Mesurez la largeur entre murs en 3 points et gardez la plus
                    petite
                  </p> */}
                </div>
                <div className="col-6 sel-inp dimension-back-2">
                  <label className="labels">
                    <span className="labels-head">Hauteur</span>
                    <br />
                    Min (800mm) & Max (2700mm)
                  </label>
                  <input
                    type="number"
                    className="field__input dimension-inp-right"
                    value={selectedLength}
                    min={minLength}
                    max={maxLength}
                    step="0.1"
                    onChange={handleLengthChange}
                    onBlur={handleLengthBlur}
                  />
                  {/* <p>
                    Mesurez la hauteur entre murs en 3 points et gardez la plus
                    petite
                  </p> */}
                </div>
              </div>
            </div>

            {/* <hr className="custom" /> */}

            <div className="colors">
              <h1 className="sub-head">COULEURS</h1>

              <div className="colors-container">
                {colors.map((color) => (
                  <div className="color-wrapper" key={color}>
                    <input
                      className="radio_opt"
                      type="radio"
                      value={color}
                      id={`color-${color}`}
                      checked={selectedColor === color}
                      onChange={handleColorChange}
                      required
                    />
                    <label
                      className="color"
                      htmlFor={`color-${color}`}
                      style={{ backgroundColor: colorMap[color] }}
                    ></label>
                    <div className="color-label">{color}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="total" style={{ marginTop: "50px" }}>
              <h2 className="tot-text">
                {price !== null
                  ? `${price.toFixed(2)}€`
                  : "Price not available"}
              </h2>
            </div>

            <div className="cart-button">
              <Link to="/checkout">
                <button className="cart-btn" onClick={handleAddToCart}>
                  Ajouter au panier
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen3;
