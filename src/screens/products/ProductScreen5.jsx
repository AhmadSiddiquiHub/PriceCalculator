import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

// Length and Width arrays
const lengths = [
  1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400,
  2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600,
];
const widths = [
  1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000,
  3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300,
  4400, 4500, 4600, 4700, 4800, 4900, 5000,
];

const prices = [
  [
    1619, 1664, 1708, 1757, 1802, 1846, 1891, 1936, 1985, 2029, 2074, 2119,
    2163, 2212, 2257, 2302, 2346, 2391, 2440, 2485, 2529, 2574, 2618, 2667,
    2712, 2757, 2801, 2846, 2895, 2940, 2984, 3029, 3074,
  ],
  [
    1663, 1710, 1756, 1807, 1853, 1899, 1946, 1992, 2043, 2089, 2135, 2182,
    2228, 2279, 2325, 2371, 2418, 2464, 2515, 2561, 2607, 2654, 2700, 2751,
    2797, 2843, 2890, 2936, 2987, 3033, 3079, 3126, 3172,
  ],
  [
    1708, 1756, 1804, 1856, 1904, 1952, 2000, 2048, 2101, 2149, 2197, 2245,
    2293, 2345, 2393, 2441, 2489, 2537, 2589, 2637, 2685, 2733, 2781, 2834,
    2882, 2930, 2978, 3026, 3078, 3126, 3174, 3222, 3270,
  ],
  [
    1752, 1802, 1852, 1906, 1956, 2005, 2055, 2105, 2159, 2208, 2258, 2308,
    2357, 2412, 2461, 2511, 2561, 2610, 2664, 2714, 2764, 2813, 2863, 2917,
    2967, 3017, 3066, 3116, 3170, 3220, 3270, 3319, 3369,
  ],
  [
    1800, 1851, 1903, 1959, 2010, 2061, 2113, 2164, 2220, 2271, 2323, 2374,
    2425, 2481, 2533, 2584, 2635, 2687, 2742, 2794, 2845, 2897, 2948, 3004,
    3055, 3106, 3158, 3209, 3265, 3316, 3368, 3419, 3471,
  ],
  [
    1844, 1898, 1951, 2008, 2061, 2114, 2167, 2220, 2278, 2331, 2384, 2437,
    2490, 2547, 2601, 2654, 2707, 2760, 2817, 2870, 2923, 2976, 3029, 3087,
    3140, 3193, 3246, 3299, 3357, 3410, 3463, 3516, 3569,
  ],
  [
    1889, 1944, 1999, 2058, 2113, 2167, 2222, 2277, 2336, 2391, 2445, 2500,
    2555, 2614, 2669, 2724, 2778, 2833, 2892, 2947, 3002, 3056, 3111, 3170,
    3225, 3280, 3335, 3389, 3448, 3503, 3558, 3613, 3667,
  ],
  [
    1937, 1993, 2050, 2111, 2167, 2223, 2280, 2336, 2397, 2454, 2510, 2566,
    2623, 2684, 2740, 2797, 2853, 2909, 2970, 3027, 3083, 3140, 3196, 3257,
    3313, 3370, 3426, 3483, 3543, 3600, 3656, 3713, 3769,
  ],
  [
    1981, 2039, 2097, 2160, 2218, 2276, 2334, 2392, 2455, 2513, 2571, 2629,
    2687, 2750, 2808, 2866, 2924, 2982, 3045, 3103, 3161, 3219, 3277, 3340,
    3398, 3456, 3514, 3572, 3635, 3693, 3751, 3809, 3867,
  ],
  [
    2026, 2086, 2146, 2210, 2270, 2329, 2389, 2449, 2513, 2573, 2633, 2693,
    2752, 2817, 2876, 2936, 2996, 3056, 3120, 3180, 3240, 3299, 3359, 3423,
    3483, 3543, 3603, 3663, 3727, 3787, 3846, 3906, 3966,
  ],
  [
    2074, 2135, 2197, 2262, 2324, 2385, 2447, 2508, 2574, 2636, 2697, 2759,
    2820, 2886, 2948, 3009, 3071, 3132, 3198, 3260, 3321, 3382, 3444, 3510,
    3571, 3633, 3694, 3756, 3822, 3883, 3945, 4006, 4068,
  ],
  [
    2118, 2181, 2244, 2312, 2375, 2438, 2501, 2565, 2632, 2695, 2759, 2822,
    2885, 2952, 3016, 3079, 3142, 3205, 3273, 3336, 3399, 3462, 3525, 3593,
    3656, 3719, 3783, 3846, 3913, 3977, 4040, 4103, 4166,
  ],
  [
    2163, 2228, 2292, 2362, 2427, 2491, 2556, 2621, 2690, 2755, 2820, 2885,
    2950, 3019, 3084, 3149, 3214, 3279, 3348, 3413, 3478, 3542, 3607, 3677,
    3741, 3806, 3871, 3936, 4005, 4070, 4135, 4200, 4265,
  ],
  [
    2207, 2274, 2340, 2411, 2478, 2544, 2611, 2677, 2748, 2815, 2881, 2948,
    3014, 3085, 3152, 3218, 3285, 3352, 3423, 3489, 3556, 3622, 3689, 3760,
    3826, 3893, 3959, 4026, 4097, 4163, 4230, 4296, 4363,
  ],
  [
    2255, 2323, 2391, 2464, 2532, 2600, 2669, 2737, 2809, 2878, 2946, 3014,
    3082, 3155, 3223, 3291, 3360, 3428, 3501, 3569, 3637, 3705, 3773, 3846,
    3914, 3983, 4051, 4119, 4192, 4260, 4328, 4396, 4465,
  ],
  [
    2299, 2369, 2439, 2514, 2584, 2653, 2723, 2793, 2868, 2938, 3007, 3077,
    3147, 3222, 3292, 3361, 3431, 3501, 3576, 3646, 3715, 3785, 3855, 3930,
    4000, 4069, 4139, 4209, 4284, 4354, 4423, 4493, 4563,
  ],
  [
    2344, 2415, 2487, 2563, 2635, 2706, 2778, 2849, 2925, 2997, 3069, 3140,
    3212, 3288, 3360, 3431, 3503, 3574, 3650, 3722, 3794, 3865, 3937, 4013,
    4084, 4156, 4228, 4299, 4375, 4447, 4518, 4590, 4662,
  ],
  [
    2392, 2465, 2538, 2616, 2689, 2762, 2836, 2909, 2987, 3060, 3133, 3207,
    3280, 3358, 3431, 3504, 3577, 3651, 3728, 3802, 3875, 3948, 4022, 4099,
    4173, 4246, 4319, 4392, 4470, 4543, 4617, 4690, 4763,
  ],
  [
    2436, 2511, 2586, 2666, 2741, 2815, 2890, 2965, 3045, 3120, 3195, 3270,
    3345, 3424, 3499, 3574, 3649, 3724, 3803, 3878, 3953, 4028, 4103, 4183,
    4258, 4333, 4408, 4483, 4562, 4637, 4712, 4787, 4862,
  ],
  [
    2995, 3075, 3154, 3237, 3316, 3395, 3474, 3553, 3637, 3716, 3795, 3874,
    3953, 4037, 4116, 4195, 4274, 4353, 4437, 4516, 4595, 4674, 4753, 4836,
    4915, 4994, 5074, 5153, 5236, 5315, 5394, 5473, 5552,
  ],
  [
    3043, 3124, 3205, 3290, 3371, 3451, 3532, 3613, 3698, 3779, 3860, 3940,
    4021, 4106, 4187, 4268, 4349, 4429, 4515, 4595, 4676, 4757, 4838, 4923,
    5004, 5084, 5165, 5246, 5331, 5412, 5493, 5573, 5654,
  ],
  [
    3088, 3170, 3253, 3340, 3422, 3505, 3587, 3669, 3756, 3839, 3921, 4004,
    4086, 4173, 4255, 4338, 4420, 4503, 4590, 4672, 4754, 4837, 4919, 5006,
    5089, 5171, 5254, 5336, 5423, 5505, 5588, 5670, 5753,
  ],
  [
    3132, 3216, 3301, 3389, 3473, 3557, 3641, 3726, 3814, 3898, 3982, 4067,
    4151, 4239, 4323, 4408, 4492, 4576, 4664, 4748, 4833, 4917, 5001, 5089,
    5174, 5258, 5342, 5426, 5514, 5599, 5683, 5767, 5851,
  ],
  [
    3177, 3262, 3348, 3439, 3524, 3610, 3696, 3782, 3872, 3958, 4044, 4130,
    4215, 4306, 4391, 4477, 4563, 4649, 4739, 4825, 4911, 4997, 5082, 5173,
    5258, 5344, 5430, 5516, 5606, 5692, 5778, 5864, 5949,
  ],
  [
    3225, 3312, 3400, 3492, 3579, 3667, 3754, 3842, 3933, 4021, 4109, 4196,
    4284, 4375, 4463, 4550, 4638, 4725, 4817, 4905, 4992, 5080, 5167, 5259,
    5347, 5434, 5522, 5609, 5701, 5789, 5876, 5964, 6051,
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
    name: "Mini-sacoche",
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

const ProductScreen5 = ({ onAddToCart }) => {
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
      const area = lengthInMeters * widthInMeters * 7;

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

      // setPrice(basePrice);
      // Apply 21% tax
      const finalPriceWithTax = basePrice * 1.21;

      setPrice(finalPriceWithTax);
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
      id: 5,
      name: "VOLET MINI INDUS ALU 77",
      category: "VOLET",
      dimensions: `${selectedWidth} X ${selectedLength}`,
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
              <div class="spaced-text">VOLET MINI INDUS ALU 77</div>
              {/* <div class="spaced-text">
                <span>V O L E T</span>
                <span>M I N I</span>
                <span>I N D U S</span>
                <span>A L U</span>
                <span>7 7</span>
              </div> */}
            </h1>

            <div className="dimensions">
              <h2 className="sub-head">DIMENSIONS</h2>
              <div className="row dim-cont">
                <div className="col-6 sel-inp dimension-back-1">
                  <label className="labels">
                    <span className="labels-head">Largeur</span>
                    <br />
                    Min (1800mm) & Max (5000mm)
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
                    Min (1200mm) & Max (3600mm)
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
                      <div className="motor-text">
                        <span className="radio-img-text">{motor.name}</span>
                        <div className="stars">
                          <i>
                            <FaStar />
                          </i>
                          <i>
                            <FaStar />
                          </i>
                          <i>
                            <FaStar />
                          </i>
                          <i>
                            <FaStar />
                          </i>
                          <i>
                            <FaStar />
                          </i>
                        </div>
                      </div>
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
                    {interrupteurs[selectedMotor.id - 1].map(
                      (interrupteur, index) => (
                        <label
                          className={`radio-img-option inter-img-option ${
                            selectedInterrupteur === interrupteur.id
                              ? "interrupteur-selected"
                              : ""
                          } ${
                            index === 0 || index === 2
                              ? "first-item"
                              : index === 1 || index === 3
                              ? "last-item"
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
                          <div className="radio-img-square inter-img-text">
                            <img
                              src={interrupteur.imagePath}
                              className="radio-img-image inter-img"
                              alt={`Interrupteur ${interrupteur.id}`}
                            />
                            <span className="radio-img-text">
                              {interrupteur.name}
                            </span>
                          </div>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </>
            )}

            {/* <hr className="custom" /> */}

            <div className="cables">
              <h1 className="sub-head">SORTIE DE CABLE</h1>
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

export default ProductScreen5;
