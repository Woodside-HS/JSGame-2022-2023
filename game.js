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

    // Set the dimensions of the game area
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
      if(gameState == 0){
        this.menuScreen();
      }
      else if(gameState == 1){
        this.playState();
      }
      else{
        this.endState();
      }
  };

  // Game state 0
  menuScreen = () => {
    // Set the hero's status to not dead, the hero's location to the starting position, and reset the camera position
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

  // Game state 1
  playState = () => {
    ctx.save();
    // Camera follow player
    this.camLoc.x = lerp(this.camLoc.x, this.hero.loc.x - 200, 0.05);
    ctx.translate(-this.camLoc.x, -this.camLoc.y);
    this.levels[0].runBG();//needs to run the backgroiund first for everything else to be overlayed
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
    // Susbtitude Event handlers
    if(this.clickingA && !hittingRight && this.hero.loc.x >200){
      this.hero.loc.x -= 2
     }
     else{
      null;
     }
    if(this.clickingD && !hittingLeft && this.hero.loc.x < 3750){
      this.hero.loc.x += 2
    }
    else{
      null;
    }
  };
}
