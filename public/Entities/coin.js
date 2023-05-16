class Coin {
  constructor(x, y, width, radius) {
    let location = Math.floor(Math.random() * width);
    //so the coin is at a random locatio nalong the platfomr
    this.loc = new JSVector(x + location, y - 5);
    this.bounce = 0;
    this.bounceAmount = -0.05;
    this.size = radius;
    this.collected = false;
    this.coinClr = "yellow";
  }
  run() {
    this.bounceCoin();
    this.render();
    this.checkHero();
  }
  bounceCoin() {
    //so the coin will move up and down gently
    this.bounce += this.bounceAmount;
    if (this.bounce >= 1) {
      this.bounceAmount = -0.1;
    }
    if (this.bounce <= -1) {
      this.bounceAmount = 0.1;
    }
  }
  render() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y - this.bounce, this.size, 0, Math.PI * 2);
    ctx.closePath(); //beginning and closing path just to be sure
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.restore();
  }
  // checkHero() {
  //     let dist = this.loc.distanceSquared(game.hero.loc);
  //     if (dist < game.hero.height * game.hero.height && this.isJumpBoost) { // checks if its a jumpboost
  //         game.hero.inventory.jumpBoost = true
  //         console.log("you got a jumpboost");
  //         this.collected = true;
  //     } else if (dist < game.hero.height * game.hero.height) { // if its not any other powerup itll be a coin.
  //         game.hero.statusBlock.coins++;
  //         console.log(game.hero.statusBlock.coins);
  //         this.collected = true;
  //     }
  // }

  checkHero() {
    let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
    let heroH = game.hero.height; // the heros height
    let heroW = game.hero.width; // the heros width
    if (
      //checks if the heros location is overlaping with the coin
      heroLoc.x + heroW > this.loc.x &&
      heroLoc.x < this.loc.x + this.size &&
      heroLoc.y + heroH > this.loc.y &&
      heroLoc.y < this.loc.y + this.size
    ) {
      game.hero.statusBlock.coins++;
      if (game.hero.inventory.dbCoin) {
        game.hero.statusBlock.coins++;
      }
      // console.log(game.hero.statusBlock.coins);
      this.collected = true;

      displayCoinCount(); //displays the coin count
    }
  }
}
