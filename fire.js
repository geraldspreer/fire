$(document).ready(function() {
  makeFullScreen();

  var timer;
  var world;
  var palette;

  const CELL_SIZE = 8;
  const WIDTH = Math.floor($("#c").width() / CELL_SIZE);
  const HEIGHT = Math.floor($("#c").height() / CELL_SIZE);
  const MIN_THICK = 5;
  const MAX_THICK = 50;
  const MIN_HEAT = 160;
  const MAX_HEAT = 255;

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
    let x = 0;
    while (x < WIDTH) {
      let v = Math.floor(Math.random() * (MAX_HEAT - MIN_HEAT) + MIN_HEAT);
      for (var i = 1; i < Math.floor(Math.random() * (MAX_THICK - MIN_THICK) + MIN_THICK); i++) {
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
    // Add the CELL_SIZE to hide the feeder
    for (var iy = 0 + CELL_SIZE; iy <= HEIGHT + CELL_SIZE; iy++) {
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
        "rgba(61, 0, 0, 255)",
        "rgba(62, 0, 0, 255)",
        "rgba(63, 0, 0, 255)",
        "rgba(63, 0, 0, 255)",
        "rgba(64, 0, 0, 255)",
        "rgba(64, 0, 0, 255)",
        "rgba(65, 0, 0, 255)",
        "rgba(65, 0, 0, 255)",
        "rgba(66, 0, 0, 255)",
        "rgba(67, 0, 0, 255)",
        "rgba(67, 0, 0, 255)",
        "rgba(67, 0, 0, 255)",
        "rgba(68, 0, 0, 255)",
        "rgba(68, 0, 0, 255)",
        "rgba(69, 0, 0, 255)",
        "rgba(70, 0, 0, 255)",
        "rgba(70, 0, 0, 255)",
        "rgba(71, 0, 0, 255)",
        "rgba(72, 0, 0, 255)",
        "rgba(72, 0, 0, 255)",
        "rgba(73, 0, 0, 255)",
        "rgba(73, 0, 0, 255)",
        "rgba(74, 0, 0, 255)",
        "rgba(74, 0, 0, 255)",
        "rgba(75, 0, 0, 255)",
        "rgba(75, 0, 0, 255)",
        "rgba(75, 0, 0, 255)",
        "rgba(76, 0, 0, 255)",
        "rgba(77, 0, 0, 255)",
        "rgba(77, 0, 0, 255)",
        "rgba(78, 0, 0, 255)",
        "rgba(79, 0, 0, 255)",
        "rgba(79, 0, 0, 255)",
        "rgba(79, 0, 0, 255)",
        "rgba(80, 0, 0, 255)",
        "rgba(80, 0, 0, 255)",
        "rgba(82, 0, 0, 255)",
        "rgba(82, 0, 0, 255)",
        "rgba(82, 0, 0, 255)",
        "rgba(83, 0, 0, 255)",
        "rgba(84, 0, 0, 255)",
        "rgba(84, 0, 0, 255)",
        "rgba(84, 0, 0, 255)",
        "rgba(85, 0, 0, 255)",
        "rgba(86, 0, 0, 255)",
        "rgba(86, 0, 0, 255)",
        "rgba(87, 0, 0, 255)",
        "rgba(87, 0, 0, 255)",
        "rgba(88, 0, 0, 255)",
        "rgba(88, 0, 0, 255)",
        "rgba(89, 0, 0, 255)",
        "rgba(89, 0, 0, 255)",
        "rgba(90, 0, 0, 255)",
        "rgba(90, 0, 0, 255)",
        "rgba(91, 0, 0, 255)",
        "rgba(92, 0, 0, 255)",
        "rgba(92, 0, 0, 255)",
        "rgba(93, 0, 0, 255)",
        "rgba(94, 0, 0, 255)",
        "rgba(95, 0, 0, 255)",
        "rgba(97, 0, 0, 255)",
        "rgba(99, 0, 0, 255)",
        "rgba(101, 0, 0, 255)",
        "rgba(103, 0, 0, 255)",
        "rgba(105, 0, 0, 255)",
        "rgba(107, 0, 0, 255)",
        "rgba(109, 0, 0, 255)",
        "rgba(111, 0, 0, 255)",
        "rgba(113, 0, 0, 255)",
        "rgba(114, 0, 0, 255)",
        "rgba(117, 0, 0, 255)",
        "rgba(118, 0, 0, 255)",
        "rgba(120, 0, 0, 255)",
        "rgba(121, 0, 0, 255)",
        "rgba(123, 0, 0, 255)",
        "rgba(125, 0, 0, 255)",
        "rgba(127, 0, 0, 255)",
        "rgba(129, 0, 0, 255)",
        "rgba(131, 0, 0, 255)",
        "rgba(133, 0, 0, 255)",
        "rgba(134, 0, 0, 255)",
        "rgba(137, 0, 0, 255)",
        "rgba(138, 0, 0, 255)",
        "rgba(140, 0, 0, 255)",
        "rgba(142, 0, 0, 255)",
        "rgba(143, 0, 0, 255)",
        "rgba(146, 0, 0, 255)",
        "rgba(147, 0, 0, 255)",
        "rgba(150, 0, 0, 255)",
        "rgba(151, 0, 0, 255)",
        "rgba(153, 0, 0, 255)",
        "rgba(155, 0, 0, 255)",
        "rgba(157, 0, 0, 255)",
        "rgba(159, 0, 0, 255)",
        "rgba(161, 0, 0, 255)",
        "rgba(162, 0, 0, 255)",
        "rgba(165, 0, 0, 255)",
        "rgba(166, 0, 0, 255)",
        "rgba(168, 0, 0, 255)",
        "rgba(170, 0, 0, 255)",
        "rgba(171, 0, 0, 255)",
        "rgba(173, 0, 0, 255)",
        "rgba(175, 0, 0, 255)",
        "rgba(177, 0, 0, 255)",
        "rgba(179, 0, 0, 255)",
        "rgba(181, 0, 0, 255)",
        "rgba(183, 0, 0, 255)",
        "rgba(184, 0, 0, 255)",
        "rgba(187, 1, 0, 255)",
        "rgba(187, 3, 1, 255)",
        "rgba(188, 5, 2, 255)",
        "rgba(189, 7, 3, 255)",
        "rgba(191, 10, 4, 255)",
        "rgba(192, 12, 5, 255)",
        "rgba(193, 14, 5, 255)",
        "rgba(194, 16, 6, 255)",
        "rgba(195, 18, 6, 255)",
        "rgba(196, 21, 8, 255)",
        "rgba(197, 23, 8, 255)",
        "rgba(198, 25, 10, 255)",
        "rgba(199, 28, 10, 255)",
        "rgba(201, 30, 11, 255)",
        "rgba(202, 32, 12, 255)",
        "rgba(203, 34, 13, 255)",
        "rgba(204, 37, 13, 255)",
        "rgba(205, 39, 14, 255)",
        "rgba(206, 41, 15, 255)",
        "rgba(208, 43, 15, 255)",
        "rgba(209, 46, 16, 255)",
        "rgba(209, 47, 17, 255)",
        "rgba(211, 50, 18, 255)",
        "rgba(212, 52, 18, 255)",
        "rgba(213, 55, 20, 255)",
        "rgba(214, 56, 20, 255)",
        "rgba(215, 59, 21, 255)",
        "rgba(217, 61, 22, 255)",
        "rgba(217, 63, 23, 255)",
        "rgba(219, 65, 24, 255)",
        "rgba(219, 68, 24, 255)",
        "rgba(221, 70, 25, 255)",
        "rgba(221, 71, 25, 255)",
        "rgba(222, 73, 26, 255)",
        "rgba(223, 74, 26, 255)",
        "rgba(224, 76, 28, 255)",
        "rgba(224, 77, 28, 255)",
        "rgba(225, 78, 29, 255)",
        "rgba(226, 80, 29, 255)",
        "rgba(227, 81, 30, 255)",
        "rgba(228, 83, 29, 255)",
        "rgba(228, 84, 30, 255)",
        "rgba(228, 86, 30, 255)",
        "rgba(229, 86, 31, 255)",
        "rgba(230, 88, 32, 255)",
        "rgba(231, 90, 33, 255)",
        "rgba(231, 91, 33, 255)",
        "rgba(232, 93, 33, 255)",
        "rgba(233, 94, 34, 255)",
        "rgba(234, 95, 34, 255)",
        "rgba(234, 96, 35, 255)",
        "rgba(235, 98, 36, 255)",
        "rgba(236, 100, 36, 255)",
        "rgba(236, 101, 36, 255)",
        "rgba(237, 102, 37, 255)",
        "rgba(238, 104, 37, 255)",
        "rgba(238, 105, 37, 255)",
        "rgba(239, 107, 38, 255)",
        "rgba(240, 109, 39, 255)",
        "rgba(240, 110, 40, 255)",
        "rgba(242, 111, 39, 255)",
        "rgba(242, 113, 41, 255)",
        "rgba(243, 114, 41, 255)",
        "rgba(244, 116, 42, 255)",
        "rgba(244, 117, 42, 255)",
        "rgba(244, 118, 42, 255)",
        "rgba(245, 120, 43, 255)",
        "rgba(246, 121, 44, 255)",
        "rgba(247, 122, 44, 255)",
        "rgba(248, 124, 44, 255)",
        "rgba(248, 125, 45, 255)",
        "rgba(249, 126, 46, 255)",
        "rgba(249, 128, 46, 255)",
        "rgba(251, 130, 47, 255)",
        "rgba(251, 131, 47, 255)",
        "rgba(252, 133, 48, 255)",
        "rgba(252, 134, 48, 255)",
        "rgba(253, 135, 49, 255)",
        "rgba(254, 136, 49, 255)",
        "rgba(254, 138, 49, 255)",
        "rgba(255, 140, 50, 255)",
        "rgba(254, 144, 48, 255)",
        "rgba(255, 146, 48, 255)",
        "rgba(254, 149, 47, 255)",
        "rgba(254, 152, 45, 255)",
        "rgba(254, 156, 45, 255)",
        "rgba(254, 158, 44, 255)",
        "rgba(253, 162, 43, 255)",
        "rgba(253, 165, 42, 255)",
        "rgba(253, 168, 41, 255)",
        "rgba(252, 171, 40, 255)",
        "rgba(252, 174, 39, 255)",
        "rgba(252, 177, 39, 255)",
        "rgba(252, 180, 37, 255)",
        "rgba(251, 184, 36, 255)",
        "rgba(252, 186, 35, 255)",
        "rgba(251, 189, 35, 255)",
        "rgba(251, 193, 33, 255)",
        "rgba(251, 196, 32, 255)",
        "rgba(251, 198, 31, 255)",
        "rgba(250, 201, 31, 255)",
        "rgba(251, 204, 30, 255)",
        "rgba(250, 207, 28, 255)",
        "rgba(250, 210, 28, 255)",
        "rgba(250, 213, 27, 255)",
        "rgba(250, 216, 26, 255)",
        "rgba(250, 219, 26, 255)",
        "rgba(249, 221, 24, 255)",
        "rgba(249, 224, 24, 255)",
        "rgba(249, 227, 23, 255)",
        "rgba(249, 230, 22, 255)",
        "rgba(249, 233, 21, 255)",
        "rgba(248, 236, 20, 255)",
        "rgba(248, 239, 19, 255)",
        "rgba(248, 239, 24, 255)",
        "rgba(248, 240, 29, 255)",
        "rgba(248, 239, 34, 255)",
        "rgba(249, 240, 39, 255)",
        "rgba(249, 240, 45, 255)",
        "rgba(248, 240, 50, 255)",
        "rgba(248, 241, 56, 255)",
        "rgba(249, 241, 61, 255)",
        "rgba(248, 241, 67, 255)",
        "rgba(248, 241, 72, 255)",
        "rgba(249, 242, 78, 255)",
        "rgba(248, 242, 83, 255)",
        "rgba(248, 242, 89, 255)",
        "rgba(249, 242, 93, 255)",
        "rgba(248, 243, 99, 255)",
        "rgba(248, 243, 104, 255)",
        "rgba(248, 243, 109, 255)",
        "rgba(248, 243, 115, 255)",
        "rgba(249, 243, 120, 255)",
        "rgba(249, 243, 125, 255)",
        "rgba(249, 243, 130, 255)",
        "rgba(249, 244, 135, 255)",
        "rgba(249, 244, 140, 255)",
        "rgba(248, 245, 145, 255)",
        "rgba(249, 244, 150, 255)",
        "rgba(249, 245, 155, 255)",
        "rgba(249, 245, 161, 255)",
        "rgba(249, 245, 165, 255)",
        "rgba(249, 245, 171, 255)",
        "rgba(249, 246, 176, 255)",
        "rgba(249, 245, 180, 255)",
        "rgba(249, 246, 186, 255)",
        "rgba(249, 246, 190, 255)",
      ]

      ];
  }
});
