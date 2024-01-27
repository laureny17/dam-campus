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

  //   const [user, setUser] = useState();

  //   useEffect(() => {
  //     get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  //   }, []);

  let beaverImg = sprites["cool_blank"];

  //   if (user) {
  //     beaverImg = sprites[user.color + "_" + user.accessory];
  //   }

  console.log("hello");
  const context = canvas.getContext("2d");
  context.drawImage(beaverImg, 0, 0, context.canvas.width, context.canvas.height);
};
