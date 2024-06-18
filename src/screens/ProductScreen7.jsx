import React, { useEffect, useState } from "react";

// Length and Width arrays
const lengths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500,
];
const widths = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300, 4400, 4500, 4600,
];

const prices = [
  [
    117, 128, 139, 150, 161, 171, 182, 192, 204, 214, 225, 235, 246, 257, 268,
    279, 289, 300, 311, 322, 332, 343, 354, 365, 375, 386, 397, 407, 419, 429,
    440, 450, 461, 472, 483, 494, 504, 515, 526,
  ],
  [
    127, 138, 150, 163, 174, 186, 198, 209, 222, 234, 245, 257, 269, 281, 293,
    305, 316, 328, 340, 352, 364, 376, 387, 400, 411, 423, 435, 447, 459, 471,
    482, 494, 506, 518, 530, 542, 553, 565, 578,
  ],
  [
    136, 149, 162, 175, 188, 201, 214, 226, 240, 253, 266, 278, 291, 305, 318,
    331, 343, 356, 370, 383, 395, 408, 421, 435, 447, 460, 473, 486, 499, 512,
    525, 538, 551, 564, 577, 590, 603, 615, 629,
  ],
  [
    141, 154, 167, 182, 195, 208, 222, 235, 249, 263, 276, 289, 303, 317, 330,
    344, 357, 370, 384, 398, 411, 424, 438, 452, 465, 479, 492, 505, 520, 533,
    546, 560, 573, 587, 601, 614, 627, 641, 655,
  ],
  [
    150, 164, 179, 194, 209, 223, 238, 252, 267, 282, 296, 311, 325, 341, 355,
    369, 384, 398, 414, 428, 443, 457, 472, 487, 501, 516, 530, 545, 560, 574,
    589, 603, 618, 633, 648, 662, 677, 691, 706,
  ],
  [
    159, 175, 190, 207, 222, 238, 254, 269, 286, 301, 317, 332, 348, 364, 380,
    395, 411, 427, 443, 459, 474, 490, 505, 522, 537, 553, 568, 584, 600, 616,
    632, 647, 663, 679, 695, 710, 726, 741, 758,
  ],
  [
    169, 185, 202, 219, 236, 253, 270, 286, 304, 320, 337, 354, 370, 388, 405,
    421, 438, 455, 472, 489, 506, 522, 539, 557, 573, 590, 607, 623, 641, 658,
    674, 691, 708, 725, 742, 758, 775, 792, 809,
  ],
  [
    178, 196, 213, 232, 250, 268, 285, 303, 322, 340, 358, 375, 393, 412, 430,
    447, 465, 483, 502, 519, 537, 555, 573, 591, 609, 627, 645, 663, 681, 699,
    717, 735, 752, 771, 789, 807, 824, 842, 861,
  ],
  [
    187, 206, 225, 245, 264, 283, 301, 320, 340, 359, 378, 397, 416, 435, 454,
    473, 492, 511, 531, 550, 569, 588, 607, 626, 645, 664, 683, 702, 722, 741,
    759, 778, 797, 817, 836, 855, 874, 893, 912,
  ],
  [
    192, 211, 231, 251, 271, 290, 309, 329, 349, 369, 388, 408, 427, 447, 467,
    486, 506, 525, 546, 565, 584, 604, 623, 644, 663, 683, 702, 722, 742, 761,
    781, 800, 820, 840, 859, 879, 898, 918, 938,
  ],
  [
    201, 222, 242, 264, 284, 305, 325, 346, 367, 388, 409, 429, 450, 471, 492,
    512, 533, 553, 575, 595, 616, 637, 657, 679, 699, 720, 740, 761, 782, 803,
    823, 844, 865, 886, 906, 927, 948, 968, 990,
  ],
  [
    210, 232, 254, 276, 298, 320, 341, 363, 386, 407, 429, 451, 472, 495, 517,
    538, 560, 582, 604, 626, 647, 669, 691, 713, 735, 757, 778, 800, 823, 844,
    866, 888, 909, 932, 954, 975, 997, 1019, 1041,
  ],
  [
    220, 243, 265, 289, 312, 335, 357, 380, 404, 427, 449, 472, 495, 519, 541,
    564, 587, 610, 633, 656, 679, 702, 725, 748, 771, 794, 817, 839, 863, 886,
    909, 931, 954, 978, 1001, 1023, 1046, 1069, 1093,
  ],
  [
    229, 253, 277, 302, 325, 349, 373, 397, 422, 446, 470, 494, 518, 542, 566,
    590, 614, 638, 663, 687, 710, 734, 758, 783, 807, 831, 855, 879, 903, 927,
    951, 975, 999, 1024, 1048, 1072, 1095, 1119, 1144,
  ],
  [
    234, 258, 283, 308, 332, 357, 381, 406, 431, 455, 480, 504, 529, 554, 579,
    603, 628, 652, 677, 702, 726, 751, 775, 800, 825, 849, 874, 898, 924, 948,
    973, 997, 1021, 1047, 1071, 1096, 1120, 1145, 1170,
  ],
  [
    243, 269, 294, 321, 346, 372, 397, 423, 449, 475, 500, 526, 552, 578, 603,
    629, 655, 680, 707, 732, 758, 783, 809, 835, 861, 886, 912, 938, 964, 990,
    1015, 1041, 1066, 1093, 1118, 1144, 1169, 1195, 1221,
  ],
  [
    252, 279, 306, 333, 360, 387, 413, 440, 467, 494, 521, 547, 574, 602, 628,
    655, 682, 708, 736, 763, 789, 816, 843, 870, 897, 924, 950, 977, 1004, 1031,
    1058, 1084, 1111, 1139, 1165, 1192, 1219, 1245, 1273,
  ],
  [
    262, 289, 317, 346, 374, 401, 429, 457, 486, 513, 541, 569, 597, 625, 653,
    681, 709, 737, 765, 793, 821, 849, 876, 905, 933, 961, 988, 1016, 1045,
    1073, 1100, 1128, 1156, 1185, 1212, 1240, 1268, 1296, 1324,
  ],
  [
    271, 300, 329, 358, 387, 416, 445, 474, 504, 533, 562, 590, 619, 649, 678,
    707, 736, 765, 794, 823, 852, 881, 910, 940, 969, 998, 1027, 1055, 1085,
    1114, 1143, 1172, 1201, 1231, 1259, 1288, 1317, 1346, 1376,
  ],
  [
    280, 310, 340, 371, 401, 431, 461, 491, 522, 552, 582, 612, 642, 673, 703,
    733, 763, 793, 824, 854, 884, 914, 944, 975, 1005, 1035, 1065, 1095, 1126,
    1156, 1186, 1216, 1246, 1276, 1307, 1337, 1367, 1397, 1427,
  ],
  [
    285, 315, 346, 377, 408, 439, 469, 500, 531, 562, 592, 623, 653, 685, 715,
    746, 776, 807, 838, 869, 900, 930, 961, 992, 1023, 1053, 1084, 1114, 1146,
    1176, 1207, 1237, 1268, 1299, 1330, 1361, 1391, 1422, 1453,
  ],
  [
    294, 326, 357, 390, 422, 453, 485, 517, 549, 581, 613, 644, 676, 708, 740,
    772, 804, 835, 868, 899, 931, 963, 994, 1027, 1059, 1090, 1122, 1154, 1186,
    1218, 1250, 1281, 1313, 1345, 1377, 1409, 1440, 1472, 1505,
  ],
  [
    303, 336, 369, 403, 435, 468, 501, 534, 567, 600, 633, 666, 699, 732, 765,
    798, 831, 863, 897, 930, 963, 995, 1028, 1062, 1095, 1127, 1160, 1193, 1227,
    1259, 1292, 1325, 1358, 1391, 1424, 1457, 1490, 1523, 1556,
  ],
  [
    313, 347, 381, 415, 449, 483, 517, 551, 586, 620, 653, 687, 721, 756, 790,
    824, 858, 892, 926, 960, 994, 1028, 1062, 1097, 1131, 1164, 1198, 1232,
    1267, 1301, 1335, 1369, 1403, 1437, 1471, 1505, 1539, 1573, 1608,
  ],
  [
    322, 357, 392, 428, 463, 498, 533, 568, 604, 639, 674, 709, 744, 780, 815,
    850, 885, 920, 956, 991, 1026, 1061, 1096, 1131, 1166, 1202, 1237, 1272,
    1307, 1342, 1377, 1412, 1447, 1483, 1518, 1553, 1588, 1623, 1659,
  ],
  [
    327, 362, 398, 434, 470, 505, 541, 576, 613, 648, 684, 720, 755, 792, 827,
    863, 898, 934, 970, 1006, 1041, 1077, 1113, 1149, 1184, 1220, 1256, 1291,
    1328, 1363, 1399, 1434, 1470, 1506, 1542, 1577, 1613, 1649, 1685,
  ],
  [
    336, 373, 409, 447, 484, 520, 557, 594, 631, 668, 704, 741, 778, 815, 852,
    889, 925, 962, 1000, 1036, 1073, 1110, 1146, 1184, 1220, 1257, 1294, 1330,
    1368, 1405, 1441, 1478, 1515, 1552, 1589, 1626, 1662, 1699, 1736,
  ],
  [
    345, 383, 421, 459, 497, 535, 573, 611, 649, 687, 725, 763, 800, 839, 877,
    915, 952, 990, 1029, 1067, 1104, 1142, 1180, 1219, 1256, 1294, 1332, 1370,
    1408, 1446, 1484, 1522, 1560, 1598, 1636, 1674, 1712, 1749, 1788,
  ],
];

