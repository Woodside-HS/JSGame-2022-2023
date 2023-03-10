//physical stuff
let world;
let gravity = 9.8;
let airResistance = 0.02;

//global assets & resource delcaration

//images
let background1 = new Image();
let background2 = new Image();
let background3 = new Image();
background1.src = "assets/background1.png";
background2.src = "assets/background2.png";
background3.src = "assets/background3.png";

let gameOverScreen = new Image();
gameOverScreen.src = "assets/gameover.jpeg";

let bomb = new Image();
bomb.src = "assets/bomb.png"

let youWinScreen = new Image();
youWinScreen.src = "assets/youwin.png";

let darkness = new Image();
darkness.src = "assets/darkness.png";

let heartBack = new Image();
let heartFore = new Image();
let regen = new Image();
heartBack.src = "assets/health/health_bar_decoration.png";
heartFore.src = "assets/health/health_bar.png";
regen.src = "assets/health/regen.png";

let platform = new Image();
platform.src = "assets/platform.png"

let charIdle1 = new Image();
let charIdle2 = new Image();
let charIdle3 = new Image();
charIdle1.src = "assets/character/adventurer-idle-00.png";
charIdle2.src = "assets/character/adventurer-idle-01.png";
charIdle3.src = "assets/character/adventurer-idle-02.png";
let charIdleImgs = [charIdle1, charIdle2, charIdle3];
let charIdleIndex = 0;


let charRun1 = new Image();
let charRun2 = new Image();
let charRun3 = new Image();
let charRun4 = new Image();
let charRun5 = new Image();
let charRun6 = new Image();
charRun1.src = "assets/character/adventurer-run-00.png";
charRun2.src = "assets/character/adventurer-run-01.png";
charRun3.src = "assets/character/adventurer-run-02.png";
charRun4.src = "assets/character/adventurer-run-03.png";
charRun5.src = "assets/character/adventurer-run-04.png";
charRun6.src = "assets/character/adventurer-run-05.png";
let charRunImgs = [charRun1, charRun2, charRun3, charRun4, charRun5, charRun6];
let charRunIndex = 1;

let charSlide1 = new Image();
let charSlide2 = new Image();
let charSlide3 = new Image();
let charSlide4 = new Image();
let charSlide5 = new Image();
charSlide1.src = "assets/character/adventurer-slide-00.png";
charSlide2.src = "assets/character/adventurer-slide-01.png";
charSlide3.src = "assets/character/adventurer-stand-00.png";
charSlide4.src = "assets/character/adventurer-stand-01.png";
charSlide5.src = "assets/character/adventurer-stand-02.png";
let charSlideImgs = [charSlide1, charSlide2, charSlide3, charSlide4, charSlide5];
let charSlideIndex = 2;

let charJump1 = new Image();
let charJump2 = new Image();
let charJump3 = new Image();
let charJump4 = new Image();
charJump1.src = "assets/character/adventurer-jump-00.png";
charJump2.src = "assets/character/adventurer-jump-01.png";
charJump3.src = "assets/character/adventurer-jump-02.png";
charJump4.src = "assets/character/adventurer-jump-03.png";
let charJumpImgs = [charJump1, charJump2, charJump3, charJump4]
let charJumpIndex = 3;

let charAttack11 = new Image();
let charAttack12 = new Image();
let charAttack13 = new Image();
let charAttack14 = new Image();
let charAttack15 = new Image();
charAttack11.src = "assets/character/adventurer-attack1-00.png"
charAttack12.src = "assets/character/adventurer-attack1-01.png"
charAttack13.src = "assets/character/adventurer-attack1-02.png"
charAttack14.src = "assets/character/adventurer-attack1-03.png"
charAttack15.src = "assets/character/adventurer-attack1-04.png"
let charAttack1Imgs = [charAttack11, charAttack12, charAttack13, charAttack14, charAttack15]
let charAttack1Index = 4;

let charAttack21 = new Image();
let charAttack22 = new Image();
let charAttack23 = new Image();
let charAttack24 = new Image();
let charAttack25 = new Image();
let charAttack26 = new Image();
charAttack21.src = "assets/character/adventurer-attack2-00.png"
charAttack22.src = "assets/character/adventurer-attack2-01.png"
charAttack23.src = "assets/character/adventurer-attack2-02.png"
charAttack24.src = "assets/character/adventurer-attack2-03.png"
charAttack25.src = "assets/character/adventurer-attack2-04.png"
charAttack26.src = "assets/character/adventurer-attack2-05.png"
let charAttack2Imgs = [charAttack21, charAttack22, charAttack23, charAttack24, charAttack25, charAttack26]
let charAttack2Index = 5;

