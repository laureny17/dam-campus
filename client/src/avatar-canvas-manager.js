let canvas;

let sprites = {
  cool_blank: null,
  cool_bow: null,
  cool_glasses: null,
  cool_sunglasses: null,
  warm_blank: null,
  warm_bow: null,
  warm_glasses: null,
  warm_sunglasses: null,
};

Object.keys(sprites).forEach((key) => {
  sprites[key] = new Image(1000, 1000);
  sprites[key].src = `../beavers/${key}/${key}_walk1.png`; // Load sprites from beavers in dist
});

export const drawAvatar = (count, canvasRef) => {
  canvas = canvasRef.current;
  if (!canvas) {
    return;
  }
  const context = canvas.getContext("2d");

  //   const [user, setUser] = useState();

  //   useEffect(() => {
  //     get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  //   }, []);

  let beaverImg = sprites["cool_blank"];

  //   if (user) {
  //     beaverImg = sprites[user.color + "_" + user.accessory];
  //   }

  function bgLoaded() {
    let colorUnderneath = context.getImageData(
      context.canvas.width / 2,
      context.canvas.height / 2,
      1,
      1
    );
    if (
      colorUnderneath.data[0] === 176 &&
      colorUnderneath.data[1] === 144 &&
      colorUnderneath.data[2] === 123
    ) {
      return true;
    }
  }

  if (bgLoaded === false) {
    window.setTimeout(bgLoaded, 50);
  }

  context.drawImage(beaverImg, 0, 0, context.canvas.width, context.canvas.height);

  // while (
  //   colorUnderneath.data[0] === 176 &&
  //   colorUnderneath.data[1] === 144 &&
  //   colorUnderneath.data[2] === 123
  // ) {
  //   context.drawImage(beaverImg, 0, 0, context.canvas.width, context.canvas.height);
  // }
  // context.drawImage(beaverImg, 0, 0, context.canvas.width, context.canvas.height);
};
