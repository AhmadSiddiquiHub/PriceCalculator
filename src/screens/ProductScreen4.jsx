import React, { useEffect, useState } from "react";

// Length and Width arrays
const widths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500, 3600, 3700,
];
const lengths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300,
];

const prices = [
  [
    575, 597, 620, 646, 668, 691, 713, 735, 762, 784, 807, 829, 851, 878, 900,
    923, 945, 967, 994, 1016, 1038, 1061, 1083, 1110, 1132, 1154, 1177, 1199,
    1226, 1248, 1270, 1293, 1315, 1341, 1364, 1386,
  ],
  [
    593, 616, 640, 667, 691, 714, 737, 761, 788, 811, 835, 858, 881, 909, 932,
    955, 979, 1002, 1030, 1053, 1076, 1100, 1123, 1150, 1174, 1197, 1220, 1244,
    1271, 1294, 1318, 1341, 1364, 1392, 1415, 1438,
  ],
  [
    611, 636, 660, 688, 713, 737, 761, 786, 814, 838, 863, 887, 911, 940, 964,
    988, 1013, 1037, 1065, 1090, 1114, 1138, 1162, 1191, 1215, 1239, 1264, 1288,
    1316, 1341, 1365, 1389, 1414, 1442, 1466, 1491,
  ],
  [
    630, 655, 680, 710, 735, 760, 785, 811, 840, 865, 891, 916, 941, 970, 996,
    1021, 1046, 1072, 1101, 1126, 1151, 1177, 1202, 1231, 1257, 1282, 1307,
    1332, 1362, 1387, 1412, 1438, 1463, 1492, 1518, 1543,
  ],
  [
    648, 674, 701, 731, 757, 783, 810, 836, 866, 893, 919, 945, 971, 1002, 1028,
    1054, 1080, 1107, 1137, 1163, 1189, 1216, 1242, 1272, 1298, 1325, 1351,
    1377, 1408, 1434, 1460, 1486, 1513, 1543, 1569, 1595,
  ],
  [
    666, 694, 721, 752, 779, 806, 834, 861, 892, 919, 947, 974, 1001, 1032,
    1060, 1087, 1114, 1141, 1173, 1200, 1227, 1254, 1281, 1313, 1340, 1367,
    1394, 1422, 1453, 1480, 1507, 1535, 1562, 1593, 1620, 1648,
  ],
  [
    684, 713, 741, 773, 801, 829, 858, 886, 918, 946, 974, 1003, 1031, 1063,
    1091, 1119, 1148, 1176, 1208, 1236, 1264, 1293, 1321, 1353, 1381, 1410,
    1438, 1466, 1498, 1526, 1555, 1583, 1611, 1643, 1671, 1700,
  ],
  [
    703, 732, 761, 794, 824, 853, 882, 911, 944, 973, 1003, 1032, 1061, 1094,
    1123, 1153, 1182, 1211, 1244, 1273, 1302, 1332, 1361, 1394, 1423, 1452,
    1481, 1511, 1544, 1573, 1602, 1631, 1661, 1694, 1723, 1752,
  ],
  [
    721, 751, 781, 816, 846, 876, 906, 936, 970, 1000, 1031, 1061, 1091, 1125,
    1155, 1185, 1215, 1246, 1280, 1310, 1340, 1370, 1400, 1435, 1465, 1495,
    1525, 1555, 1589, 1619, 1650, 1680, 1710, 1744, 1774, 1804,
  ],
  [
    739, 770, 801, 837, 868, 899, 930, 961, 996, 1027, 1058, 1090, 1121, 1156,
    1187, 1218, 1249, 1280, 1316, 1347, 1378, 1409, 1440, 1475, 1506, 1537,
    1568, 1600, 1635, 1666, 1697, 1728, 1759, 1794, 1825, 1857,
  ],
  [
    758, 790, 822, 858, 890, 922, 954, 986, 1023, 1055, 1087, 1119, 1151, 1187,
    1219, 1251, 1283, 1315, 1352, 1384, 1416, 1448, 1480, 1516, 1548, 1580,
    1612, 1644, 1680, 1713, 1745, 1777, 1809, 1845, 1877, 1909,
  ],
  [
    776, 809, 842, 879, 912, 945, 978, 1011, 1049, 1082, 1115, 1148, 1181, 1218,
    1251, 1284, 1317, 1350, 1387, 1420, 1453, 1486, 1519, 1557, 1590, 1623,
    1656, 1689, 1726, 1759, 1792, 1825, 1858, 1895, 1928, 1961,
  ],
  [
    794, 828, 862, 900, 934, 968, 1002, 1036, 1074, 1108, 1142, 1176, 1210,
    1249, 1283, 1317, 1351, 1385, 1423, 1457, 1491, 1525, 1559, 1597, 1631,
    1665, 1699, 1733, 1771, 1805, 1839, 1873, 1907, 1945, 1979, 2013,
  ],
  [
    812, 847, 882, 922, 957, 992, 1026, 1061, 1101, 1136, 1171, 1206, 1241,
    1280, 1315, 1350, 1385, 1420, 1459, 1494, 1529, 1564, 1599, 1638, 1673,
    1708, 1743, 1778, 1817, 1852, 1887, 1922, 1957, 1996, 2031, 2066,
  ],
  [
    831, 867, 903, 943, 979, 1015, 1051, 1086, 1127, 1163, 1198, 1234, 1270,
    1310, 1346, 1382, 1418, 1454, 1494, 1530, 1566, 1602, 1638, 1678, 1714,
    1750, 1786, 1822, 1862, 1898, 1934, 1970, 2006, 2046, 2082, 2118,
  ],
  [
    849, 886, 923, 964, 1001, 1038, 1075, 1111, 1153, 1189, 1226, 1263, 1300,
    1341, 1378, 1415, 1452, 1489, 1530, 1567, 1604, 1641, 1678, 1719, 1756,
    1793, 1830, 1867, 1908, 1945, 1981, 2018, 2055, 2096, 2133, 2170,
  ],
  [
    867, 905, 943, 985, 1023, 1061, 1099, 1137, 1179, 1217, 1255, 1293, 1330,
    1372, 1410, 1448, 1486, 1524, 1566, 1604, 1642, 1680, 1718, 1760, 1798,
    1835, 1873, 1911, 1953, 1991, 2029, 2067, 2105, 2147, 2185, 2223,
  ],
  [
    893, 934, 975, 1020, 1061, 1102, 1143, 1183, 1228, 1269, 1310, 1351, 1392,
    1437, 1478, 1518, 1559, 1600, 1645, 1686, 1727, 1768, 1809, 1854, 1894,
    1935, 1976, 2017, 2062, 2103, 2144, 2184, 2225, 2270, 2311, 2352,
  ],
  [
    912, 953, 995, 1041, 1083, 1125, 1167, 1208, 1254, 1296, 1338, 1380, 1422,
    1468, 1509, 1551, 1593, 1635, 1681, 1723, 1765, 1806, 1848, 1894, 1936,
    1978, 2020, 2061, 2107, 2149, 2191, 2233, 2275, 2321, 2362, 2404,
  ],
  [
    930, 973, 1016, 1063, 1105, 1148, 1191, 1234, 1281, 1323, 1366, 1409, 1452,
    1499, 1542, 1584, 1627, 1670, 1717, 1760, 1802, 1845, 1888, 1935, 1978,
    2021, 2063, 2106, 2153, 2196, 2239, 2281, 2324, 2371, 2414, 2457,
  ],
  [
    948, 992, 1036, 1084, 1127, 1171, 1215, 1259, 1307, 1350, 1394, 1438, 1482,
    1530, 1573, 1617, 1661, 1705, 1753, 1796, 1840, 1884, 1928, 1976, 2019,
    2063, 2107, 2151, 2198, 2242, 2286, 2330, 2373, 2421, 2465, 2509,
  ],
  [
    966, 1011, 1056, 1105, 1150, 1194, 1239, 1284, 1333, 1377, 1422, 1467, 1512,
    1560, 1605, 1650, 1695, 1739, 1788, 1833, 1878, 1922, 1967, 2016, 2061,
    2106, 2150, 2195, 2244, 2289, 2333, 2378, 2423, 2472, 2516, 2561,
  ],
  [
    985, 1031, 1076, 1126, 1172, 1218, 1263, 1309, 1359, 1405, 1450, 1496, 1542,
    1592, 1637, 1683, 1729, 1774, 1824, 1870, 1916, 1961, 2007, 2057, 2103,
    2148, 2194, 2240, 2290, 2335, 2381, 2427, 2472, 2522, 2568, 2614,
  ],
  [
    1003, 1050, 1096, 1147, 1194, 1240, 1287, 1334, 1385, 1431, 1478, 1525,
    1571, 1622, 1669, 1716, 1762, 1809, 1860, 1906, 1953, 2000, 2046, 2097,
    2144, 2191, 2237, 2284, 2335, 2381, 2428, 2475, 2521, 2572, 2619, 2666,
  ],
  [
    1021, 1069, 1116, 1168, 1216, 1264, 1311, 1359, 1411, 1458, 1506, 1554,
    1601, 1653, 1701, 1748, 1796, 1844, 1895, 1943, 1991, 2038, 2086, 2138,
    2185, 2233, 2281, 2328, 2380, 2428, 2475, 2523, 2571, 2623, 2670, 2718,
  ],
  [
    1040, 1088, 1137, 1190, 1238, 1287, 1336, 1384, 1437, 1486, 1534, 1583,
    1631, 1684, 1733, 1781, 1830, 1879, 1931, 1980, 2029, 2077, 2126, 2179,
    2227, 2276, 2325, 2373, 2426, 2475, 2523, 2572, 2620, 2673, 2722, 2770,
  ],
  [
    1058, 1107, 1157, 1211, 1260, 1310, 1360, 1409, 1463, 1512, 1562, 1612,
    1661, 1715, 1765, 1814, 1864, 1913, 1967, 2017, 2066, 2116, 2165, 2219,
    2269, 2318, 2368, 2418, 2471, 2521, 2570, 2620, 2670, 2723, 2773, 2823,
  ],
  [
    1076, 1127, 1177, 1232, 1282, 1333, 1384, 1434, 1489, 1539, 1590, 1641,
    1691, 1746, 1796, 1847, 1898, 1948, 2003, 2053, 2104, 2154, 2205, 2260,
    2310, 2361, 2411, 2462, 2517, 2567, 2618, 2668, 2719, 2774, 2824, 2875,
  ],
  [
    1094, 1146, 1197, 1253, 1305, 1356, 1408, 1459, 1515, 1566, 1618, 1670,
    1721, 1777, 1828, 1880, 1931, 1983, 2039, 2090, 2142, 2193, 2245, 2300,
    2352, 2403, 2455, 2507, 2562, 2614, 2665, 2717, 2768, 2824, 2876, 2927,
  ],
  [
    1113, 1165, 1218, 1274, 1327, 1379, 1432, 1484, 1541, 1593, 1646, 1698,
    1751, 1808, 1860, 1913, 1965, 2018, 2074, 2127, 2179, 2232, 2284, 2341,
    2393, 2446, 2498, 2551, 2608, 2660, 2713, 2765, 2818, 2874, 2927, 2979,
  ],
];

// Define a color map object
const colorMap = {
  Blanc: "#ffffff",
  "Maron Jamaique": "#5b5454",
};

// Colors array
const colors = ["Blanc", "Maron Jamaique"];

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

const ProductScreen4 = () => {
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

    if (lengthIndex !== -1 && widthIndex !== -1) {
      let basePrice = prices[lengthIndex][widthIndex];

      // Adjust base price based on color
      if (colors.indexOf(color) > 1) {
        basePrice += basePrice * 0.12;
      }

      const lengthInMeters = length / 1000;
      const widthInMeters = width / 1000;
      const area = lengthInMeters * widthInMeters * 5;

      // Add motor price
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
              Personnalisez votre <br /> VOLET MINI INDUS ALU 55
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
                    value={selectedLength}
                    min={Math.min(...lengths)}
                    max={Math.max(...lengths)}
                    step="0.1"
                    onChange={handleLengthChange}
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
                    value={selectedWidth}
                    min={Math.min(...widths)}
                    max={Math.max(...widths)}
                    step="0.1"
                    onChange={handleWidthChange}
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

export default ProductScreen4;
