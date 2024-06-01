import React, { useState } from "react";

// Length and Width arrays
const lengths = [
  0.8, 0.197, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2,
  2.3, 2.4, 2.5, 2.6,
];
const widths = [0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];

// Price matrix
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

// Motors array
const motors = [
  {
    name: "Moteur Filaire (commande via interrupteur)",
    imagePath: "/images/mot-1.png",
  },
  { name: "Moteur Télécommandé", imagePath: "/images/mot-2.png" },
];

const cableTypes = [
  { name: "Haut droit", imagePath: "/images/edge-1.png" },
  { name: "Haut arrière droit", imagePath: "/images/edge-2.png" },
  { name: "Bas arrière droit", imagePath: "/images/edge-3.png" },
  { name: "Haut gauche", imagePath: "/images/edge-4.png" },
  { name: "Haut arrière gauche", imagePath: "/images/edge-5.png" },
  { name: "Bas arrière gauche", imagePath: "/images/edge-6.png" },
];

const PriceCalculator = () => {
  const [selectedLength, setSelectedLength] = useState(lengths[0]);
  const [selectedWidth, setSelectedWidth] = useState(widths[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedMotor, setSelectedMotor] = useState(null);
  const [selectedInterrupteur, setSelectedInterrupteur] = useState(null);
  const [selectedCableType, setSelectedCableType] = useState("");
  const [price, setPrice] = useState(prices[0][0]);

  const handleLengthChange = (e) => {
    const newLength = parseFloat(e.target.value);
    setSelectedLength(newLength);
    updatePrice(newLength, selectedWidth, selectedColor, selectedMotor);
  };

  const handleWidthChange = (e) => {
    const newWidth = parseFloat(e.target.value);
    setSelectedWidth(newWidth);
    updatePrice(selectedLength, newWidth, selectedColor, selectedMotor);
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    updatePrice(selectedLength, selectedWidth, newColor, selectedMotor);
  };

  const handleMotorChange = (e) => {
    const newMotorName = e.target.value;
    const newMotor = motors.find((motor) => motor.name === newMotorName);
    setSelectedMotor(newMotor);
    updatePrice(selectedLength, selectedWidth, selectedColor, newMotor);
  };

  const handleInterrupteurChange = (e) => {
    const selectedValue = parseInt(e.target.value);
    setSelectedInterrupteur(selectedValue);
  };

  const handleCableTypeChange = (e) => {
    const cableType = e.target.value;
    setSelectedCableType(cableType);
  };

  const updatePrice = (length, width, color, motor) => {
    const lengthIndex = lengths.indexOf(length);
    const widthIndex = widths.indexOf(width);
    if (lengthIndex !== -1 && widthIndex !== -1) {
      let basePrice = prices[lengthIndex][widthIndex];
      if (colors.indexOf(color) > 1) {
        basePrice += basePrice * 0.12;
      }
      if (motor) {
        const area = length * width * 3;
        if (motor.name === "Moteur Filaire (commande via interrupteur)") {
          basePrice += area < 15 ? 10 : 21;
        } else if (motor.name === "Moteur Télécommandé") {
          basePrice += area < 15 ? 21 : 81;
        }
      }
      setPrice(basePrice);
    }
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
              Personnalisez votre <br /> EXEMPLE DE LA PLATEFORME
            </h1>

            <div className="dimensions">
              <h2 className="sub-head">DIMENSIONS</h2>
              <div className="row dim-cont">
                <div className="col-6 sel-inp">
                  <label className="labels">
                    <span className="labels-head">Largeur</span>
                    <br />
                    max (3500mm)
                  </label>
                  <select
                    className="field__input"
                    value={selectedLength}
                    onChange={handleLengthChange}
                  >
                    {lengths.map((length) => (
                      <option key={length} value={length}>
                        {length}
                      </option>
                    ))}
                  </select>
                  <p>
                    Mesurez la largeur entre murs en 3 points et gardez la plus
                    petite
                  </p>
                </div>
                <div className="col-6 sel-inp">
                  <label className="labels">
                    <span className="labels-head">Hauteur</span>
                    <br />
                    max (3500mm)
                  </label>
                  <select
                    className="field__input"
                    value={selectedWidth}
                    onChange={handleWidthChange}
                  >
                    {widths.map((width) => (
                      <option key={width} value={width}>
                        {width}
                      </option>
                    ))}
                  </select>
                  <p>
                    Mesurez la hauteur entre murs en 3 points et gardez la plus
                    petite
                  </p>
                </div>
              </div>
            </div>

            <hr class="custom" />

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

            <hr class="custom" />

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

            <hr class="custom" />

            <div className="interrupteurs">
              <h1 className="sub-head">INTERRUPTEURS</h1>
              <div className="interrupteur-container">
                <label
                  className={`radio-img-option ${
                    selectedInterrupteur === 1 ? "interrupteur-selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value={1}
                    className="radio-img-radio"
                    checked={selectedInterrupteur === 1}
                    onChange={handleInterrupteurChange}
                  />
                  <div className="radio-img-square">
                    <img
                      src="/images/inter-1.png"
                      className="radio-img-image"
                      alt="Interrupteur 1"
                    />
                    <span className="radio-img-text">
                      Interrupteur Apparent
                    </span>
                  </div>
                </label>
                <label
                  className={`radio-img-option ${
                    selectedInterrupteur === 2 ? "interrupteur-selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value={2}
                    className="radio-img-radio"
                    checked={selectedInterrupteur === 2}
                    onChange={handleInterrupteurChange}
                  />
                  <div className="radio-img-square">
                    <img
                      src="/images/inter-2.png"
                      className="radio-img-image"
                      alt="Interrupteur 2"
                    />
                    <span className="radio-img-text">
                      Interrupteur Encastré
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <hr class="custom" />

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

            <hr class="custom" />

            <div className="total">
              <h2 className="tot-text">
                ${price.toFixed(2)}
                <span>€</span>
              </h2>
            </div>

            <div className="cart-button">
              <button className="cart-btn">Ajouter au panier</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceCalculator;
