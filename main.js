// global variables for canvas and context
var game, canvas, ctx, gameState;
var hittingRight,hittingLeft;//varibles to keep the hero from moving thru the platform
window.onload = init;//  After the window has been loaded, go to init

function init() {
  canvas = document.createElement('canvas');
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,0,0, .95)';
  canvas.width = 1096;  // 800 - 4 for the border
  canvas.height = 696; // 700 - 4 for the border
  ctx = canvas.getContext('2d'); // This is the context
  game = new Game();
  //setting defaults of variables
  gameState = 1;//gameState controls where the player is, 0 is main menu, 1 is 1st level, etc
  hittingRight = false;
  hittingLeft = false;
  animate();
}
function increaseGameState(){
  console.log("increasing game state "+(gameState+1));
  //made a function because its funny
  gameState++;
  game.hero.loc.x = 200;
  game.hero.loc.y = 200;
  game.hero.vel.setMagnitude(0);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update();
  requestAnimationFrame(animate);
}


