import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Length and Width arrays
const lengths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200,
];
const widths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500,
];

const prices = [
  [
    97, 107, 117, 127, 137, 147, 157, 167, 178, 188, 198, 207, 217, 228, 238,
    248, 258, 268, 278, 288, 298, 308, 318, 329, 339, 348, 358, 368,
  ],
  [
    102, 112, 123, 134, 144, 155, 165, 176, 187, 198, 208, 219, 229, 240, 251,
    261, 272, 282, 293, 304, 314, 325, 335, 347, 357, 368, 378, 389,
  ],
  [
    107, 118, 129, 140, 152, 163, 174, 185, 197, 208, 219, 230, 241, 253, 264,
    275, 286, 297, 309, 320, 331, 342, 353, 365, 376, 387, 398, 409,
  ],
  [
    114, 126, 138, 150, 162, 174, 186, 198, 211, 223, 234, 246, 258, 271, 283,
    295, 307, 319, 331, 343, 355, 367, 379, 392, 404, 415, 427, 439,
  ],
  [
    119, 131, 144, 157, 169, 182, 194, 207, 220, 233, 245, 257, 270, 283, 296,
    308, 321, 333, 346, 359, 371, 384, 396, 410, 422, 435, 447, 460,
  ],
  [
    123, 136, 149, 163, 176, 189, 203, 216, 229, 242, 256, 269, 282, 296, 309,
    322, 335, 348, 362, 375, 388, 401, 414, 428, 441, 454, 467, 480,
  ],
  [
    131, 145, 158, 173, 187, 201, 215, 229, 244, 257, 271, 285, 299, 314, 328,
    342, 356, 370, 384, 398, 412, 426, 440, 455, 469, 483, 496, 510,
  ],
  [
    135, 150, 164, 180, 194, 209, 223, 238, 253, 267, 282, 296, 311, 326, 341,
    355, 370, 384, 399, 414, 428, 443, 457, 473, 487, 502, 516, 531,
  ],
  [
    143, 158, 173, 189, 205, 220, 236, 251, 267, 282, 298, 313, 328, 345, 360,
    375, 391, 406, 422, 438, 453, 468, 484, 500, 515, 530, 546, 561,
  ],
  [
    147, 163, 179, 196, 212, 228, 244, 260, 276, 292, 308, 324, 340, 357, 373,
    389, 405, 421, 437, 453, 469, 485, 501, 518, 534, 550, 565, 581,
  ],
  [
    152, 169, 185, 203, 219, 236, 252, 269, 286, 302, 319, 335, 352, 369, 386,
    402, 419, 435, 452, 469, 485, 502, 518, 536, 552, 569, 585, 602,
  ],
  [
    159, 177, 194, 212, 230, 247, 264, 282, 300, 317, 335, 352, 369, 388, 405,
    422, 440, 457, 475, 493, 510, 527, 545, 563, 580, 597, 615, 632,
  ],
  [
    164, 182, 200, 219, 237, 255, 273, 291, 309, 327, 345, 363, 381, 400, 418,
    436, 454, 472, 490, 508, 526, 544, 562, 581, 599, 617, 635, 652,
  ],
  [
    169, 188, 206, 225, 244, 262, 281, 299, 319, 337, 356, 374, 393, 412, 431,
    449, 468, 486, 505, 524, 542, 561, 579, 599, 617, 636, 654, 673,
  ],
  [
    176, 196, 215, 235, 255, 274, 293, 313, 333, 352, 372, 391, 410, 431, 450,
    469, 489, 508, 528, 548, 567, 586, 606, 626, 645, 665, 684, 703,
  ],
  [
    181, 201, 221, 242, 262, 282, 302, 322, 342, 362, 382, 402, 422, 443, 463,
    483, 503, 523, 543, 563, 583, 603, 623, 644, 664, 684, 704, 724,
  ],
  [
    188, 209, 230, 252, 272, 293, 314, 335, 356, 377, 398, 419, 440, 461, 482,
    503, 524, 544, 566, 587, 608, 628, 649, 671, 692, 712, 733, 754,
  ],
  [
    193, 215, 236, 258, 279, 301, 322, 344, 366, 387, 409, 430, 451, 473, 495,
    516, 538, 559, 581, 602, 624, 645, 667, 689, 710, 732, 753, 774,
  ],
  [
    198, 220, 242, 265, 287, 309, 330, 352, 375, 397, 419, 441, 463, 486, 508,
    530, 552, 574, 596, 618, 640, 662, 684, 707, 729, 751, 773, 795,
  ],
  [
    205, 228, 251, 274, 297, 320, 343, 366, 389, 412, 435, 458, 481, 504, 527,
    550, 573, 595, 619, 642, 665, 687, 710, 734, 757, 779, 802, 825,
  ],
  [
    210, 233, 257, 281, 304, 328, 351, 375, 399, 422, 445, 469, 492, 516, 540,
    563, 587, 610, 634, 657, 681, 704, 728, 752, 775, 799, 822, 845,
  ],
  [
    217, 242, 266, 291, 315, 339, 364, 388, 413, 437, 461, 486, 510, 535, 559,
    583, 608, 632, 657, 681, 705, 730, 754, 779, 803, 827, 852, 876,
  ],
  [
    222, 247, 272, 297, 322, 347, 372, 397, 422, 447, 472, 497, 521, 547, 572,
    597, 622, 646, 672, 697, 722, 746, 771, 797, 822, 846, 871, 896,
  ],
  [
    227, 252, 278, 304, 329, 355, 380, 405, 432, 457, 482, 508, 533, 559, 585,
    610, 636, 661, 687, 712, 738, 763, 789, 815, 840, 866, 891, 916,
  ],
  [
    234, 260, 287, 314, 340, 366, 392, 419, 446, 472, 498, 524, 551, 578, 604,
    630, 657, 683, 710, 736, 762, 789, 815, 842, 868, 894, 921, 947,
  ],
];

// Define a color map object
const colorMap = {
  Blanc: "#ffffff",
  "Maron Jamaique": "#5b5454",
  "Blanc Crème": "#dfd9c3",
  "Beige Clair": "#dfcdac",
  Naturel: "#c0beba",
  "Gris Clair": "#a6a89b",
  "Gris Basalte": "#6f7473",
  "Gris Quartz": "#857c71",
  "Gris Anthracite": "#363b3b",
  Noir: "#000000",
};

// Colors array
const colors = [
  "Blanc",
  "Maron Jamaique",
  "Blanc Crème",
  "Beige Clair",
  "Naturel",
  "Gris Clair",
  "Gris Basalte",
  "Gris Quartz",
  "Gris Anthracite",
  "Noir",
];

const ProductScreen6 = ({ onAddToCart }) => {
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
      id: 6,
      name: "TABLIER ALU 42",
      category: "VOLET",
      dimensions: `${selectedWidth} X ${selectedLength}`,
      color: selectedColor,
      image: "/images/prod-5.png",
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
              src="/images/prod-5.png"
              alt="Product Image"
            />
          </div>
          <div className="col-md-6 col-12 right">
            <h1 className="main-head">
              <span className="sub-heading">Personnalisez votre</span> <br />
              <div class="spaced-text">
                <span>T A B L I E R</span>
                <span>A L U</span>
                <span>4 2</span>
              </div>
            </h1>

            <div className="dimensions">
              <h2 className="sub-head">DIMENSIONS</h2>
              <div className="row dim-cont">
                <div className="col-6 sel-inp dimension-back-1">
                  <label className="labels">
                    <span className="labels-head">Largeur</span>
                    <br />
                    Min (800mm) & Max (3200mm)
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

export default ProductScreen6;
