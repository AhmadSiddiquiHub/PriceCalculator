import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Length and Width arrays
const lengths = [
  197, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700,
];
const widths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900,
];

const prices = [
  [208, 219, 231, 242, 253, 264, 275, 287, 298, 309, 319],
  [205, 217, 228, 240, 251, 263, 274, 285, 298, 309, 320, 331],
  [214, 225, 237, 249, 261, 272, 284, 295, 308, 320, 331, 343],
  [222, 234, 245, 258, 270, 282, 294, 306, 319, 331, 342, 354],
  [230, 242, 255, 268, 280, 292, 304, 316, 330, 342, 354, 366],
  [239, 251, 263, 277, 289, 302, 314, 327, 340, 353, 365, 377],
  [247, 260, 272, 286, 299, 312, 324, 337, 351, 364, 376, 389],
  [255, 268, 281, 295, 308, 321, 334, 347, 362, 375, 388, 401],
  [264, 277, 290, 305, 318, 331, 344, 358, 372, 386, 399, 412],
  [272, 285, 299, 314, 327, 341, 355, 368, 383, 396, 410, 424],
  [280, 294, 308, 323, 337, 351, 365, 379, 394, 408, 421, 435],
  [289, 303, 317, 332, 346, 361, 375, 389, 404, 418, 433, 447],
  [297, 311, 326, 341, 356, 370, 385, 399, 415, 429, 444, 458],
  [305, 320, 335, 351, 366, 380, 395, 410, 426, 441, 455, 470],
  [314, 329, 344, 360, 375, 390, 405, 420, 436, 451, 467, 482],
  [322, 337, 352, 369, 384, 400, 415, 430, 447, 462, 478, 493],
  [330, 346, 362, 378, 394, 410, 425, 441, 458, 473, 489, 505],
  [338, 354, 370, 388, 403, 419, 435, 451, 468, 484, 500, 516],
  [347, 363, 379, 397, 413, 429, 445, 462, 479, 495, 512, 528],
  [355, 372, 388, 406, 423, 439, 456, 472, 490, 506, 523, 539],
];

// Define a color map object
const colorMap = {
  Blanc: "#ffffff",
};

// Colors array
const colors = ["Blanc"];

// Motors array
const motors = [
  {
    id: 1,
    name: "Moteur Filaire (commande via interrupteur)",
    imagePath: "/images/mot-1.png",
  },
  { id: 2, name: "Moteur Télécommandé", imagePath: "/images/mot-2.png" },
];

// Motors array
const interrupteurs_a = [
  {
    id: 1,
    name: "Interrupteur Apparent",
    imagePath: "/images/inter-1.png",
    price: 15, // Add the price property here
  },
  {
    id: 2,
    name: "Interrupteur Encastré",
    imagePath: "/images/inter-2.png",
    price: 15,
  },
];

const interrupteurs_b = [
  {
    id: 1,
    name: "Télécommande One",
    imagePath: "/images/inter-b-1.png",
    price: 40,
  },
  {
    id: 2,
    name: "Télécommande Multi 16 canaux",
    imagePath: "/images/inter-b-1.png",
    price: 115,
  },
  {
    id: 3,
    name: "Télécommande Multi timer 16 canaux",
    imagePath: "/images/inter-b-1.png",
    price: 230,
  },
  {
    id: 4,
    name: "Télécommande mini",
    imagePath: "/images/inter-b-2.png",
    price: 70,
  },
];

// Interrupteurs arrays for each motor type
const interrupteurs = [interrupteurs_a, interrupteurs_b];

const cableTypes = [
  { name: "Haut droit", imagePath: "/images/edge-1.png" },
  { name: "Haut arrière droit", imagePath: "/images/edge-2.png" },
  { name: "Bas arrière droit", imagePath: "/images/edge-3.png" },
  { name: "Haut gauche", imagePath: "/images/edge-4.png" },
  { name: "Haut arrière gauche", imagePath: "/images/edge-5.png" },
  { name: "Bas arrière gauche", imagePath: "/images/edge-6.png" },
];

