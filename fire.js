$(document).ready(function() {
  makeFullScreen();

  var timer;
  var world;
  var palette;

  const CELL_SIZE = 8;
  const WIDTH = Math.floor($("#c").width() / CELL_SIZE);
  const HEIGHT = Math.floor($("#c").height() / CELL_SIZE);
  const MIN_THICK = 2;
  const MAX_THICK = 30;
  const MIN_HEAT = 130;
  const MAX_HEAT = 255;

  createWorld();
  loadPalette();
  loadFollow();
  setupControls();
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

        // TODO: Add follow table
        let nv = Math.floor((va + vb + vc + vd) / 4) - 1; // (Math.floor(Math.random() * (4 - (-1)) + (-1)));
        if (nv <= 0) {
          nv = 0
        }
        world[a] = nv;
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
    for (var iy = 0 + CELL_SIZE; iy <= HEIGHT + CELL_SIZE; iy++) {
      for (var ix = 0; ix < WIDTH; ix++) {
        let value = buffer[ix + iy * WIDTH];
        let color;
        if (value < 50) {
          color = "#000000";
        } else {
          color = palette[value];
        }
        context.fillStyle = color;
        context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        x = x + CELL_SIZE;
      }
      y = y + CELL_SIZE;
      x = 0;
    }
  }

  function loadPalette() {
    palette = [
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(0, 0, 0, 255)",
      "rgba(1, 0, 0, 255)",
      "rgba(2, 0, 0, 255)",
      "rgba(4, 0, 0, 255)",
      "rgba(5, 0, 0, 255)",
      "rgba(6, 0, 0, 255)",
      "rgba(8, 0, 0, 255)",
      "rgba(9, 0, 0, 255)",
      "rgba(10, 0, 0, 255)",
      "rgba(11, 0, 0, 255)",
      "rgba(13, 0, 0, 255)",
      "rgba(14, 0, 0, 255)",
      "rgba(15, 0, 0, 255)",
      "rgba(17, 0, 0, 255)",
      "rgba(18, 0, 0, 255)",
      "rgba(20, 0, 0, 255)",
      "rgba(20, 0, 0, 255)",
      "rgba(22, 0, 0, 255)",
      "rgba(23, 0, 0, 255)",
      "rgba(25, 0, 0, 255)",
      "rgba(26, 0, 0, 255)",
      "rgba(27, 0, 0, 255)",
      "rgba(28, 0, 0, 255)",
      "rgba(29, 0, 0, 255)",
      "rgba(31, 0, 0, 255)",
      "rgba(32, 0, 0, 255)",
      "rgba(33, 0, 0, 255)",
      "rgba(35, 0, 0, 255)",
      "rgba(36, 0, 0, 255)",
      "rgba(38, 0, 0, 255)",
      "rgba(39, 0, 0, 255)",
      "rgba(40, 0, 0, 255)",
      "rgba(41, 0, 0, 255)",
      "rgba(43, 0, 0, 255)",
      "rgba(44, 0, 0, 255)",
      "rgba(45, 0, 0, 255)",
      "rgba(46, 0, 0, 255)",
      "rgba(48, 0, 0, 255)",
      "rgba(50, 0, 0, 255)",
      "rgba(51, 0, 0, 255)",
      "rgba(52, 0, 0, 255)",
      "rgba(54, 0, 0, 255)",
      "rgba(55, 0, 0, 255)",
      "rgba(56, 0, 0, 255)",
      "rgba(58, 0, 0, 255)",
      "rgba(59, 0, 0, 255)",
      "rgba(60, 0, 0, 255)",
      "rgba(61, 0, 0, 255)",
      "rgba(63, 0, 0, 255)",
      "rgba(64, 0, 0, 255)",
      "rgba(65, 0, 0, 255)",
      "rgba(67, 0, 0, 255)",
      "rgba(68, 0, 0, 255)",
      "rgba(70, 0, 0, 255)",
      "rgba(71, 0, 0, 255)",
      "rgba(72, 0, 0, 255)",
      "rgba(73, 0, 0, 255)",
      "rgba(75, 0, 0, 255)",
      "rgba(76, 0, 0, 255)",
      "rgba(77, 0, 0, 255)",
      "rgba(79, 0, 0, 255)",
      "rgba(80, 0, 0, 255)",
      "rgba(81, 0, 0, 255)",
      "rgba(83, 0, 0, 255)",
      "rgba(84, 0, 0, 255)",
      "rgba(85, 0, 0, 255)",
      "rgba(86, 0, 0, 255)",
      "rgba(87, 0, 0, 255)",
      "rgba(89, 0, 0, 255)",
      "rgba(90, 0, 0, 255)",
      "rgba(92, 0, 0, 255)",
      "rgba(94, 0, 0, 255)",
      "rgba(98, 0, 0, 255)",
      "rgba(102, 0, 0, 255)",
      "rgba(107, 0, 0, 255)",
      "rgba(112, 0, 0, 255)",
      "rgba(116, 0, 0, 255)",
      "rgba(121, 0, 0, 255)",
      "rgba(125, 0, 0, 255)",
      "rgba(129, 0, 0, 255)",
      "rgba(134, 0, 0, 255)",
      "rgba(139, 0, 0, 255)",
      "rgba(143, 0, 0, 255)",
      "rgba(148, 0, 0, 255)",
      "rgba(152, 0, 0, 255)",
      "rgba(156, 0, 0, 255)",
      "rgba(161, 0, 0, 255)",
      "rgba(166, 0, 0, 255)",
      "rgba(170, 0, 0, 255)",
      "rgba(174, 0, 0, 255)",
      "rgba(179, 0, 0, 255)",
      "rgba(183, 0, 0, 255)",
      "rgba(187, 2, 1, 255)",
      "rgba(189, 8, 3, 255)",
      "rgba(193, 13, 5, 255)",
      "rgba(196, 19, 7, 255)",
      "rgba(198, 24, 9, 255)",
      "rgba(200, 30, 11, 255)",
      "rgba(203, 35, 13, 255)",
      "rgba(206, 41, 15, 255)",
      "rgba(208, 45, 16, 255)",
      "rgba(212, 52, 18, 255)",
      "rgba(215, 56, 20, 255)",
      "rgba(217, 62, 23, 255)",
      "rgba(220, 67, 25, 255)",
      "rgba(221, 72, 26, 255)",
      "rgba(224, 75, 27, 255)",
      "rgba(225, 79, 28, 255)",
      "rgba(227, 82, 30, 255)",
      "rgba(229, 85, 31, 255)",
      "rgba(230, 89, 32, 255)",
      "rgba(232, 92, 33, 255)",
      "rgba(234, 96, 35, 255)",
      "rgba(235, 99, 36, 255)",
      "rgba(236, 102, 37, 255)",
      "rgba(238, 106, 38, 255)",
      "rgba(240, 109, 39, 255)",
      "rgba(242, 113, 41, 255)",
      "rgba(244, 117, 42, 255)",
      "rgba(245, 120, 43, 255)",
      "rgba(247, 124, 44, 255)",
      "rgba(249, 127, 46, 255)",
      "rgba(251, 130, 47, 255)",
      "rgba(252, 133, 48, 255)",
      "rgba(254, 137, 49, 255)",
      "rgba(254, 142, 49, 255)",
      "rgba(254, 150, 46, 255)",
      "rgba(254, 157, 44, 255)",
      "rgba(253, 164, 42, 255)",
      "rgba(253, 173, 40, 255)",
      "rgba(252, 180, 38, 255)",
      "rgba(252, 188, 35, 255)",
      "rgba(251, 195, 33, 255)",
      "rgba(251, 201, 31, 255)",
      "rgba(250, 208, 28, 255)",
      "rgba(249, 215, 27, 255)",
      "rgba(249, 222, 24, 255)",
      "rgba(249, 229, 22, 255)",
      "rgba(248, 237, 20, 255)",
      "rgba(248, 239, 27, 255)",
      "rgba(248, 240, 40, 255)",
      "rgba(249, 240, 53, 255)",
      "rgba(249, 241, 66, 255)",
      "rgba(248, 241, 79, 255)",
      "rgba(248, 242, 92, 255)",
      "rgba(248, 242, 105, 255)",
      "rgba(249, 243, 117, 255)",
      "rgba(248, 244, 130, 255)",
      "rgba(248, 244, 142, 255)",
      "rgba(249, 245, 154, 255)",
      "rgba(249, 245, 166, 255)",
      "rgba(249, 245, 179, 255)",
      "rgba(249, 246, 191, 255)",
      "rgba(249, 247, 203, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
      "rgba(249, 247, 212, 255)",
    ];
  }
});
