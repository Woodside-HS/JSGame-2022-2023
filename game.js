class Game {
  constructor() {
    // Initiate a new GameArea
    this.ga = new GameArea();
    this.levels = [];
    this.start = new JSVector(200, 200);
    this.hero = new Hero(this.start.x, this.start.y);
    this.camLoc = new JSVector(0, 0);

    [this.gamePaused, this.clickingA, this.clickingD, this.mouseDown].fill(
      false
    );

    this.dims = {
      top: 0,
      bottom: 600,
      left: 0,
      right: 2000,
      width: 2000,
      height: 600,
    };

    this.levels[0] = new Levels(1);
    this.levels[1] = new Levels(2);
  }

  update = () => {
    this.moveCam();
    gameState == 0
      ? this.menuScreen()
      : gameState == 1
      ? this.playState()
      : this.endState();
  };

  menuScreen = () => {
    this.hero.statusBlock.isDead = false;
    this.hero.loc = this.start;
    this.camLoc.Zero();
    drawText(
      ctx,
      "click 'tile 1' to play ",
      "50px serif",
      200,
      200,
      "green",
      "red"
    );
  };

  playState = () => {
    ctx.save();
    this.camLoc.x = lerp(this.camLoc.x, this.hero.loc.x - 200, 0.05);
    ctx.translate(-this.camLoc.x, -this.camLoc.y);
    this.hero.run();
    this.levels[0].run();
    ctx.restore();
  };

  endState = () => {
    ctx.save();
    ctx.translate(-this.camLoc.x, -this.camLoc.y);
    this.hero.loc.x = this.camLoc.x + 200;
    stopMovement = false;
    this.hero.run();
    this.levels[1].run();
    ctx.restore();
  };

  moveCam = () => {
    this.clickingA && !hittingRight ? (this.hero.loc.x -= 2) : null;
    this.clickingD && !hittingLeft ? (this.hero.loc.x += 2) : null;
  };
}
