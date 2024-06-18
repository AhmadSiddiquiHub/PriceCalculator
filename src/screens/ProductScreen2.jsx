import React, { useEffect, useState } from "react";

// Length and Width arrays
const widths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500, 3600, 3700, 3800, 3900, 4000,
];
const lengths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500, 3600, 3700, 3800, 3900, 4000,
];

const prices = [
  [
    343, 366, 389, 415, 438, 461, 484, 507, 534, 557, 580, 603, 626, 652, 675,
    698, 721, 744, 771, 794, 817, 840, 863, 889, 912, 935, 958, 981, 1007, 1031,
    1054, 1077, 1100,
  ],
  [
    357, 381, 405, 433, 457, 481, 505, 529, 557, 581, 605, 629, 653, 680, 705,
    729, 753, 777, 804, 829, 853, 877, 901, 928, 953, 977, 1001, 1025, 1052,
    1076, 1101, 1125, 1149,
  ],
  [
    371, 396, 422, 450, 475, 500, 526, 551, 579, 605, 630, 655, 680, 709, 734,
    759, 784, 810, 838, 863, 889, 914, 939, 967, 993, 1018, 1043, 1068, 1097,
    1122, 1147, 1173, 1198,
  ],
  [
    385, 411, 438, 467, 493, 520, 546, 573, 602, 628, 655, 681, 707, 737, 763,
    789, 816, 842, 872, 898, 924, 951, 977, 1006, 1033, 1059, 1085, 1112, 1141,
    1168, 1194, 1220, 1247,
  ],
  [
    399, 427, 454, 485, 512, 540, 567, 594, 625, 652, 680, 707, 735, 765, 793,
    820, 848, 875, 905, 933, 960, 988, 1015, 1046, 1073, 1101, 1128, 1155, 1186,
    1213, 1241, 1268, 1296,
  ],
  [
    413, 442, 470, 502, 530, 559, 587, 616, 648, 676, 705, 733, 762, 793, 822,
    850, 879, 907, 939, 968, 996, 1025, 1053, 1085, 1113, 1142, 1170, 1199,
    1230, 1259, 1287, 1316, 1345,
  ],
  [
    427, 457, 486, 519, 549, 578, 608, 638, 670, 700, 730, 759, 789, 821, 851,
    881, 910, 940, 973, 1002, 1032, 1061, 1091, 1124, 1153, 1183, 1213, 1242,
    1275, 1305, 1334, 1364, 1393,
  ],
  [
    441, 472, 503, 537, 567, 598, 629, 660, 693, 724, 755, 785, 816, 850, 881,
    911, 942, 973, 1006, 1037, 1068, 1099, 1129, 1163, 1194, 1224, 1255, 1286,
    1320, 1350, 1381, 1412, 1443,
  ],
  [
    455, 487, 519, 554, 586, 617, 649, 681, 716, 748, 780, 811, 843, 878, 910,
    942, 973, 1005, 1040, 1072, 1104, 1135, 1167, 1202, 1234, 1266, 1297, 1329,
    1364, 1396, 1428, 1460, 1491,
  ],
  [
    469, 502, 535, 571, 604, 637, 670, 703, 739, 771, 804, 837, 870, 906, 939,
    972, 1005, 1038, 1074, 1106, 1139, 1172, 1205, 1241, 1274, 1307, 1340, 1373,
    1409, 1441, 1474, 1507, 1540,
  ],
  [
    484, 518, 552, 589, 623, 657, 691, 725, 762, 796, 830, 864, 898, 934, 968,
    1002, 1036, 1070, 1107, 1141, 1175, 1209, 1243, 1280, 1314, 1348, 1382,
    1416, 1453, 1487, 1521, 1555, 1589,
  ],
  [
    498, 533, 568, 606, 641, 676, 711, 746, 784, 819, 854, 889, 925, 963, 998,
    1033, 1068, 1103, 1141, 1176, 1211, 1246, 1281, 1319, 1354, 1390, 1425,
    1460, 1498, 1533, 1568, 1603, 1638,
  ],
  [
    511, 548, 584, 623, 659, 695, 731, 768, 807, 843, 879, 915, 951, 991, 1027,
    1063, 1099, 1135, 1174, 1211, 1247, 1283, 1319, 1358, 1394, 1431, 1467,
    1503, 1542, 1578, 1614, 1651, 1687,
  ],
  [
    526, 563, 600, 640, 678, 715, 752, 789, 830, 867, 904, 941, 979, 1019, 1056,
    1093, 1131, 1168, 1208, 1246, 1283, 1320, 1357, 1398, 1435, 1472, 1509,
    1547, 1587, 1624, 1661, 1699, 1736,
  ],
  [
    540, 578, 616, 658, 696, 734, 773, 811, 852, 891, 929, 967, 1006, 1047,
    1085, 1124, 1162, 1200, 1242, 1280, 1319, 1357, 1395, 1437, 1475, 1513,
    1552, 1590, 1631, 1670, 1708, 1746, 1785,
  ],
  [
    554, 593, 632, 675, 714, 754, 793, 833, 875, 914, 954, 993, 1033, 1075,
    1115, 1154, 1194, 1233, 1275, 1315, 1354, 1394, 1433, 1476, 1515, 1554,
    1594, 1633, 1676, 1715, 1755, 1794, 1833,
  ],
  [
    568, 608, 649, 692, 733, 773, 814, 855, 898, 939, 979, 1020, 1060, 1104,
    1144, 1185, 1225, 1266, 1309, 1350, 1390, 1431, 1471, 1515, 1555, 1596,
    1636, 1677, 1721, 1761, 1802, 1842, 1883,
  ],
  [
    582, 623, 665, 710, 751, 793, 834, 876, 921, 962, 1004, 1046, 1087, 1132,
    1173, 1215, 1257, 1298, 1343, 1384, 1426, 1468, 1509, 1554, 1596, 1637,
    1679, 1720, 1765, 1807, 1848, 1890, 1931,
  ],
  [
    596, 638, 681, 727, 770, 812, 855, 898, 943, 986, 1029, 1072, 1114, 1160,
    1203, 1245, 1288, 1331, 1376, 1419, 1462, 1505, 1547, 1593, 1636, 1678,
    1721, 1764, 1809, 1852, 1895, 1938, 1980,
  ],
  [
    610, 654, 698, 744, 788, 832, 876, 920, 966, 1010, 1054, 1098, 1142, 1188,
    1232, 1276, 1320, 1363, 1410, 1454, 1498, 1542, 1585, 1632, 1676, 1720,
    1764, 1807, 1854, 1898, 1942, 1986, 2029,
  ],
  [
    624, 669, 714, 762, 807, 851, 896, 941, 989, 1034, 1079, 1124, 1169, 1216,
    1261, 1306, 1351, 1396, 1444, 1489, 1534, 1579, 1623, 1671, 1716, 1761,
    1806, 1851, 1899, 1944, 1988, 2033, 2078,
  ],
  [
    638, 684, 730, 779, 825, 871, 917, 963, 1012, 1058, 1104, 1150, 1196, 1245,
    1291, 1337, 1382, 1428, 1477, 1523, 1569, 1615, 1661, 1710, 1756, 1802,
    1848, 1894, 1943, 1989, 2035, 2081, 2127,
  ],
  [
    652, 699, 746, 796, 843, 891, 938, 985, 1035, 1082, 1129, 1176, 1223, 1273,
    1320, 1367, 1414, 1461, 1511, 1558, 1605, 1652, 1700, 1750, 1797, 1844,
    1891, 1938, 1988, 2035, 2082, 2129, 2176,
  ],
  [
    666, 714, 763, 814, 862, 910, 958, 1006, 1057, 1106, 1154, 1202, 1250, 1301,
    1349, 1397, 1446, 1494, 1545, 1593, 1641, 1689, 1737, 1789, 1837, 1885,
    1933, 1981, 2032, 2080, 2129, 2177, 2225,
  ],
  [
    680, 729, 779, 831, 880, 929, 979, 1028, 1080, 1129, 1179, 1228, 1277, 1329,
    1378, 1428, 1477, 1526, 1578, 1628, 1677, 1726, 1775, 1828, 1877, 1926,
    1975, 2025, 2077, 2126, 2175, 2225, 2274,
  ],
];

