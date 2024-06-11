import React, { useEffect, useState } from "react";

// Length and Width arrays
const widths = [
  1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400,
  2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700,
];
const lengths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300, 4400, 4500, 4600,
];

const prices = [
  [
    237, 260, 282, 306, 329, 351, 374, 397, 420, 443, 466, 489, 511, 535, 558,
    580, 603, 626, 649, 672, 695, 718, 740, 764, 787, 809, 832, 855, 878, 901,
    924, 947, 969, 993, 1016, 1038, 1061, 1084, 1107,
  ],
  [
    249, 273, 297, 322, 346, 370, 394, 418, 442, 466, 490, 514, 538, 563, 587,
    611, 634, 658, 683, 707, 731, 755, 779, 803, 827, 851, 875, 899, 924, 948,
    972, 996, 1020, 1044, 1068, 1092, 1116, 1140, 1165,
  ],
  [
    274, 300, 327, 354, 380, 406, 433, 459, 486, 512, 539, 565, 591, 618, 644,
    671, 697, 723, 750, 777, 803, 829, 856, 883, 909, 935, 961, 988, 1015, 1041,
    1067, 1094, 1120, 1147, 1173, 1200, 1226, 1252, 1279,
  ],
  [
    287, 314, 342, 370, 397, 425, 452, 480, 508, 535, 563, 590, 618, 646, 673,
    701, 728, 756, 784, 812, 839, 866, 894, 922, 950, 977, 1005, 1032, 1060,
    1088, 1115, 1143, 1170, 1198, 1226, 1253, 1281, 1308, 1336,
  ],
  [
    299, 328, 356, 386, 414, 443, 472, 500, 530, 558, 587, 616, 644, 674, 702,
    731, 760, 788, 818, 846, 875, 904, 932, 962, 990, 1019, 1048, 1076, 1106,
    1134, 1163, 1192, 1220, 1250, 1278, 1307, 1336, 1364, 1394,
  ],
  [
    324, 355, 386, 418, 449, 480, 511, 542, 573, 604, 635, 666, 697, 729, 760,
    791, 822, 853, 885, 916, 947, 978, 1009, 1041, 1072, 1103, 1134, 1165, 1197,
    1228, 1259, 1290, 1321, 1352, 1383, 1414, 1445, 1476, 1508,
  ],
  [
    336, 368, 401, 434, 466, 498, 530, 562, 595, 628, 660, 692, 724, 757, 789,
    821, 854, 886, 919, 951, 983, 1015, 1047, 1080, 1113, 1145, 1177, 1209,
    1242, 1274, 1307, 1339, 1371, 1404, 1436, 1468, 1500, 1533, 1566,
  ],
  [
    349, 382, 415, 450, 483, 516, 550, 583, 617, 651, 684, 717, 751, 785, 818,
    852, 885, 918, 952, 986, 1019, 1052, 1086, 1120, 1153, 1187, 1220, 1253,
    1288, 1321, 1354, 1388, 1421, 1455, 1489, 1522, 1555, 1589, 1623,
  ],
  [
    361, 396, 430, 466, 500, 535, 569, 604, 639, 674, 708, 743, 777, 813, 847,
    882, 916, 951, 986, 1021, 1055, 1090, 1124, 1160, 1194, 1229, 1263, 1298,
    1333, 1368, 1402, 1437, 1471, 1507, 1541, 1576, 1610, 1645, 1680,
  ],
  [
    386, 423, 460, 497, 534, 571, 608, 645, 683, 720, 757, 794, 830, 868, 905,
    942, 979, 1016, 1053, 1090, 1127, 1164, 1201, 1239, 1276, 1312, 1349, 1386,
    1424, 1461, 1498, 1535, 1572, 1609, 1646, 1683, 1720, 1757, 1795,
  ],
  [
    398, 437, 475, 513, 552, 590, 628, 666, 705, 743, 781, 819, 857, 896, 934,
    972, 1010, 1048, 1087, 1125, 1163, 1201, 1239, 1278, 1316, 1354, 1393, 1431,
    1469, 1508, 1546, 1584, 1622, 1661, 1699, 1737, 1775, 1813, 1852,
  ],
  [
    411, 450, 489, 529, 569, 608, 647, 686, 727, 766, 805, 844, 884, 924, 963,
    1002, 1041, 1081, 1121, 1160, 1199, 1239, 1278, 1318, 1357, 1396, 1436,
    1475, 1515, 1554, 1593, 1633, 1672, 1712, 1751, 1791, 1830, 1869, 1909,
  ],
  [
    436, 477, 519, 561, 603, 645, 686, 728, 770, 812, 853, 895, 937, 979, 1021,
    1062, 1104, 1146, 1188, 1230, 1271, 1313, 1355, 1397, 1439, 1480, 1522,
    1563, 1606, 1647, 1689, 1731, 1772, 1815, 1856, 1898, 1940, 1981, 2024,
  ],
  [
    448, 491, 534, 577, 620, 663, 706, 749, 792, 835, 878, 921, 963, 1007, 1050,
    1093, 1135, 1178, 1222, 1265, 1307, 1350, 1393, 1437, 1479, 1522, 1565,
    1608, 1651, 1694, 1737, 1780, 1823, 1866, 1909, 1952, 1995, 2037, 2081,
  ],
  [
    461, 505, 549, 593, 637, 681, 725, 769, 814, 858, 902, 946, 990, 1035, 1079,
    1123, 1167, 1211, 1255, 1299, 1343, 1387, 1431, 1476, 1520, 1564, 1608,
    1652, 1697, 1741, 1785, 1829, 1873, 1917, 1961, 2005, 2049, 2093, 2138,
  ],
  [
    485, 532, 578, 625, 672, 718, 764, 811, 858, 904, 950, 997, 1043, 1090,
    1137, 1183, 1229, 1276, 1323, 1369, 1415, 1462, 1508, 1555, 1602, 1648,
    1694, 1741, 1788, 1834, 1880, 1927, 1973, 2020, 2067, 2113, 2159, 2206,
    2253,
  ],
  [
    498, 545, 593, 641, 689, 736, 784, 831, 880, 927, 975, 1022, 1070, 1118,
    1165, 1213, 1261, 1308, 1356, 1404, 1451, 1499, 1546, 1595, 1642, 1690,
    1737, 1785, 1833, 1881, 1928, 1976, 2023, 2072, 2119, 2167, 2214, 2262,
    2310,
  ],
  [
    510, 559, 608, 657, 706, 755, 803, 852, 901, 950, 999, 1048, 1096, 1146,
    1194, 1243, 1292, 1341, 1390, 1439, 1487, 1536, 1585, 1634, 1683, 1732,
    1780, 1829, 1879, 1927, 1976, 2025, 2073, 2123, 2172, 2220, 2269, 2318,
    2367,
  ],
  [
    523, 573, 622, 673, 723, 773, 823, 873, 923, 973, 1023, 1073, 1123, 1173,
    1223, 1273, 1323, 1373, 1424, 1474, 1523, 1573, 1623, 1674, 1724, 1774,
    1824, 1873, 1924, 1974, 2024, 2074, 2124, 2174, 2224, 2274, 2324, 2374,
    2424,
  ],
  [
    548, 600, 652, 705, 757, 810, 862, 914, 967, 1019, 1072, 1124, 1176, 1229,
    1281, 1334, 1386, 1438, 1491, 1543, 1596, 1648, 1700, 1753, 1805, 1858,
    1910, 1962, 2015, 2067, 2120, 2172, 2224, 2277, 2329, 2382, 2434, 2486,
    2539,
  ],
  [
    560, 613, 667, 721, 774, 828, 881, 935, 989, 1042, 1096, 1149, 1203, 1257,
    1310, 1364, 1417, 1470, 1525, 1578, 1632, 1685, 1738, 1793, 1846, 1899,
    1953, 2006, 2060, 2114, 2167, 2221, 2274, 2328, 2382, 2435, 2489, 2542,
    2596,
  ],
  [
    572, 627, 682, 737, 792, 846, 901, 955, 1011, 1065, 1120, 1175, 1229, 1285,
    1339, 1394, 1448, 1503, 1558, 1613, 1668, 1722, 1777, 1832, 1887, 1941,
    1996, 2051, 2106, 2161, 2215, 2270, 2324, 2380, 2434, 2489, 2544, 2598,
    2654,
  ],
  [
    597, 654, 711, 769, 826, 883, 940, 997, 1054, 1111, 1168, 1225, 1282, 1340,
    1397, 1454, 1511, 1568, 1626, 1683, 1740, 1797, 1854, 1911, 1968, 2025,
    2082, 2139, 2197, 2254, 2311, 2368, 2425, 2482, 2539, 2596, 2653, 2710,
    2768,
  ],
  [
    610, 668, 726, 785, 843, 901, 959, 1017, 1076, 1134, 1193, 1251, 1309, 1368,
    1426, 1484, 1542, 1600, 1659, 1717, 1776, 1834, 1892, 1951, 2009, 2067,
    2125, 2183, 2242, 2300, 2359, 2417, 2475, 2534, 2592, 2650, 2708, 2766,
    2825,
  ],
  [
    622, 681, 741, 801, 860, 919, 979, 1038, 1098, 1158, 1217, 1276, 1336, 1396,
    1455, 1514, 1574, 1633, 1693, 1752, 1812, 1871, 1930, 1990, 2050, 2109,
    2168, 2228, 2288, 2347, 2406, 2466, 2525, 2585, 2645, 2704, 2763, 2823,
    2883,
  ],
  [
    647, 709, 770, 833, 894, 956, 1018, 1079, 1142, 1204, 1265, 1327, 1389,
    1451, 1513, 1575, 1636, 1698, 1760, 1822, 1884, 1945, 2007, 2070, 2131,
    2193, 2255, 2316, 2379, 2440, 2502, 2564, 2625, 2688, 2750, 2811, 2873,
    2935, 2997,
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
};

// Colors array
const colors = [
  "Blanc",
  "Maron Jamaique",
  "Blanc Crème",
  "Beige Clair",
  "Naturel",
  "Gris Clair",
];

const ProductScreen3 = () => {
  const [selectedLength, setSelectedLength] = useState(lengths[0]);
  const [selectedWidth, setSelectedWidth] = useState(widths[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [price, setPrice] = useState(null);

  const handleLengthChange = (e) => {
    const newLength = parseFloat(e.target.value);
    if (!isNaN(newLength)) {
      setSelectedLength(newLength);
      updatePrice(
        newLength,
        selectedWidth,
        selectedColor,
        selectedMotor,
        selectedInterrupteur
      );
    }
  };

  const handleWidthChange = (e) => {
    const newWidth = parseFloat(e.target.value);
    if (!isNaN(newWidth)) {
      setSelectedWidth(newWidth);
      updatePrice(
        selectedLength,
        newWidth,
        selectedColor,
        selectedMotor,
        selectedInterrupteur
      );
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

    if (lengthIndex !== -1 && widthIndex !== -1) {
      let basePrice = prices[lengthIndex][widthIndex];

      // Adjust base price based on color
      if (colors.indexOf(color) > 1) {
        basePrice += basePrice * 0.12;
      }

      setPrice(basePrice);
    } else {
      setPrice(null);
    }
  };

  useEffect(() => {
    updatePrice(selectedLength, selectedWidth, selectedColor);
  }, [selectedLength, selectedWidth, selectedColor]);

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
              Personnalisez votre <br /> TABLIER ALU 77
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

            <div className="total" style={{ marginTop: "50px" }}>
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

export default ProductScreen3;
