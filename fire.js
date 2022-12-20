$(document).ready(function() {
  makeFullScreen();

  var timer;
  var world;

  const CELL_SIZE = 6;
  const WIDTH = Math.floor($("#c").width() / CELL_SIZE);
  const HEIGHT = Math.floor($("#c").height() / CELL_SIZE);
  const MIN_THICK = 10;
  const MAX_THICK = 30;
  const MIN_HEAT = 90;
  const MAX_HEAT = 255;

  createWorld();
  loadPalette();
  setupControls()
  startMainLoop();

  function nextCycle() {
    seedFire();
    burn();
    draw(world);
  }

  // One line
  function seedFire() {
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
    // start at line one
    for (var y = 1; y < HEIGHT; y++) {
      for (var x = 1; x < WIDTH; x++) {
        // positions
        let a = (WIDTH * y) + x;
        let b = a - (WIDTH) - 1;
        let c = a - (WIDTH);
        let d = a - (WIDTH) + 1;
        // values
        let va = world[a];
        let vb = world[b];
        let vc = world[c];
        let vd = world[d];

        let nv = Math.floor((va + vb + vc + vd) / 4);
        world[a] = nv > 120 ? nv - 1 : nv - 2;
      }
    }
  }

  function createWorld() {
    world = new Array(WIDTH * HEIGHT);
    world.fill(0);
  }

  function setupControls() {
    $(document).keydown(function() {
      nextCycle();
    });
    $("#stop").click(function() {
      clearInterval(timer);
    });
    $("#step").click(function() {
      nextCycle();
    });
    $("#resume").click(function() {
      startMainLoop();
    });
    $("#reset").click(function() {
      location.reload();
    });
  }

  function startMainLoop() {
    timer = setInterval(function() {
      nextCycle();
    }, 0);
  }

  function makeFullScreen() {
    var innerHeight = window.innerHeight;

    $("#c").attr("width", window.innerWidth);
    $("#c").attr("height", innerHeight);
  }

  function draw(buffer) {
    var canvas = document.getElementById("c");
    var context = canvas.getContext("2d");
    var x = 0;
    var y = 0;
    // Add the CELL_SIZE to hide the feeder
    for (var iy = 0 + CELL_SIZE; iy <= HEIGHT; iy++) {
      for (var ix = 0; ix < WIDTH; ix++) {
        let value = buffer[ix + iy * WIDTH];
        if (value < 0) {
          x = x + CELL_SIZE;
          continue;
        }
        color = paletteRGB[value];
        context.fillStyle = color;
        context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        x = x + CELL_SIZE;
      }
      y = y + CELL_SIZE;
      x = 0;
    }
  }
});
