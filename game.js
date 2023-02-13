class Game {
  constructor() {
    this.gamePaused = false;
    this.ga = new GameArea();
    this.levels = [];
    this.hero = new Hero();
  }
  update = function () {
    if (gameState == 0) {

    } else if (gameState == 1) {
      this.hero.run()
      this.levels[1].run();
    }

  }
}//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  end Ball constructor
