// global variables for canvas and context
var game, canvas, ctx, gameState;
window.onload = init;//  After the window has been loaded, go to init

function init() {
  canvas = document.createElement('canvas');
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0, .95)';
  canvas.width = 1096;  // 800 - 4 for the border
  canvas.height = 696; // 700 - 4 for the border
  ctx = canvas.getContext('2d'); // This is the context
  game = new Game();
  gameState = 1;//gameState controls where the player is, 0 is main menu, 1 is 1st level, etc
  animate();
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //ctx.fillStyle = 'rgba(0,0,0,.05)'
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  game.update();
  requestAnimationFrame(animate);

}

window.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "KeyA":
      game.clickingA = true;
      break;

    case "KeyD":
      game.clickingD = true
      break;

    case "KeyQ":

      break;
    case "Space":
      game.hero.jump();
      break;
  }
}, false);

window.addEventListener("keyup", function (event) {
  switch (event.code) {

    case "KeyA":
      game.clickingA = false;
      break;
    case "KeyD":
      game.clickingD = false;
      break;

    case "KeyQ":
      break;
  }
}, false);

window.addEventListener('mousedown', function (event) {
  // game.mouseDown = true;
  game.hero.attack();
}, false);

// window.addEventListener("mouseup", function (event) {
//   game.mouseDown = false;
// }, false);