// Define a color map object
const colorMap = {
  Blanc: "#ffffff",
  "Maron Jamaique": "#5b5454",
  "Blanc Crème": "#dfd9c3",
  "Gris Alu": "#c0beba",
  "Gris Anthracite": "#363b3b",
  "Gris Agathe 7038": "#a6a89b",
  Noir: "#000000",
};

// Colors array
const colors = [
  "Blanc",
  "Maron Jamaique",
  "Blanc Crème",
  "Gris Alu",
  "Gris Anthracite",
  "Gris Agathe 7038",
  "Noir",
];

const ProductScreen3 = () => {
  const [selectedLength, setSelectedLength] = useState(lengths[0]);
  const [selectedWidth, setSelectedWidth] = useState(widths[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [price, setPrice] = useState(null);

  const handleLengthChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setSelectedLength(value);
      const newLength = parseFloat(value);
      if (!isNaN(newLength)) {
        updatePrice(newLength, selectedWidth, selectedColor);
      }
    }
  };

  const handleWidthChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setSelectedWidth(value);
      const newWidth = parseFloat(value);
      if (!isNaN(newWidth)) {
        updatePrice(selectedLength, newWidth, selectedColor);
      }
    }
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
              Personnalisez votre <br /> TABLIER ALU 55
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
                    Min (800m) & Max (4600m)
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
