let canvas;
let count = 0;

const icons = {
  cool_blank: new Image(),
  cool_bow: new Image(),
  cool_glasses: new Image(),
  cool_sunglasses: new Image(),
  warm_blank: new Image(),
  warm_bow: new Image(),
  warm_glasses: new Image(),
  warm_sunglasses: new Image(),
};

// Counter for tracking the number of loaded images
let loadedImageCount = 0;

// Function to check if all images are loaded
const areAllImagesLoaded = () => {
  return loadedImageCount === Object.keys(icons).length;
};

// Wait for all images to load
const loadImages = async () => {
  const imagePromises = Object.keys(icons).map((key) => {
    return new Promise((resolve) => {
      icons[key].onload = () => {
        loadedImageCount += 1;
        resolve();
      };
      icons[key].src = `../beaver_icons/Icon_${key}.png`;
    });
  });

  await Promise.all(imagePromises);

  // All images have loaded, start rendering
  if (areAllImagesLoaded()) {
    startRendering();
  }
};

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

// Object.keys(icons).forEach((key) => {
//   icons[key] = new Image(200, 200);
//   icons[key].src = `../beaver_icons/Icon_${key}.png`; // Load sprites from beaver icons in dist
// });

export const drawAvatar = (canvasRef, beaverType) => {
  const canvas = canvasRef.current;
  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  const beaverImg = icons[beaverType];

  if (beaverImg && beaverImg.complete) {
    console.log(`Drawing ${beaverType} image`);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(beaverImg, 0, 0, canvas.width, canvas.height); // Draw the image with canvas width and height
  } else {
    console.error(`Error: Image for ${beaverType} is not loaded.`);
    console.log("Icons object:", icons);
    console.log("Loaded image count:", loadedImageCount);
    console.log("Are all images loaded?", areAllImagesLoaded());
  }
};

const startRendering = () => {
  // Call your initial rendering logic here
  console.log("All images loaded. Start rendering...");
};

// Start loading images
loadImages();

// Start loading images
loadImages();
