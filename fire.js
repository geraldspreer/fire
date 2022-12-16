$(document).ready(function() {
  makeFullScreen();

  var timer;
  var world;
  var current;
  var generations = 0;
  var howManyAlive = 0;
  var cyclesWithoutChanges = 0;

  const CELL_SIZE = 6;
  const WIDTH = Math.floor($("#c").width() / CELL_SIZE);
  const HEIGHT = Math.floor($("#c").height() / CELL_SIZE);

  // evolutionThreshold : After how many generations has the evolution
  // obviously stopped
  const evolutionThreshold = 40;

  createWorld();
  spreadLivingCellsAtRandom();
  setupControls();
  startMainLoop();

  function nextEvolutionCycle() {
    var aliveInCycle = 0;
    var births = 0;
    var deaths = 0;
    var livingNearby = 0;

    for (var i = 0; i < world.length; i++) {
      const cellIsAlive = world[i];
      const onFirstLine = i < WIDTH;
      const onLastLine = i > WIDTH * HEIGHT - WIDTH;
      livingNearby = 0;
      // Count live and make world without
      // borders
      if (onFirstLine) {
        livingNearby = countLivingNearby(i);
      } else if (onLastLine) {
        livingNearby = countLivingAcrossBorders(i);
      } else {
        livingNearby = countLivingInCenter(i);
      }

      if (cellIsAlive) {
        if (livingNearby < 2 || livingNearby > 3) {
          killCell(i);
          deaths += 1;
        } else if (livingNearby == 2 || livingNearby == 3) {
          stayAlive(i);
          aliveInCycle += 1;
        }
      } else {
        if (livingNearby == 3) {
          cellIsBorn(i);
          births += 1;
        } else {
          // Dead cells stay dead
          current[i] = 0;
        }
      }
    }

    if (howManyAlive === aliveInCycle) {
      recordCycleWithoutChanges();
      if (cyclesWithoutChanges >= evolutionThreshold) {
        evolutionHasStopped();
      }
    } else {
      howManyAlive = aliveInCycle;
      cyclesWithoutChanges = 0;
      $("#living").removeClass("almost");
    }

    drawBoard(current);
    updateWorld();
    updateStats(births, aliveInCycle, deaths);
  }

  function countLivingNearby(i) {
    var pointer = WIDTH * HEIGHT - i;
    livingNearby = world[pointer - 1];
    livingNearby += world[pointer - WIDTH];
    livingNearby += world[pointer - (WIDTH - 1)];
    livingNearby += world[pointer - (WIDTH + 1)];
    livingNearby += world[i + 1];
    livingNearby += world[i + WIDTH];
    livingNearby += world[i + (WIDTH - 1)];
    livingNearby += world[i + (WIDTH + 1)];
    return livingNearby;
  }

  function countLivingAcrossBorders(i) {
    var pointer = i - WIDTH * HEIGHT + WIDTH;
    livingNearby = world[i - 1];
    livingNearby += world[i - WIDTH];
    livingNearby += world[i - (WIDTH - 1)];
    livingNearby += world[i - (WIDTH + 1)];
    livingNearby += world[i + 1];
    livingNearby += world[pointer + WIDTH];
    livingNearby += world[pointer + (WIDTH - 1)];
    livingNearby += world[pointer + (WIDTH + 1)];
    return livingNearby;
  }

  function countLivingInCenter(i) {
    livingNearby = world[i - 1];
    livingNearby += world[i - WIDTH];
    livingNearby += world[i - (WIDTH - 1)];
    livingNearby += world[i - (WIDTH + 1)];
    livingNearby += world[i + 1];
    livingNearby += world[i + WIDTH];
    livingNearby += world[i + (WIDTH - 1)];
    livingNearby += world[i + (WIDTH + 1)];
    return livingNearby;
  }

  function createWorld() {
    world = new Array(WIDTH * HEIGHT);
    current = new Array(WIDTH * HEIGHT);
  }

  function updateWorld() {
    generations += 1;
    world = current.slice();
  }

  function killCell(cellNumber) {
    current[cellNumber] = 0;
  }

  function stayAlive(cellNumber) {
    current[cellNumber] = 1;
  }

  function cellIsBorn(cellNumber) {
    current[cellNumber] = 1;
  }

  function evolutionHasStopped() {
    clearInterval(timer);
    $("#generations").text(generations - evolutionThreshold);
    $("#living").removeClass("almost");
    $("#living, #generations").addClass("green");
  }

  function recordCycleWithoutChanges() {
    cyclesWithoutChanges += 1;
    $("#living").addClass("almost");
  }

  function updateStats(births, aliveInCycle, deaths) {
    $("#generations").text(generations);
    $("#births").text(births);
    $("#living").text(aliveInCycle);
    $("#deaths").text(deaths);
  }

  function setupControls() {
    $("#stop").click(function() {
      clearInterval(timer);
    });
    $("#step").click(function() {
      nextEvolutionCycle();
    });
    $("#resume").click(function() {
      startMainLoop();
    });
    $("#reset").click(function() {
      location.reload();
    });
  }

  function spreadLivingCellsAtRandom() {
    for (var i = 0; i < world.length; i++) {
      world[i] = Math.round(Math.random());
    }
  }

  function startMainLoop() {
    timer = setInterval(function() {
      nextEvolutionCycle();
    }, 1);
  }

  function makeFullScreen() {
    var innerHeight = window.innerHeight;

    $("#c").attr("width", window.innerWidth);
    $("#c").attr("height", innerHeight);
  }

  function drawBoard(cells) {
    var canvas = document.getElementById("c");
    var context = canvas.getContext("2d");
    var x = 0;
    var y = 0;
    var p = 0; // piece count
    var c = 0;
    for (var index = 0; index < cells.length; index++) {
      if (cells[index] == 1) {
        context.fillStyle = "#ffffff";
        context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
      } else {
        if (y > HEIGHT * CELL_SIZE - 400) {
          context.fillStyle = "rgb(0, 0, " + c + ")";
        } else {
          context.fillStyle = "rgb(0, 0, 0)";
        }

        context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
      }
      x += CELL_SIZE;
      p += 1; // next piece
      if (p == WIDTH) {
        // start next line
        y += CELL_SIZE;
        x = 0;
        p = 0;
        if (c <= 255 && y > HEIGHT * CELL_SIZE - 400) {
          c += 1;
        }
      }
    }
  }
});
