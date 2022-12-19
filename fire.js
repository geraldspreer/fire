$(document).ready(function() {
  makeFullScreen();

  var timer;
  var world;
  var palette;

  const CELL_SIZE = 6;
  const WIDTH = Math.floor($("#c").width() / CELL_SIZE);
  const HEIGHT = Math.floor($("#c").height() / CELL_SIZE);

  createWorld();
  loadPalette();
  setupControls();
  startMainLoop();

  function nextCycle() {
    seedFire();
    burn();
    draw(world);
  }


  // One line
  function seedFire() {
    for (var i = 0; i < WIDTH; i++) {
      world[i] = Math.floor(Math.random() * (255 - 150) + 150);
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
    }, 1);
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
    for (var iy = 0; iy < HEIGHT; iy++) {
      for (var ix = 0; ix < WIDTH; ix++) {
        let value = buffer[ix + iy * WIDTH];
        let color;
        if (value === -1) {
          color = '#ffffff';
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
    palette =
      [
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
        "rgba(3, 0, 0, 255)",
        "rgba(5, 0, 0, 255)",
        "rgba(7, 0, 0, 255)",
        "rgba(8, 0, 0, 255)",
        "rgba(11, 0, 0, 255)",
        "rgba(12, 0, 0, 255)",
        "rgba(15, 0, 0, 255)",
        "rgba(16, 0, 0, 255)",
        "rgba(19, 0, 0, 255)",
        "rgba(21, 0, 0, 255)",
        "rgba(23, 0, 0, 255)",
        "rgba(24, 0, 0, 255)",
        "rgba(26, 0, 0, 255)",
        "rgba(28, 0, 0, 255)",
        "rgba(30, 0, 0, 255)",
        "rgba(32, 0, 0, 255)",
        "rgba(34, 0, 0, 255)",
        "rgba(36, 0, 0, 255)",
        "rgba(38, 0, 0, 255)",
        "rgba(40, 0, 0, 255)",
        "rgba(41, 0, 0, 255)",
        "rgba(43, 0, 0, 255)",
        "rgba(45, 0, 0, 255)",
        "rgba(47, 0, 0, 255)",
        "rgba(50, 0, 0, 255)",
        "rgba(51, 0, 0, 255)",
        "rgba(53, 0, 0, 255)",
        "rgba(55, 0, 0, 255)",
        "rgba(57, 0, 0, 255)",
        "rgba(59, 0, 0, 255)",
        "rgba(61, 0, 0, 255)",
        "rgba(63, 0, 0, 255)",
        "rgba(64, 0, 0, 255)",
        "rgba(67, 0, 0, 255)",
        "rgba(69, 0, 0, 255)",
        "rgba(71, 0, 0, 255)",
        "rgba(72, 0, 0, 255)",
        "rgba(74, 0, 0, 255)",
        "rgba(76, 0, 0, 255)",
        "rgba(78, 0, 0, 255)",
        "rgba(80, 0, 0, 255)",
        "rgba(82, 0, 0, 255)",
        "rgba(84, 0, 0, 255)",
        "rgba(86, 0, 0, 255)",
        "rgba(88, 0, 0, 255)",
        "rgba(89, 0, 0, 255)",
        "rgba(91, 0, 0, 255)",
        "rgba(95, 0, 0, 255)",
        "rgba(102, 0, 0, 255)",
        "rgba(108, 0, 0, 255)",
        "rgba(115, 0, 0, 255)",
        "rgba(122, 0, 0, 255)",
        "rgba(128, 0, 0, 255)",
        "rgba(135, 0, 0, 255)",
        "rgba(141, 0, 0, 255)",
        "rgba(148, 0, 0, 255)",
        "rgba(155, 0, 0, 255)",
        "rgba(161, 0, 0, 255)",
        "rgba(167, 0, 0, 255)",
        "rgba(174, 0, 0, 255)",
        "rgba(180, 0, 0, 255)",
        "rgba(187, 2, 0, 255)",
        "rgba(190, 9, 3, 255)",
        "rgba(195, 17, 6, 255)",
        "rgba(198, 25, 9, 255)",
        "rgba(203, 33, 11, 255)",
        "rgba(206, 41, 15, 255)",
        "rgba(211, 49, 18, 255)",
        "rgba(215, 57, 20, 255)",
        "rgba(219, 65, 23, 255)",
        "rgba(222, 71, 26, 255)",
        "rgba(224, 76, 28, 255)",
        "rgba(227, 81, 29, 255)",
        "rgba(229, 87, 31, 255)",
        "rgba(231, 91, 33, 255)",
        "rgba(234, 97, 34, 255)",
        "rgba(237, 101, 37, 255)",
        "rgba(239, 107, 38, 255)",
        "rgba(241, 112, 40, 255)",
        "rgba(244, 116, 42, 255)",
        "rgba(247, 122, 44, 255)",
        "rgba(249, 127, 45, 255)",
        "rgba(251, 132, 47, 255)",
        "rgba(254, 136, 49, 255)",
        "rgba(254, 145, 48, 255)",
        "rgba(254, 155, 44, 255)",
        "rgba(253, 167, 41, 255)",
        "rgba(252, 178, 38, 255)",
        "rgba(252, 189, 34, 255)",
        "rgba(251, 199, 31, 255)",
        "rgba(250, 210, 29, 255)",
        "rgba(249, 220, 25, 255)",
        "rgba(249, 229, 22, 255)",
        "rgba(248, 239, 21, 255)",
        "rgba(248, 240, 40, 255)",
        "rgba(248, 241, 59, 255)",
        "rgba(249, 242, 78, 255)",
        "rgba(248, 242, 96, 255)",
        "rgba(248, 243, 115, 255)",
        "rgba(249, 244, 133, 255)",
        "rgba(249, 245, 150, 255)",
        "rgba(249, 246, 168, 255)",
        "rgba(249, 246, 186, 255)",
        "rgba(249, 247, 204, 255)",
        "rgba(249, 247, 212, 255)",
        "rgba(249, 247, 212, 255)",
        "rgba(249, 247, 212, 255)",
        "rgba(249, 247, 212, 255)",
      ];
  }
});
