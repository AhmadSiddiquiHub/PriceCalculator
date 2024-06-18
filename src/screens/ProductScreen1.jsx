import React, { useEffect, useState } from "react";

// Length and Width arrays
const widths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500,
];
const lengths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500,
];

const prices = [
  [
    222, 236, 250, 265, 279, 293, 306, 320, 335, 349, 363, 377, 391, 406, 419,
    433, 447, 461, 476, 490, 504, 518, 531, 546, 560, 574, 588, 602,
  ],
  [
    234, 248, 263, 278, 293, 307, 322, 336, 352, 367, 381, 396, 410, 426, 440,
    455, 469, 484, 499, 514, 528, 543, 557, 573, 588, 602, 617, 631,
  ],
  [
    245, 260, 276, 292, 307, 322, 337, 353, 369, 384, 399, 414, 429, 446, 461,
    476, 491, 506, 523, 538, 553, 568, 583, 600, 615, 630, 645, 660,
  ],
  [
    257, 272, 288, 305, 321, 337, 353, 368, 386, 401, 417, 433, 449, 466, 482,
    497, 513, 529, 546, 562, 578, 593, 609, 626, 642, 658, 674, 690,
  ],
  [
    268, 285, 301, 319, 335, 352, 368, 385, 402, 419, 435, 452, 468, 486, 502,
    519, 535, 552, 570, 586, 603, 619, 635, 653, 670, 686, 703, 719,
  ],
  [
    280, 297, 314, 332, 349, 367, 384, 401, 419, 436, 453, 471, 488, 506, 523,
    540, 557, 574, 593, 610, 627, 644, 661, 680, 697, 714, 731, 748,
  ],
  [
    291, 309, 327, 346, 363, 381, 399, 417, 436, 454, 471, 489, 507, 526, 544,
    561, 579, 597, 616, 634, 652, 669, 687, 706, 724, 742, 759, 777,
  ],
  [
    303, 321, 340, 359, 378, 396, 415, 433, 453, 471, 490, 508, 527, 546, 565,
    583, 601, 620, 640, 658, 676, 695, 713, 733, 751, 770, 788, 807,
  ],
  [
    314, 333, 352, 373, 392, 411, 430, 449, 469, 488, 508, 527, 546, 566, 585,
    604, 623, 642, 663, 682, 701, 720, 739, 759, 779, 798, 817, 836,
  ],
  [
    326, 345, 365, 386, 406, 426, 445, 465, 486, 506, 526, 545, 565, 586, 606,
    626, 645, 665, 686, 706, 726, 745, 765, 786, 806, 826, 845, 865,
  ],
  [
    337, 358, 378, 400, 420, 441, 461, 481, 503, 523, 544, 564, 585, 606, 627,
    647, 668, 688, 710, 730, 750, 771, 791, 813, 833, 854, 874, 895,
  ],
  [
    349, 370, 391, 413, 434, 455, 476, 497, 520, 541, 562, 583, 604, 626, 647,
    668, 689, 711, 733, 754, 775, 796, 817, 839, 860, 882, 903, 924,
  ],
  [
    372, 395, 417, 441, 464, 486, 509, 531, 555, 577, 600, 623, 645, 669, 691,
    714, 736, 759, 783, 805, 828, 850, 873, 897, 919, 942, 964, 987,
  ],
  [
    384, 407, 430, 455, 478, 501, 524, 547, 572, 595, 618, 641, 665, 689, 712,
    735, 759, 782, 806, 829, 853, 876, 899, 923, 947, 970, 993, 1016,
  ],
  [
    395, 419, 443, 468, 492, 516, 540, 563, 588, 612, 636, 660, 684, 709, 733,
    757, 781, 804, 829, 853, 877, 901, 925, 950, 974, 998, 1022, 1045,
  ],
  [
    407, 431, 456, 481, 506, 530, 555, 579, 605, 630, 654, 679, 703, 729, 753,
    778, 803, 827, 853, 877, 902, 926, 951, 977, 1001, 1026, 1050, 1075,
  ],
  [
    418, 443, 469, 495, 520, 545, 570, 596, 622, 647, 672, 698, 723, 749, 774,
    799, 825, 850, 876, 901, 927, 952, 977, 1003, 1028, 1054, 1079, 1104,
  ],
  [
    443, 469, 496, 524, 550, 577, 603, 630, 658, 684, 711, 737, 764, 792, 818,
    845, 871, 898, 926, 952, 979, 1005, 1032, 1060, 1086, 1113, 1139, 1166,
  ],
  [
    454, 481, 508, 537, 564, 591, 619, 646, 674, 701, 729, 756, 783, 812, 839,
    866, 893, 920, 949, 976, 1003, 1031, 1058, 1086, 1113, 1141, 1168, 1195,
  ],
  [
    466, 493, 521, 550, 578, 606, 634, 662, 691, 719, 747, 775, 803, 832, 860,
    887, 915, 943, 972, 1000, 1028, 1056, 1084, 1113, 1141, 1169, 1197, 1224,
  ],
  [
    477, 506, 534, 564, 592, 621, 650, 678, 708, 736, 765, 793, 822, 852, 880,
    909, 937, 966, 996, 1024, 1053, 1081, 1110, 1140, 1168, 1197, 1225, 1254,
  ],
  [
    488, 518, 547, 577, 606, 636, 665, 694, 724, 754, 783, 812, 841, 872, 901,
    930, 959, 988, 1019, 1048, 1077, 1106, 1136, 1166, 1195, 1224, 1254, 1283,
  ],
  [
    500, 530, 560, 591, 621, 651, 680, 710, 741, 771, 801, 831, 861, 892, 922,
    952, 981, 1011, 1042, 1072, 1102, 1132, 1162, 1193, 1223, 1253, 1282, 1312,
  ],
  [
    512, 542, 573, 604, 635, 665, 696, 726, 758, 789, 819, 850, 880, 912, 942,
    973, 1003, 1034, 1066, 1096, 1127, 1157, 1188, 1219, 1250, 1280, 1311, 1341,
  ],
  [
    523, 554, 585, 618, 649, 680, 711, 742, 775, 806, 837, 868, 899, 932, 963,
    994, 1025, 1056, 1089, 1120, 1151, 1182, 1214, 1246, 1277, 1308, 1339, 1371,
  ],
  [
    535, 566, 598, 631, 663, 695, 727, 759, 792, 824, 855, 887, 919, 952, 984,
    1016, 1048, 1079, 1112, 1144, 1176, 1208, 1240, 1273, 1305, 1336, 1368,
    1400,
  ],
  [
    546, 579, 611, 645, 677, 710, 742, 775, 808, 841, 873, 906, 938, 972, 1004,
    1037, 1069, 1102, 1136, 1168, 1201, 1233, 1266, 1299, 1332, 1364, 1397,
    1429,
  ],
  [
    557, 591, 624, 658, 691, 724, 757, 791, 825, 858, 891, 924, 958, 992, 1025,
    1058, 1091, 1125, 1159, 1192, 1225, 1258, 1291, 1326, 1359, 1392, 1425,
    1458,
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

const ProductScreen1 = () => {
  const [selectedLength, setSelectedLength] = useState(lengths[0]);
  const [selectedWidth, setSelectedWidth] = useState(widths[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedMotor, setSelectedMotor] = useState(motors[0]);
  const [selectedInterrupteur, setSelectedInterrupteur] = useState(null);
  const [selectedCableType, setSelectedCableType] = useState(
    cableTypes[0].name
  );
  const [price, setPrice] = useState(null);

  // const handleLengthChange = (e) => {
  //   const newLength = parseFloat(e.target.value);
  //   if (!isNaN(newLength)) {
  //     setSelectedLength(newLength);
  //     updatePrice(
  //       newLength,
  //       selectedWidth,
  //       selectedColor,
  //       selectedMotor,
  //       selectedInterrupteur
  //     );
  //   }
  // };

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

  // const handleWidthChange = (e) => {
  //   const newWidth = parseFloat(e.target.value);
  //   if (!isNaN(newWidth)) {
  //     setSelectedWidth(newWidth);
  //     updatePrice(
  //       selectedLength,
  //       newWidth,
  //       selectedColor,
  //       selectedMotor,
  //       selectedInterrupteur
  //     );
  //   }
  // };

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

    if (lengthIndex !== -1 && widthIndex !== -1) {
      let basePrice = prices[lengthIndex][widthIndex];

      // Adjust base price based on color
      if (colors.indexOf(color) > 1) {
        basePrice += basePrice * 0.12;
      }

      const lengthInMeters = length / 1000;
      const widthInMeters = width / 1000;
      const area = lengthInMeters * widthInMeters * 3;

      // Add motor price
      // if (motor) {
      //   if (motor.name === "Moteur Filaire (commande via interrupteur)") {
      //     basePrice += area < 15 ? 10 : 21;
      //   } else if (motor.name === "Moteur Télécommandé") {
      //     basePrice += area < 15 ? 21 : 81;
      //   }
      // }
      if (motor) {
        if (motor.name === "Moteur Filaire (commande via interrupteur)") {
          if (area > 0 && area <= 29) basePrice += 119;
          else if (area >= 30 && area <= 49) basePrice += 139;
          else if (area >= 50 && area <= 70) basePrice += 159;
          else if (area <= 80 && area <= 99) basePrice += 284;
          else if (area <= 100 && area <= 119) basePrice += 318;
          else basePrice += 360;
        } else if (motor.name === "Moteur Télécommandé") {
          if (area > 0 && area <= 29) basePrice += 159;
          else if (area >= 30 && area <= 49) basePrice += 179;
          else if (area >= 50 && area <= 70) basePrice += 199;
          else if (area <= 80 && area <= 99) basePrice += 285;
          else if (area <= 100 && area <= 119) basePrice += 300;
          else basePrice += 315;
        }
      }

      // Add interrupteur price if selected
      if (interrupteur) {
        const inter = interrupteurs[motor.id - 1];
        const interPrice = inter[interrupteur - 1].price;
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
              Personnalisez votre <br /> VOLET MINI CAISSON ALU 42
            </h1>

            <div className="dimensions">
              <h2 className="sub-head">DIMENSIONS</h2>
              <div className="row dim-cont">
                <div className="col-6 sel-inp">
                  <label className="labels">
                    <span className="labels-head">Largeur</span>
                    <br />
                    Min (800m) & Max (3500m)
                  </label>
                  <input
                    type="number"
                    className="field__input"
                    value={selectedWidth}
                    min={Math.min(...widths)}
                    max={Math.max(...widths)}
                    step="0.1"
                    onChange={handleWidthChange}
                  />
                  <p>
                    Mesurez la largeur entre murs en 3 points et gardez la plus
                    petite
                  </p>
                </div>
                <div className="col-6 sel-inp">
                  <label className="labels">
                    <span className="labels-head">Hauteur</span>
                    <br />
                    Min (800m) & Max (3500m)
                  </label>
                  <input
                    type="number"
                    className="field__input"
                    value={selectedLength}
                    min={Math.min(...lengths)}
                    max={Math.max(...lengths)}
                    step="0.1"
                    onChange={handleLengthChange}
                  />
                  <p>
                    Mesurez la hauteur entre murs en 3 points et gardez la plus
                    petite
                  </p>
                </div>
              </div>
            </div>

            <hr className="custom" />

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

            <hr className="custom" />

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
                <hr className="custom" />
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

            <hr className="custom" />

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

            <hr className="custom" />

            <div className="total">
              <h2 className="tot-text">
                {price !== null
                  ? `$${price.toFixed(2)}€`
                  : "Price not available"}
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

export default ProductScreen1;