let charAttack31 = new Image();
let charAttack32 = new Image();
let charAttack33 = new Image();
let charAttack34 = new Image();
let charAttack35 = new Image();
let charAttack36 = new Image();
charAttack31.src = "assets/character/adventurer-attack3-00.png"
charAttack32.src = "assets/character/adventurer-attack3-01.png"
charAttack33.src = "assets/character/adventurer-attack3-02.png"
charAttack34.src = "assets/character/adventurer-attack3-03.png"
charAttack35.src = "assets/character/adventurer-attack3-04.png"
charAttack36.src = "assets/character/adventurer-attack3-05.png"
let charAttack3Imgs = [charAttack31, charAttack32, charAttack33, charAttack34, charAttack35, charAttack36]
let charAttack3Index = 6;



let playerAnims = [charIdleImgs, charRunImgs, charSlideImgs, charJumpImgs, charAttack1Imgs, charAttack2Imgs, charAttack3Imgs];

let goblinRun1 = new Image();
let goblinRun2 = new Image();
let goblinRun3 = new Image();
let goblinRun4 = new Image();
let goblinRun5 = new Image();
let goblinRun6 = new Image();
goblinRun1.src = "assets/goblin/goblin-run-00.png";
goblinRun2.src = "assets/goblin/goblin-run-01.png";
goblinRun3.src = "assets/goblin/goblin-run-02.png";
goblinRun4.src = "assets/goblin/goblin-run-03.png";
goblinRun5.src = "assets/goblin/goblin-run-04.png";
goblinRun6.src = "assets/goblin/goblin-run-05.png";
let goblinRunImgs = [goblinRun1, goblinRun2, goblinRun3, goblinRun4, goblinRun5, goblinRun6];
let goblinRunIndex = 0;

let goblinAnims = [goblinRunImgs];

let move1 = new Image();
let move2 = new Image();
let move3 = new Image();
let move4 = new Image();
let move5 = new Image();
let move6 = new Image();
let move7 = new Image();
let move8 = new Image();
let move9 = new Image();
let move10 = new Image();
let move11 = new Image();
let move12 = new Image();
let move13 = new Image();
let move14 = new Image();
let move15 = new Image();
let move16 = new Image();
let move17 = new Image();
let move18 = new Image();
let move19 = new Image();
let move20 = new Image();
let move21 = new Image();
let move22 = new Image();
let move23 = new Image();
let move24 = new Image();
let move25 = new Image();
let move26 = new Image();
let move27 = new Image();
let move28 = new Image();
move1.src = "assets/dialogue/move/1.gif";
move2.src = "assets/dialogue/move/2.gif";
move3.src = "assets/dialogue/move/3.gif";
move4.src = "assets/dialogue/move/4.gif";
move5.src = "assets/dialogue/move/5.gif";
move6.src = "assets/dialogue/move/6.gif";
move7.src = "assets/dialogue/move/7.gif";
move8.src = "assets/dialogue/move/8.gif";
move9.src = "assets/dialogue/move/9.gif";
move10.src = "assets/dialogue/move/10.gif";
move11.src = "assets/dialogue/move/11.gif";
move12.src = "assets/dialogue/move/12.gif";
move13.src = "assets/dialogue/move/13.gif";
move14.src = "assets/dialogue/move/14.gif";
move15.src = "assets/dialogue/move/15.gif";
move16.src = "assets/dialogue/move/16.gif";
move17.src = "assets/dialogue/move/17.gif";
move18.src = "assets/dialogue/move/18.gif";
move19.src = "assets/dialogue/move/19.gif";
move20.src = "assets/dialogue/move/20.gif";
move21.src = "assets/dialogue/move/21.gif";
move22.src = "assets/dialogue/move/22.gif";
move23.src = "assets/dialogue/move/23.gif";
move24.src = "assets/dialogue/move/24.gif";
move25.src = "assets/dialogue/move/25.gif";
move26.src = "assets/dialogue/move/26.gif";
move27.src = "assets/dialogue/move/27.gif";
move28.src = "assets/dialogue/move/28.gif";
let moveDialogue = [move1, move2, move3, move4, move5, move6, move7, move8, move9, move10, move11, move12, move13, move14, move15, move16, move17, move18, move19, move20, move21, move22, move23, move24, move25, move26, move27, move28];

let jumpDialogue = [];
for (let i = 2; i < 51; i++) {
  let image = new Image();
  image.src = "assets/dialogue/jump/" + i + ".gif";
  jumpDialogue.push(image);
}

let slideDialogue = [];
for (let i = 1; i < 32; i++) {
  let image = new Image();
  image.src = "assets/dialogue/slide/" + i + ".gif";
  slideDialogue.push(image);
}

let killDialogue = [];
for (let i = 1; i < 34; i++) {
  let image = new Image();
  image.src = "assets/dialogue/kill/" + i + ".gif";
  killDialogue.push(image);
}

let Explosion = [];
for (let i = 2; i < 8; i++) {
  let image = new Image();
  image.src = "assets/explosion/explosion" + i + ".png";
  Explosion.push(image);
}

let blob = new Image();
blob.src = "assets/blob.png";

//music
//let backgroundMusic = new Audio('assets/scaryForest.mp3');




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

