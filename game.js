class Game {
  constructor() {
    // Initiate a new GameArea
    this.ga = new GameArea();
    this.levels = [];
    this.start = new JSVector(200, 200);
    this.hero = new Hero(this.start.x, this.start.y);
    this.camLoc = new JSVector(0, 0);
    this.speed = 2;
    this.unique = 0;
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

    this.levels[0] = new level1(1);
    this.levels[1] = new level2(2);
    this.levels[2] = new level3(3);
    this.levels[4] = new level5(5);

  }

  update = () => {
    if (this.speed > 6) {
      this.speed = 6;
    }
    this.moveCam();
    if (gameState == 0) {
      this.menuScreen();
    }
    else if (gameState >= 1) { //gameState is equal to the level
      if (this.hero.statusBlock.isDead && gameState > 0) {
        this.getNewLevelInstance(gameState);
        this.speed = 2;
        this.hero.statusBlock.isDead = false;
        this.hero.loc = this.hero.originalLoc;
      }
      this.playState(gameState);
    }
    else {
      this.endState();
    }
    document.getElementById("coin-count").innerHTML = this.hero.statusBlock.coins;
    if (gameState == 1) {
      document.getElementById("resource-count").innerHTML = this.unique;//adds a counter for the unique resource of each level;
      //for now only set up to run in my level
      //if statement doesnt work lmao
    }
  };

  getNewLevelInstance(levelNum) { // resets teh level and the hero
    switch (levelNum) {
      case 1:
        this.levels[0] = new level1(1);
        this.hero = new Hero(200, 200);
        break;
      case 2:
        this.levels[1] = new level2(2);
        this.hero = new Hero(200, 200);
        break;
      case 3:
        this.levels[2] = new level3(3);
        this.hero = new Hero(200, 200);
        break;
      case 4:
        this.levels[3] = new level4(4);
        this.hero = new Hero(200, 200);
        break;
      case 5:
        this.levels[4] = new level5(5);
        this.hero = new Hero(200, 200);
        break;
      case 6:
        this.levels[5] = new level6();
        this.hero = new Hero(200, 200);
        break;
    }
  }

  // Game state 0
  menuScreen = () => {
    // Set the hero's status to not dead, the hero's location to the starting position, and reset the camera position
    this.hero.statusBlock.isDead = false;
    this.hero.loc = this.start;
    this.camLoc.Zero();
    drawText(ctx, "click 'tile 1' to play ", "50px serif", 200, 200, "green", "red"
    );
  };

  playState = (a) => {
    ctx.save();
    // Camera follow player
    this.camLoc.x = lerp(this.camLoc.x, this.hero.loc.x - 200, 0.05);
    ctx.translate(-this.camLoc.x, -this.camLoc.y);
    this.levels[a - 1].background.run();//since there is only one background object, then only need to run this once
    //need to run background before everything else
    this.hero.run();
    this.levels[1].run();
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
    if (this.clickingA && !hittingRight) {
      this.hero.loc.x -= this.speed;
    }
    else {
      null;
    }
    if (this.clickingD && !hittingLeft) {
      this.hero.loc.x += this.speed;
    }
    else {
      null;
    }
  };
}