// Define a color map object
const colorMap = {
  Blanc: "#ffffff",
  "Maron Jamaique": "#5b5454",
  "Gris Anthracite": "#363b3b",
};

// Colors array
const colors = ["Blanc", "Maron Jamaique", "Gris Anthracite"];

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

const ProductScreen2 = () => {
  const [selectedLength, setSelectedLength] = useState(lengths[0]);
  const [selectedWidth, setSelectedWidth] = useState(widths[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedMotor, setSelectedMotor] = useState(motors[0]);
  const [selectedInterrupteur, setSelectedInterrupteur] = useState(null);
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
      prices[widthIndex][lengthIndex] !== undefined
    ) {
      let basePrice = prices[widthIndex][lengthIndex];

      // Adjust base price based on color
      if (colors.indexOf(color) > 1) {
        basePrice += basePrice * 0.12;
      }

      const lengthInMeters = length / 1000;
      const widthInMeters = width / 1000;
      const area = lengthInMeters * widthInMeters * 3.5;

      // Add motor price
      if (motor) {
        if (motor.name === "Moteur Filaire (commande via interrupteur)") {
          if (area > 0 && area <= 29) basePrice += 119;
          else if (area > 29 && area <= 49) basePrice += 139;
          else if (area > 49 && area <= 79) basePrice += 159;
          else if (area > 79 && area <= 99) basePrice += 284;
          else if (area > 99 && area <= 119) basePrice += 318;
          else basePrice += 360;
        } else if (motor.name === "Moteur Télécommandé") {
          if (area > 0 && area <= 29) basePrice += 159;
          else if (area > 29 && area <= 49) basePrice += 179;
          else if (area > 49 && area <= 79) basePrice += 199;
          else if (area > 79 && area <= 99) basePrice += 285;
          else if (area > 99 && area <= 119) basePrice += 300;
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
              Personnalisez votre <br /> VOLET MINI INDUS ALU 52
            </h1>

            <div className="dimensions">
              <h2 className="sub-head">DIMENSIONS</h2>
              <div className="row dim-cont">
                <div className="col-6 sel-inp">
                  <label className="labels">
                    <span className="labels-head">Largeur</span>
                    <br />
                    Min (800m) & Max (4000m)
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
                    Min (800m) & Max (4000m)
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

export default ProductScreen2;
