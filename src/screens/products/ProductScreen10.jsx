import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Length and Width arrays
const lengths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500,
];
const widths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000,
];

const prices = [
  [
    63, 68, 73, 78, 82, 87, 91, 96, 101, 106, 110, 115, 119, 125, 129, 134, 138,
    143, 148, 153, 157, 162, 166,
  ],
  [
    66, 71, 76, 81, 86, 91, 96, 101, 106, 111, 116, 121, 125, 131, 136, 141,
    146, 150, 156, 161, 166, 171, 175,
  ],
  [
    68, 73, 79, 85, 90, 95, 100, 105, 111, 116, 121, 126, 132, 137, 143, 148,
    153, 158, 164, 169, 174, 179, 185,
  ],
  [
    71, 76, 82, 88, 93, 99, 104, 110, 116, 121, 127, 132, 138, 144, 149, 155,
    160, 166, 172, 177, 183, 188, 194,
  ],
  [
    73, 79, 85, 91, 97, 103, 109, 114, 121, 127, 132, 138, 144, 150, 156, 162,
    168, 173, 180, 186, 191, 197, 203,
  ],
  [
    76, 82, 88, 95, 101, 107, 113, 119, 126, 132, 138, 144, 150, 157, 163, 169,
    175, 181, 188, 194, 200, 206, 212,
  ],
  [
    78, 84, 91, 98, 104, 111, 117, 123, 131, 137, 143, 150, 156, 163, 170, 176,
    182, 189, 196, 202, 208, 215, 221,
  ],
  [
    81, 87, 94, 101, 108, 115, 121, 128, 135, 142, 149, 155, 162, 170, 176, 183,
    190, 196, 204, 210, 217, 224, 230,
  ],
  [
    83, 90, 97, 105, 112, 119, 126, 133, 140, 147, 154, 161, 168, 176, 183, 190,
    197, 204, 212, 219, 226, 233, 240,
  ],
  [
    85, 93, 100, 108, 115, 123, 130, 137, 145, 152, 160, 167, 174, 182, 190,
    197, 204, 212, 220, 227, 234, 241, 249,
  ],
  [
    88, 95, 103, 111, 119, 127, 134, 142, 150, 158, 165, 173, 180, 189, 196,
    204, 212, 219, 227, 235, 243, 250, 258,
  ],
  [
    90, 98, 106, 115, 123, 131, 138, 146, 155, 163, 171, 179, 187, 195, 203,
    211, 219, 227, 235, 243, 251, 259, 267,
  ],
  [
    93, 101, 109, 118, 126, 135, 143, 151, 160, 168, 176, 184, 193, 202, 210,
    218, 226, 234, 243, 252, 260, 268, 276,
  ],
  [
    95, 104, 112, 121, 130, 138, 147, 155, 165, 173, 182, 190, 199, 208, 217,
    225, 234, 242, 251, 260, 268, 277, 285,
  ],
  [
    98, 106, 115, 125, 134, 142, 151, 160, 170, 178, 187, 196, 205, 214, 223,
    232, 241, 250, 259, 268, 277, 286, 294,
  ],
  [
    100, 109, 118, 128, 137, 146, 156, 165, 175, 184, 193, 202, 211, 221, 230,
    239, 248, 257, 267, 276, 285, 295, 304,
  ],
  [
    103, 112, 121, 132, 141, 150, 160, 169, 179, 189, 198, 208, 217, 227, 237,
    246, 256, 265, 275, 285, 294, 303, 313,
  ],
  [
    105, 115, 124, 135, 145, 154, 164, 174, 184, 194, 204, 213, 223, 234, 243,
    253, 263, 273, 283, 293, 303, 312, 322,
  ],
  [
    107, 117, 127, 138, 148, 158, 168, 178, 189, 199, 209, 219, 229, 240, 250,
    260, 270, 280, 291, 301, 311, 321, 331,
  ],
  [
    110, 120, 131, 142, 152, 162, 173, 183, 194, 204, 215, 225, 235, 247, 257,
    267, 278, 288, 299, 309, 320, 330, 340,
  ],
  [
    112, 123, 134, 145, 156, 166, 177, 188, 199, 210, 220, 231, 242, 253, 264,
    274, 285, 296, 307, 318, 328, 339, 349,
  ],
  [
    115, 126, 137, 148, 159, 170, 181, 192, 204, 215, 226, 237, 248, 259, 270,
    281, 292, 303, 315, 326, 337, 348, 359,
  ],
  [
    117, 128, 140, 152, 163, 174, 185, 197, 209, 220, 231, 243, 254, 266, 277,
    288, 300, 311, 323, 334, 345, 357, 368,
  ],
  [
    120, 131, 143, 155, 167, 178, 190, 201, 214, 225, 237, 248, 260, 272, 284,
    295, 307, 318, 331, 342, 354, 365, 377,
  ],
  [
    122, 134, 146, 158, 170, 182, 194, 206, 219, 230, 242, 254, 266, 279, 290,
    302, 314, 326, 339, 351, 362, 374, 386,
  ],
  [
    125, 137, 149, 162, 174, 186, 198, 210, 223, 236, 248, 260, 272, 285, 297,
    309, 322, 334, 347, 359, 371, 383, 395,
  ],
  [
    127, 139, 152, 165, 178, 190, 203, 215, 228, 241, 253, 266, 278, 291, 304,
    316, 329, 341, 355, 367, 380, 392, 404,
  ],
  [
    129, 142, 155, 169, 181, 194, 207, 220, 233, 246, 259, 272, 284, 298, 311,
    323, 336, 349, 363, 375, 388, 401, 414,
  ],
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
      id: 10,
      name: "TABLIER PVC 50",
      category: "VOLET",
      dimensions: `${selectedWidth} X ${selectedLength}`,
      color: selectedColor,
      image: "/images/prod-3.png",
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
              src="/images/prod-3.png"
              alt="Product Image"
            />
          </div>
          <div className="col-md-6 col-12 right">
            <h1 className="main-head">
              <span className="sub-heading">Personnalisez votre</span> <br />
              <div class="spaced-text">
                <span>T A B L I E R</span>
                <span>P V C</span>
                <span>5 0</span>
              </div>
            </h1>

            <div className="dimensions">
              <h2 className="sub-head">DIMENSIONS</h2>
              <div className="row dim-cont">
                <div className="col-6 sel-inp dimension-back-1">
                  <label className="labels">
                    <span className="labels-head">Largeur</span>
                    <br />
                    Min (800mm) & Max (3000mm)
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
                    Min (800mm) & Max (3500mm)
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