const ProductScreen3 = ({ onAddToCart }) => {
  const [selectedLength, setSelectedLength] = useState(lengths[0]);
  const [selectedWidth, setSelectedWidth] = useState(widths[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedMotor, setSelectedMotor] = useState(motors[0]);
  const [selectedInterrupteur, setSelectedInterrupteur] = useState(null);
  const [selectedInter, setSelectedInter] = useState(null);
  const [selectedCableType, setSelectedCableType] = useState(
    cableTypes[0].name
  );
  const [price, setPrice] = useState(null);

  const handleLengthChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setSelectedLength(value);
      const newLength = parseFloat(value);
      if (!isNaN(newLength)) {
        updatePrice(
          newLength,
          selectedWidth,
          selectedColor,
          selectedMotor,
          selectedInterrupteur
        );
      }
    }
  };

  const handleWidthChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setSelectedWidth(value);
      const newWidth = parseFloat(value);
      if (!isNaN(newWidth)) {
        updatePrice(
          selectedLength,
          newWidth,
          selectedColor,
          selectedMotor,
          selectedInterrupteur
        );
      }
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    updatePrice(
      selectedLength,
      selectedWidth,
      newColor,
      selectedMotor,
      selectedInterrupteur
    );
  };

  const handleMotorChange = (e) => {
    const newMotorName = e.target.value;
    const newMotor = motors.find((motor) => motor.name === newMotorName);
    setSelectedMotor(newMotor);
    setSelectedInterrupteur(null); // Reset interrupteur only when motor changes
    updatePrice(selectedLength, selectedWidth, selectedColor, newMotor, null);
  };

  const handleInterrupteurChange = (e) => {
    const selectedValue = parseInt(e.target.value);
    setSelectedInterrupteur(selectedValue);
    updatePrice(
      selectedLength,
      selectedWidth,
      selectedColor,
      selectedMotor,
      selectedValue
    );
  };

  const handleCableTypeChange = (e) => {
    const cableType = e.target.value;
    setSelectedCableType(cableType);
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

  const updatePrice = (length, width, color, motor, interrupteur) => {
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

      const lengthInMeters = length / 1000;
      const widthInMeters = width / 1000;
      const area = lengthInMeters * widthInMeters * 3;

      // Add motor price
      if (motor) {
        if (motor.name === "Moteur Filaire (commande via interrupteur)") {
          if (area > 0 && area <= 15) basePrice += 119;
          else if (area > 15 && area <= 30) basePrice += 139;
          else if (area > 30 && area <= 50) basePrice += 159;
          else if (area > 50 && area <= 80) basePrice += 284;
          else if (area > 80 && area <= 100) basePrice += 318;
          else basePrice += 360;
        } else if (motor.name === "Moteur Télécommandé") {
          if (area > 0 && area <= 15) basePrice += 159;
          else if (area > 15 && area <= 30) basePrice += 179;
          else if (area > 30 && area <= 50) basePrice += 199;
          else if (area > 50 && area <= 80) basePrice += 285;
          else if (area > 80 && area <= 100) basePrice += 300;
          else basePrice += 315;
        }
      }

      // Add interrupteur price if selected
      if (interrupteur) {
        const inter = interrupteurs[motor.id - 1];
        const interPrice = inter[interrupteur - 1].price;
        setSelectedInter(inter[interrupteur - 1].name);
        basePrice += interPrice;
      }

      setPrice(basePrice);
    } else {
      setPrice(null);
    }
  };

  useEffect(() => {
    updatePrice(
      selectedLength,
      selectedWidth,
      selectedColor,
      selectedMotor,
      selectedInterrupteur
    );
  }, [
    selectedLength,
    selectedWidth,
    selectedColor,
    selectedMotor,
    selectedInterrupteur,
  ]);

  const handleAddToCart = () => {
    const product = {
      id: 3,
      name: "VOLET MINI CAISSON PVC 37",
      category: "VOLET",
      dimensions: `${selectedLength} X ${selectedWidth}`,
      color: selectedColor,
      motor: selectedMotor,
      interrupteur: selectedInter,
      cable: selectedCableType,
      image: "/images/prod-img.png",
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
              src="/images/prod-img.png"
              alt="Product Image"
            />
          </div>
          <div className="col-md-6 col-12 right">
            <h1 className="main-head">
              <span className="sub-heading">Personnalisez votre</span> <br />
              VOLET MINI CAISSON PVC 37
            </h1>

            <div className="dimensions">
              <h2 className="sub-head">DIMENSIONS</h2>
              <div className="row dim-cont">
                <div className="col-6 sel-inp dimension-back-1">
                  <label className="labels">
                    <span className="labels-head">Largeur</span>
                    <br />
                    Min (800m) & Max (1900m)
                  </label>
                  <input
                    type="number"
                    className="field__input dimension-inp-left"
                    value={selectedWidth}
                    min={Math.min(...widths)}
                    max={Math.max(...widths)}
                    step="0.1"
                    onChange={handleWidthChange}
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
                    Min (197m) & Max (2700m)
                  </label>
                  <input
                    type="number"
                    className="field__input dimension-inp-right"
                    value={selectedLength}
                    min={Math.min(...lengths)}
                    max={Math.max(...lengths)}
                    step="0.1"
                    onChange={handleLengthChange}
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

            {/* <hr className="custom" /> */}

            <div className="motors">
              <h1 className="sub-head">MOTEURS</h1>
              <div className="motor-container">
                {motors.map((motor) => (
                  <label
                    className={`radio-img-option ${
                      selectedMotor && selectedMotor.name === motor.name
                        ? "motor-selected"
                        : ""
                    }`}
                    key={motor.name}
                  >
                    <input
                      type="radio"
                      value={motor.name}
                      checked={
                        selectedMotor && selectedMotor.name === motor.name
                      }
                      onChange={handleMotorChange}
                      className="radio-img-radio"
                    />
                    <div className="radio-img-square">
                      <img
                        src={motor.imagePath}
                        alt={`Image for ${motor.name}`}
                        className="radio-img-image"
                      />
                      <span className="radio-img-text">{motor.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {selectedMotor && (
              <>
                {/* <hr className="custom" /> */}
                <div className="interrupteurs">
                  <h1 className="sub-head">INTERRUPTEURS</h1>
                  <div className="interrupteur-container">
                    {interrupteurs[selectedMotor.id - 1].map((interrupteur) => (
                      <label
                        className={`radio-img-option ${
                          selectedInterrupteur === interrupteur.id
                            ? "interrupteur-selected"
                            : ""
                        }`}
                        key={interrupteur.id}
                      >
                        <input
                          type="radio"
                          value={interrupteur.id}
                          checked={selectedInterrupteur === interrupteur.id}
                          onChange={handleInterrupteurChange}
                          className="radio-img-radio"
                        />
                        <div className="radio-img-square">
                          <img
                            src={interrupteur.imagePath}
                            className="radio-img-image"
                            alt={`Interrupteur ${interrupteur.id}`}
                          />
                          <span className="radio-img-text">
                            {interrupteur.name}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* <hr className="custom" /> */}

            <div className="cables">
              <h1 className="sub-head">SORITE DE CABLE</h1>
              <div className="cables-container">
                {cableTypes.map((cableType, index) => (
                  <div className="cable-wrapper" key={index}>
                    <input
                      className="radio_opt"
                      type="radio"
                      value={cableType.name}
                      id={`cable-${index}`}
                      checked={selectedCableType === cableType.name}
                      onChange={handleCableTypeChange}
                      required
                    />
                    <label className="cable" htmlFor={`cable-${index}`}>
                      <img
                        src={cableType.imagePath}
                        alt={`Cable ${index + 1}`}
                      />
                    </label>
                    <div className="cable-label">{cableType.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* <hr className="custom" /> */}

            <div className="total">
              <h2 className="tot-text">
                {price !== null
                  ? `$${price.toFixed(2)}€`
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
