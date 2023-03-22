class Levels {
  constructor(id) {
    this.id = id;
    this.platforms = [];
    this.obstacles = [];
    this.loadPlatforms();
    this.bg1 = new JSVector(0, 0);
    this.bg2 = new JSVector(0, 0);
    this.bg3 = new JSVector(0, 0);
  }
  loadPlatforms() {
    //this function hard codes all of the platforms in by hand
    if (this.id == 1) {
      //first level
      this.platforms[0] = new Platform(
        -100,
        600,
        12000,
        10,
        "brown",
        false,
        false,
        0,
        0
      ); //ground platform
      //TODO need a barrier to keep player from going left
      this.platforms[1] = new Platform(
        400,
        500,
        200,
        10,
        "blue",
        false,
        true,
        0,
        false,
        0
      ); //first platform
      this.platforms[2] = new Platform(
        700,
        450,
        200,
        10,
        "blue",
        false,
        false,
        0,
        false,
        1
      ); //second platform
      this.platforms[3] = new Platform(
        1450,
        200,
        200,
        10,
        "blue",
        true,
        false,
        0,
        false,
        0
      ); //top platform with enemy
      this.platforms[4] = new Platform(
        650,
        250,
        100,
        10,
        "blue",
        false,
        true,
        0,
        false,
        2
      ); //upper left platform
      this.platforms[5] = new Platform(
        900,
        350,
        200,
        10,
        "blue",
        false,
        false,
        0,
        true,
        0
      ); //trap platform
      this.platforms[6] = new Platform(
        1200,
        400,
        300,
        10,
        "blue",
        false,
        false,
        0,
        false,
        3
      );
      //! when the height is below like 200(top of screen), it should generally be more difficult but have more coins
      this.platforms[7] = new Platform(
        1100,
        500,
        150,
        10,
        "blue",
        false,
        false,
        0,
        false,
        0
      );
      this.platforms[8] = new Platform(
        1150,
        150,
        150,
        10,
        "blue",
        true,
        true,
        0,
        false,
        0
      );
      this.platforms[9] = new Platform(
        1700,
        150,
        200,
        10,
        "blue",
        false,
        true,
        0,
        true,
        0
      );
      this.platforms[10] = new Platform(
        1650,
        450,
        150,
        10,
        "blue",
        false,
        false,
        0,
        true,
        0
      );
      this.platforms[11] = new Platform(
        1700,
        275,
        150,
        10,
        "blue",
        false,
        true,
        0,
        false,
        0
      );
      this.platforms[12] = new Platform(
        1900,
        325,
        150,
        10,
        "blue",
        false,
        true,
        0,
        false,
        1
      );
      this.platforms[13] = new Platform(
        2100,
        350,
        150,
        10,
        "blue",
        false,
        true,
        0,
        false,
        0
      );
      this.platforms[14] = new Platform(
        2400,
        250,
        150,
        10,
        "blue",
        false,
        true,
        0,
        false,
        2
      );
      this.platforms[15] = new Platform(
        2700,
        300,
        150,
        10,
        "blue",
        false,
        true,
        0,
        false,
        0
      );
      this.platforms[16] = new Platform(
        3000,
        325,
        150,
        10,
        "blue",
        false,
        true,
        0,
        false,
        3
      );
      this.platforms[17] = new Platform(
        3300,
        350,
        150,
        10,
        "blue",
        false,
        true,
        0,
        false,
        0
      );
      this.platforms[18] = new Platform(
        3600,
        275,
        150,
        10,
        "blue",
        false,
        true,
        0,
        false,
        0
      );
    }
    if (this.id == 2) {
      //level 2
      this.platforms[0] = new Platform(
        0,
        600,
        1000,
        10,
        "pink",
        true,
        true,
        0,
        true,
        false
      );
      this.platforms[1] = new Platform(
        1100,
        500,
        20,
        100,
        "orange",
        false,
        false,
        1,
        false,
        false
      );
    }
  }

  renderParralax() {
    //parallax
    //drawa bunch of backgrounds over and over again
    for (let i = 0; i < 10; i++) {
      ctx.drawImage(level1Bacgrkounds[0], this.bg1.x + canvas.width * i, this.bg1.y, canvas.width, canvas.height);
    }


    for (let i = 0; i < 10; i++) {
      ctx.drawImage(level1Bacgrkounds[1], this.bg2.x + canvas.width * i, this.bg2.y, canvas.width, canvas.height);
    }
    for (let i = 0; i < 10; i++) {
      ctx.drawImage(level1Bacgrkounds[2], this.bg3.x + canvas.width * i, this.bg3.y, canvas.width, canvas.height);
    }

    this.bg2.x = lerp(this.bg2.x, (game.hero.loc.x / 2) - game.start.x, 0.4);
    this.bg3.x = lerp(this.bg3.x, (game.hero.loc.x / 1.5) - game.start.x, 0.4);

  }
  run() {
    this.renderParralax();
    // console.log("level was run")
    this.runEntities();
  }
  runEntities() {
    for (let i = this.platforms.length - 1; i >= 0; i--) {
      //make sure to run for loops backwards to help with splicing
      this.platforms[i].run();
    }
  }
}
