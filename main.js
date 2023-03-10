//physical stuff
let world;
let gravity = 9.8;
let airResistance = 0.02;


//init
window.onload = init;

function init() {
  world = new World();
  animate();
}

function animate() {

  world.run();
  document.getElementById("CanvasLoc").innerHTML = "CanvasLoc: " + world.cnvLoc;
  document.getElementById("PlayerLoc").innerHTML = "PlayerLoc: " + world.player.loc;
  document.getElementById("PlayerHorizontal").innerHTML = "PlayerXVel: " + world.player.vel.x;
  document.getElementById("PlayerVertical").innerHTML = "PlayerYVel: " + world.player.vel.y;
  document.getElementById("Tick").innerHTML = "Tick: " + world.tick;
  document.getElementById("JumpTick").innerHTML = "Jump Tick: " + world.player.jumpAnimTick;
  document.getElementById("CharCurr").innerHTML = "Current Anim Frame: " + world.player.charCurr;
  document.getElementById("CurrentAnim").innerHTML = "Current Anim: " + world.player.charAnimCurr;
  requestAnimationFrame(animate);
}

function randomNumber(min, max) {
  let rdm = Math.random() * (max - min) + min;
  return rdm;
}

function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

function getRandomColor() {
  let r = Math.floor(randomNumber(0, 255));
  let g = Math.floor(randomNumber(0, 255));
  let b = Math.floor(randomNumber(0, 255));
  let color = RGBToHex(r, g, b);
  return color;
}

function lerp(start, end, t) {
  return (1 - t) * start + t * end;
}

