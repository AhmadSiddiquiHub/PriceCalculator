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
  2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
  3400, 3500, 3600, 3700, 3800,
];

const prices = [
  [
    111, 121, 131, 142, 152, 162, 173, 183, 194, 204, 214, 224, 234, 245, 255,
    265, 275, 285, 296, 306, 316, 326, 337, 347, 358, 368, 378, 388, 399, 409,
    419,
  ],
  [
    120, 131, 142, 154, 165, 176, 187, 198, 210, 221, 233, 244, 255, 267, 278,
    289, 300, 311, 323, 334, 346, 357, 368, 380, 391, 402, 413, 424, 436, 447,
    458,
  ],
  [
    128, 140, 153, 166, 178, 190, 202, 214, 227, 239, 251, 264, 276, 289, 301,
    313, 325, 337, 350, 363, 375, 387, 399, 412, 424, 436, 448, 461, 474, 486,
    498,
  ],
  [
    137, 150, 163, 177, 190, 204, 217, 230, 244, 257, 270, 284, 297, 311, 324,
    337, 350, 364, 377, 391, 404, 417, 430, 444, 457, 471, 484, 497, 511, 524,
    537,
  ],
  [
    145, 160, 174, 189, 203, 217, 232, 246, 261, 275, 289, 303, 318, 333, 347,
    361, 375, 390, 405, 419, 433, 447, 461, 476, 491, 505, 519, 533, 548, 563,
    577,
  ],
  [
    150, 164, 179, 195, 209, 224, 239, 254, 269, 284, 299, 313, 328, 344, 358,
    373, 388, 403, 418, 433, 448, 462, 477, 493, 507, 522, 537, 552, 567, 582,
    597,
  ],
  [
    158, 174, 190, 206, 222, 238, 254, 269, 286, 302, 318, 333, 349, 366, 381,
    397, 413, 429, 445, 461, 477, 493, 508, 525, 541, 556, 572, 588, 605, 620,
    636,
  ],
  [
    167, 184, 200, 218, 235, 252, 268, 285, 303, 320, 336, 353, 370, 388, 404,
    421, 438, 455, 472, 489, 506, 523, 540, 557, 574, 591, 608, 624, 642, 659,
    676,
  ],
  [
    175, 193, 211, 230, 248, 265, 283, 301, 320, 337, 355, 373, 391, 410, 427,
    445, 463, 481, 499, 517, 535, 553, 571, 589, 607, 625, 643, 661, 679, 697,
    715,
  ],
  [
    184, 203, 222, 241, 260, 279, 298, 317, 336, 355, 374, 393, 412, 432, 450,
    469, 488, 507, 527, 545, 564, 583, 602, 622, 641, 659, 678, 697, 717, 736,
    754,
  ],
  [
    193, 213, 232, 253, 273, 293, 313, 333, 353, 373, 393, 413, 433, 454, 473,
    493, 513, 533, 554, 574, 594, 613, 633, 654, 674, 694, 714, 734, 754, 774,
    794,
  ],
  [
    201, 222, 243, 265, 286, 307, 327, 348, 370, 391, 412, 433, 454, 475, 496,
    517, 538, 559, 581, 602, 623, 644, 665, 686, 707, 728, 749, 770, 792, 813,
    833,
  ],
  [
    210, 232, 254, 276, 298, 320, 342, 364, 387, 409, 431, 453, 475, 497, 519,
    541, 563, 585, 608, 630, 652, 674, 696, 718, 740, 762, 784, 806, 829, 851,
    873,
  ],
  [
    218, 241, 264, 288, 311, 334, 357, 380, 404, 427, 450, 473, 496, 519, 542,
    565, 588, 611, 635, 658, 681, 704, 727, 751, 774, 797, 820, 843, 866, 889,
    912,
  ],
  [
    227, 251, 275, 300, 324, 348, 372, 396, 421, 445, 469, 493, 517, 541, 565,
    589, 613, 637, 662, 686, 710, 734, 758, 783, 807, 831, 855, 879, 904, 928,
    952,
  ],
  [
    236, 261, 286, 311, 336, 361, 387, 412, 437, 462, 487, 512, 538, 563, 588,
    613, 638, 664, 689, 714, 739, 764, 789, 815, 840, 865, 890, 915, 941, 966,
    991,
  ],
  [
    244, 270, 296, 323, 349, 375, 401, 427, 454, 480, 506, 532, 558, 585, 611,
    637, 664, 690, 716, 743, 769, 795, 821, 848, 874, 900, 926, 952, 979, 1005,
    1031,
  ],
  [
    253, 280, 307, 335, 362, 389, 416, 443, 471, 498, 525, 552, 579, 607, 634,
    661, 689, 716, 744, 771, 798, 825, 852, 880, 907, 934, 961, 988, 1016, 1043,
    1070,
  ],
  [
    257, 285, 312, 341, 368, 396, 423, 451, 479, 507, 535, 562, 590, 618, 646,
    673, 701, 729, 757, 785, 812, 840, 868, 896, 924, 951, 979, 1006, 1035,
    1062, 1090,
  ],
  [
    266, 294, 323, 352, 381, 410, 438, 467, 496, 525, 554, 582, 611, 640, 669,
    698, 726, 755, 784, 813, 842, 870, 899, 928, 957, 986, 1014, 1043, 1072,
    1101, 1129,
  ],
  [
    274, 304, 333, 364, 394, 423, 453, 483, 513, 543, 572, 602, 632, 662, 692,
    722, 751, 781, 811, 841, 871, 900, 930, 960, 990, 1020, 1050, 1079, 1110,
    1139, 1169,
  ],
  [
    283, 313, 344, 376, 406, 437, 468, 498, 530, 561, 591, 622, 653, 684, 715,
    746, 776, 807, 838, 869, 900, 931, 961, 993, 1023, 1054, 1085, 1116, 1147,
    1178, 1208,
  ],
  [
    291, 323, 355, 387, 419, 451, 482, 514, 547, 578, 610, 642, 674, 706, 738,
    770, 801, 833, 866, 897, 929, 961, 993, 1025, 1057, 1088, 1120, 1152, 1184,
    1216, 1248,
  ],
  [
    300, 333, 365, 399, 432, 464, 497, 530, 564, 596, 629, 662, 695, 728, 761,
    794, 826, 859, 893, 925, 958, 991, 1024, 1057, 1090, 1123, 1156, 1188, 1222,
    1255, 1287,
  ],
  [
    308, 342, 376, 411, 444, 478, 512, 546, 580, 614, 648, 682, 716, 750, 784,
    818, 851, 885, 920, 954, 987, 1021, 1055, 1090, 1123, 1157, 1191, 1225,
    1259, 1293, 1327,
  ],
  [
    317, 352, 387, 422, 457, 492, 527, 562, 597, 632, 667, 702, 736, 772, 807,
    842, 877, 911, 947, 982, 1017, 1051, 1086, 1122, 1157, 1191, 1226, 1261,
    1297, 1332, 1366,
  ],
  [
    326, 361, 397, 434, 470, 506, 542, 577, 614, 650, 686, 722, 757, 794, 830,
    866, 902, 937, 974, 1010, 1046, 1082, 1117, 1154, 1190, 1226, 1262, 1297,
    1334, 1370, 1406,
  ],
  [
    334, 371, 408, 446, 482, 519, 556, 593, 631, 668, 705, 741, 778, 816, 853,
    890, 927, 964, 1001, 1038, 1075, 1112, 1149, 1186, 1223, 1260, 1297, 1334,
    1372, 1408, 1445,
  ],
];

