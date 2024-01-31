let canvas;
let count = 0;

// const icons = {
//   cool_blank: null,
//   cool_bow: null,
//   cool_glasses: null,
//   cool_sunglasses: null,
//   warm_blank: null,
//   warm_bow: null,
//   warm_glasses: null,
//   warm_sunglasses: null,
// };

// // load each image
// Object.keys(icons).forEach((key) => {
//   icons[key] = new Image(500, 500);
//   icons[key].src = `../beaver_icons/Icon_${key}.png`; // Load sprites from beavers in dist
// });

const icons = {
  cool_blank: null,
  cool_bow: null,
  cool_glasses: null,
  cool_sunglasses: null,
  warm_blank: null,
  warm_bow: null,
  warm_glasses: null,
  warm_sunglasses: null,
};

Object.keys(icons).forEach((key) => {
  icons[key] = new Image(200, 200);
  icons[key].src = `../beaver_icons/Icon_${key}.png`; // Load sprites from beaver icons in dist
});

export const drawAvatar = (canvasRef, beaverType) => {
  console.log("drawing " + beaverType);
  const canvas = canvasRef.current;
  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  const beaverImg = icons[beaverType];

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(beaverImg, 0, 0, canvas.width, canvas.height); // Draw the image with canvas width and height
};
