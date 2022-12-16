$(document).ready(function() {
  makeFullScreen();

  var timer;
  var world;
  var current;

  const CELL_SIZE = 6;
  const WIDTH = Math.floor($("#c").width() / CELL_SIZE);
  const HEIGHT = Math.floor($("#c").height() / CELL_SIZE);

  createWorld();
  seedFire();
  drawBoard(world);
  setupControls();
  // startMainLoop();

  function nextCycle() {
    drawBoard(current);
    updateWorld();
  }

  function createWorld() {
    world = new Array(WIDTH * HEIGHT);
    current = new Array(WIDTH * HEIGHT);
  }

  function updateWorld() {
    world = current.slice();
  }

  function setupControls() {
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

  function seedFire() {
    for (var i = 0; i < world.length; i++) {
      world[i] = Math.floor(100 + Math.random() * (256));
    }
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

  function drawBoard(view) {
    var canvas = document.getElementById("c");
    var context = canvas.getContext("2d");
    var x = 0;
    var y = 0;
    for (var iy = 0; iy < HEIGHT; iy++) {
      for (var ix = 0; ix < WIDTH; ix++) {
        // TODO: Lookup color from table here
        let color = `rgb(${view[ix + iy * WIDTH]}, ${view[ix + iy * WIDTH]}, ${view[ix + iy * WIDTH]})`;
        context.fillStyle = color;
        context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        x = x + CELL_SIZE;
      }
      y = y + CELL_SIZE;
      x = 0;
    }
  }
});
