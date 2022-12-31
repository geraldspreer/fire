function startFire() {
  var world;
  var c = document.getElementById("c");
  var context = c.getContext("2d");

  makeFullScreen();

  const CELL_SIZE = 6;
  const WIDTH = Math.floor(c.width / CELL_SIZE);
  const HEIGHT = Math.floor(c.height / CELL_SIZE);
  const MIN_THICK = 10;
  const MAX_THICK = 30;
  const MIN_HEAT = 90;
  const MAX_HEAT = 255;

  createWorld();
  loadPalette();
  startMainLoop();

  function nextCycle() {
    feedFire();
    burn();
    draw(world);
  }

  function feedFire() {
    let x = 0;
    while (x < WIDTH) {
      let v = Math.floor(Math.random() * (MAX_HEAT - MIN_HEAT) + MIN_HEAT);
      let t = Math.floor(Math.random() * (MAX_THICK - MIN_THICK) + MIN_THICK);
      for (var i = 1; i < t; i++) {
        world[x] = v
        x++;
      }
    }
  }

  function burn() {
    // b  c   d  
    //    a
    for (var y = 1; y < HEIGHT; y++) {
      for (var x = 1; x < WIDTH; x++) {
        let a = (WIDTH * y) + x;
        let va = world[a];
        let vb = world[a - (WIDTH) - 1];
        let vc = world[a - (WIDTH)];
        let vd = world[a - (WIDTH) + 1];

        let nv = Math.floor((va + vb + vc + vd) / 4);
        world[a] = nv > 120 ? nv - 1 : nv - 2;
      }
    }
  }

  function createWorld() {
    world = new Array(WIDTH * HEIGHT);
    world.fill(0);
  }

  function startMainLoop() {
    timer = setInterval(function() {
      nextCycle();
    }, 25);
  }

  function makeFullScreen() {
    c.setAttribute("width", window.innerWidth);
    c.setAttribute("height", window.innerHeight);
  }

  function draw(buffer) {
    var x = 0;
    var y = 0;
    for (var iy = 0 + CELL_SIZE; iy <= HEIGHT; iy++) {
      let lo = iy * WIDTH;
      for (var ix = 0; ix < WIDTH; ix++) {
        let value = buffer[ix + lo];
        if (value < 24) {
          x = x + CELL_SIZE;
          continue;
        }
        context.fillStyle = paletteRGB[value];
        context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        x = x + CELL_SIZE;
      }
      y = y + CELL_SIZE;
      x = 0;
    }
  }
};
