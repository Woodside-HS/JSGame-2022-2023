class Game {
  constructor() {
    this.gamePaused = false;
    this.ga = new GameArea();
    this.levels = [];
    this.hero = new Hero();
    this.camLoc = new JSVector(0, 0);

    this.clickingA = false;
    this.clickingD = false;

    this.dims = {
      top: 0,
      bottom: 600,
      left: 0,
      right: 2000,
      width: 2000,
      height: 600
    }

    //! makes the first level
    this.levels[0] = new Levels()

  }
  update = function () {
    this.moveCam()
    if (gameState == 0) {

    } else if (gameState == 1) {
      ctx.save();
      ctx.translate(-this.camLoc.x, -this.camLoc.y);
      ctx.moveTo(200, 200);
      ctx.lineTo(250, 200)
      ctx.lineTo(250, 250)
      ctx.lineTo(200, 250)
      ctx.closePath()
      ctx.fillStyle = "green";
      ctx.strokeStyle = "black";
      ctx.fill();
      ctx.restore()
      this.hero.run()
      this.levels[0].run();
    }

  }

  moveCam() {
    if (this.clickingA) {
      this.camLoc.x--;
    }
    if (this.clickingD) {
      this.camLoc.x++;
    }
  }
}//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  end Ball constructor