// Define a color map object
const colorMap = {
  Blanc: "#ffffff",
  "Maron Jamaique": "#5b5454",
  "Blanc Crème": "#dfd9c3",
  "Gris Anthracite": "#363b3b",
  Naturel: "#c0beba",
  "Gris Clair": "#a6a89b",
};

// Colors array
const colors = [
  "Blanc",
  "Maron Jamaique",
  "Blanc Crème",
  "Gris Anthracite",
  "Naturel",
  "Gris Clair",
];

const ProductScreen3 = ({ onAddToCart }) => {
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

  const handleAddToCart = () => {
    const product = {
      id: 11,
      name: "TABLIER ALU 52",
      category: "VOLET",
      dimensions: `${selectedLength} X ${selectedWidth}`,
      color: selectedColor,
      image: "/images/prod-2.png",
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
              src="/images/prod-2.png"
              alt="Product Image"
            />
          </div>
          <div className="col-md-6 col-12 right">
            <h1 className="main-head">
              Personnalisez votre <br /> TABLIER ALU 52
            </h1>

            <div className="dimensions">
              <h2 className="sub-head">DIMENSIONS</h2>
              <div className="row dim-cont">
                <div className="col-6 sel-inp">
                  <label className="labels">
                    <span className="labels-head">Largeur</span>
                    <br />
                    Min (800m) & Max (3800m)
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
                    Min (1200m) & Max (3500m)
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

            <div className="total" style={{ marginTop: "50px" }}>
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
