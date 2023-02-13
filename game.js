class Game {
  constructor() {
    this.gamePaused = false;
    this.ga = new GameArea();
    this.levels = [];
    this.hero = new Hero();
    this.dims = {
      top: 0,
      bottom: 600,
      left: 0,
      right: 2000,
      width: 2000,
      height: 600
    }
  }
  update = function () {
    if (gameState == 0) {

    } else if (gameState == 1) {
      this.hero.run()
      this.levels[1].run();
    }

  }
}//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  end Ball constructor
