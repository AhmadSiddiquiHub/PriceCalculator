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

// Colors array
const colors = [
  "Color1",
  "Color2",
  "Color3",
  "Color4",
  "Color5",
  "Color6",
  "Color7",
];

// Motors array
const motors = ["None", "A", "B"];

const PriceCalculator = () => {
  const [selectedLength, setSelectedLength] = useState(lengths[0]);
  const [selectedWidth, setSelectedWidth] = useState(widths[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedMotor, setSelectedMotor] = useState(motors[0]);
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
    const newMotor = e.target.value;
    setSelectedMotor(newMotor);
    updatePrice(selectedLength, selectedWidth, selectedColor, newMotor);
  };

  const updatePrice = (length, width, color, motor) => {
    const lengthIndex = lengths.indexOf(length);
    const widthIndex = widths.indexOf(width);
    if (lengthIndex !== -1 && widthIndex !== -1) {
      let basePrice = prices[lengthIndex][widthIndex];
      if (colors.indexOf(color) > 1) {
        basePrice += basePrice * 0.12;
      }
      const area = length * width * 3;
      if (motor === "A") {
        basePrice += area < 15 ? 10 : 21;
      } else if (motor === "B") {
        basePrice += area < 15 ? 21 : 81;
      }
      setPrice(basePrice);
    }
  };

  return (
    <div>
      <h1>Price Calculator</h1>
      <div>
        <label>
          Length (m):
          <select value={selectedLength} onChange={handleLengthChange}>
            {lengths.map((length) => (
              <option key={length} value={length}>
                {length}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Width (m):
          <select value={selectedWidth} onChange={handleWidthChange}>
            {widths.map((width) => (
              <option key={width} value={width}>
                {width}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Color:
          {colors.map((color) => (
            <label key={color}>
              <input
                type="radio"
                value={color}
                checked={selectedColor === color}
                onChange={handleColorChange}
              />
              {color}
            </label>
          ))}
        </label>
      </div>
      <div>
        <label>
          Motor:
          {motors.map((motor) => (
            <label key={motor}>
              <input
                type="radio"
                value={motor}
                checked={selectedMotor === motor}
                onChange={handleMotorChange}
              />
              {motor}
            </label>
          ))}
        </label>
      </div>
      <div>
        <h2>Total Price: ${price.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default PriceCalculator;
