const BACKGROUND_R = 215;
const BACKGROUND_G = 185;
const BACKGROUND_B = 165;

const MITRED_R = 117;
const MITRED_G = 0;
const MITRED_B = 20;

// Declare and load images
const fullMap = new Image(4000, 6000);
fullMap.src = "../fullMap.png";

const plate = new Image(280, 280);
plate.src = "../stuff/plate.png";

let walk_1 = {
  cool_blank: null,
  cool_bow: null,
  cool_glasses: null,
  cool_sunglasses: null,
  warm_blank: null,
  warm_bow: null,
  warm_glasses: null,
  warm_sunglasses: null,
};
let walk_2 = {
  cool_blank: null,
  cool_bow: null,
  cool_glasses: null,
  cool_sunglasses: null,
  warm_blank: null,
  warm_bow: null,
  warm_glasses: null,
  warm_sunglasses: null,
};

// load each image
Object.keys(walk_1).forEach((key) => {
  walk_1[key] = new Image(500, 500);
  walk_1[key].src = `../beavers/${key}/${key}_walk1.png`; // Load sprites from beavers in dist
});
Object.keys(walk_2).forEach((key) => {
  walk_2[key] = new Image(500, 500);
  walk_2[key].src = `../beavers/${key}/${key}_walk2.png`; // Load sprites from beavers in dist
});

// coordinate locations of center of buttons on the full map
let buttonLocations = {
  1: [90, 1152],
  2: [90, 2451],
  3: [721, 1169],
  4: [714, 2453],
  5: [1269, 621],
  6: [902, 3030],
  7: [2308, 759],
  8: [1831, 3018],
  9: [2656, 745],
  10: [2085, 1807],
  11: [2144, 1136],
  12: [2573, 2669],
  13: [2460, 1259],
  14: [247, 3474],
  16: [2281, 3375],
  17: [3284, 844],
  18: [1259, 3740],
  24: [3006, 2110],
  26: [3283, 2871],
  31: [2891, 1314],
  32: [3481, 3906],
  33: [3103, 592],
  34: [3465, 2563],
  35: [3413, 300],
  36: [3830, 2825],
  37: [3512, 1332],
  38: [3677, 2100],
  39: [3407, 1918],
  56: [2297, 4026],
  57: [2829, 4026],
  66: [2206, 4778],
  68: [2858, 5432],
};

export {
  fullMap,
  plate,
  walk_1,
  walk_2,
  buttonLocations,
  BACKGROUND_R,
  BACKGROUND_G,
  BACKGROUND_B,
  MITRED_R,
  MITRED_G,
  MITRED_B,
};
