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

    this.levels[0] = new Levels()

  }
  update = function () {
    this.moveCam();
    if (gameState == 0) {

    } else if (gameState == 1) {
      ctx.save();
      ctx.translate(-this.camLoc.x, -this.camLoc.y);//moves the "camera" along the canvas
      this.hero.loc.x = this.camLoc.x + 200;
      //moves the hero with the camera, temporarilly disabled to make sure level works
      this.hero.run();
      this.levels[0].run();
      ctx.restore();

    }

  }

  moveCam() {
    //changed to move the hero
    //if the hero gets too far to one side the camera follows him
    if (this.clickingA) {
      this.camLoc.x--;
    }
    if (this.clickingD) {
      this.camLoc.x++;
    }
  }
}//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  end Ball constructor
