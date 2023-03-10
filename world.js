function World() {

  this.cnv = document.getElementById('cnv1');
  this.ctx = this.cnv.getContext('2d');
  //  vector to locate canvas in the world




  this.dims = {
    top: 0,
    left: 0,
    bottom: 600,
    right: 2400,
    width: 2400,
    height: 600
  }

  this.cnvLoc = new JSVector(0, 0);

  this.platforms = [];
  this.platforms[0] = new Platform(0, 300, 100, this.ctx, this.cnvLoc);
  this.platforms[1] = new Platform(125, 325, 75, this.ctx, this.cnvLoc);
  this.platforms[2] = new Platform(250, 350, 50, this.ctx, this.cnvLoc);
  this.platforms[3] = new Platform(325, 400, 75, this.ctx, this.cnvLoc);
  this.platforms[4] = new Platform(450, 375, 50, this.ctx, this.cnvLoc);
  this.platforms[5] = new Platform(525, 350, 100, this.ctx, this.cnvLoc);
  this.platforms[6] = new Platform(650, 375, 25, this.ctx, this.cnvLoc);
  this.platforms[7] = new Platform(700, 350, 25, this.ctx, this.cnvLoc);
  this.platforms[8] = new Platform(750, 325, 25, this.ctx, this.cnvLoc);
  this.platforms[9] = new Platform(825, 300, 50, this.ctx, this.cnvLoc);
  this.platforms[10] = new Platform(900, 275, 100, this.ctx, this.cnvLoc);
  this.platforms[11] = new Platform(1050, 250, 25, this.ctx, this.cnvLoc);
  this.platforms[12] = new Platform(1100, 275, 75, this.ctx, this.cnvLoc);
  this.platforms[13] = new Platform(1225, 300, 75, this.ctx, this.cnvLoc);
  this.platforms[14] = new Platform(1325, 325, 100, this.ctx, this.cnvLoc);
  this.platforms[15] = new Platform(1475, 300, 25, this.ctx, this.cnvLoc);
  this.platforms[16] = new Platform(1525, 275, 50, this.ctx, this.cnvLoc);
  this.platforms[17] = new Platform(1575, 250, 25, this.ctx, this.cnvLoc);
  this.platforms[18] = new Platform(1625, 225, 50, this.ctx, this.cnvLoc);
  this.platforms[19] = new Platform(1725, 200, 100, this.ctx, this.cnvLoc);
  this.platforms[20] = new Platform(1850, 225, 25, this.ctx, this.cnvLoc);
  this.platforms[21] = new Platform(1900, 275, 100, this.ctx, this.cnvLoc);
  this.platforms[22] = new Platform(2025, 250, 50, this.ctx, this.cnvLoc);
  this.platforms[23] = new Platform(2125, 275, 75, this.ctx, this.cnvLoc);
  this.platforms[24] = new Platform(2250, 300, 150, this.ctx, this.cnvLoc);

  this.powerups = [];
  this.powerups[0] = new DoubleJump(350, 350, this.ctx, this);
  
  this.worldMovingRight = false;
  this.worldMovingLeft = false;
  this.ms = .5;




}//++++++++++++++++++++++++++++++  end world constructor


// run the world in animation
World.prototype.run = function () {
  let ctx = this.ctx;
  ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
  displayCoinCount();
  if (!hero.death) {
    ctx.save();
    ctx.translate(-this.cnvLoc.x, -this.cnvLoc.y);
    for (let i = 0; i < this.platforms.length; i++) {
      this.platforms[i].run();
    }
  for(let i = 0; i<this.powerups.length; i++){
    this.powerups[i].run();
  }
  ctx.restore();
  hero.run();
}  //if dead hero statement
  if(this.worldMovingRight){
    this.cnvLoc.x += this.ms;
  }
  if(this.worldMovingLeft){
    this.cnvLoc.x -= this.ms;
  }
} //run function


World.prototype.getRandomColor = function () {
  //  List of hex color values for movers
  let colors = [
    "#7102AB",
    "#ab0256",
    "#0285ab",
    "#02ab1a",
    "#ab5302",
    "#773e26",
    "#ab0256",
    "#257874",
    "#78254e",
    "#787725"
  ];
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}