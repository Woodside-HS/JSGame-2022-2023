// global variables for canvas and context
var game, canvas, ctx, gameState;
var stopMovement = false;
var hittingRight, hittingLeft; // variables to keep the hero from moving through the platform
var lastFrameTime = 0;
var targetFPS = 75;
var fps;

window.onload = init; // After the window has been loaded, go to init

var debugView = false;
var showHitBox = false;

function init() {
  canvas = document.createElement("canvas");
  canvas.style.border = "solid black 2px";
  canvas.style.backgroundColor = "rgba(0,0,0, .95)";
  canvas.width = 1096; // 800 - 4 for the border
  canvas.height = 696; // 700 - 4 for the border
  ctx = canvas.getContext("2d"); // This is the context
  game = new Game();
  // setting defaults of variables
  gameState = 0; // gameState controls where the player is, 0 is main menu, 1 is 1st level, etc
  hittingRight = false;
  hittingLeft = false;
  animate();
}

function animate(currentTime) {
  var delta = currentTime - lastFrameTime;

  // // Limit the frame rate to the target FPS
  // if (delta > 1000 / targetFPS) {
  //   lastFrameTime = currentTime;

  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   debugUpdate();
  //   game.update();

  //   // Calculate FPS and display it
  //   fps = calculateFPS(delta);
  //   displayFPS(fps);
  // }



  ctx.clearRect(0, 0, canvas.width, canvas.height);
  debugUpdate();
  game.update();
  fps = calculateFPS(delta);
  displayFPS(fps);
  lastFrameTime = currentTime;

  requestAnimationFrame(animate);
}

function calculateFPS(delta) {
  fps = 1000 / delta; // FPS = 1 / frameTime (frameTime in seconds)
  return fps.toFixed(2); // Use toFixed to round and keep only two decimal places
}

function debugUpdate() {
  if (debugView) {
    const playerLoc = document.getElementById("PlayerLoc");
    playerLoc.textContent = "Player location:" + game.hero.loc;

    const playerVel = document.getElementById("PlayerVel");
    playerVel.textContent = "Player Vel:" + game.hero.vel;

    const playerCursorLoc = document.getElementById("PlayerCursorLoc");
    playerCursorLoc.textContent = "Player CursorLoc:" + game.hero.playerCursorLoc;

    const playerHP = document.getElementById("PlayerHP");
    playerHP.textContent = "Player HP:" + game.hero.statusBlock.hp;

    const playerCoins = document.getElementById("PlayerCoins");
    playerCoins.textContent = "Player Coins:" + game.hero.statusBlock.coins;
  } else {
    const div = document.getElementById("debugDiv");
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  }
}

function displayCoinCount() {
  const coinCountElement = document.getElementById("coin-count");
  coinCountElement.innerHTML = game.hero.statusBlock.coins.toString();
}

function displayFPS(fps) {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText("FPS: " + fps, canvas.width - 10, 10);
}
