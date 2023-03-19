class DoubleCoins extends Coin {
  constructor(x, y, width, radius) {
    super(x, y, width, radius);
    this.clr = "orange";
  }

  render() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y - this.bounce, this.size, 0, Math.PI * 2);
    ctx.closePath(); //beginning and closing path just to be sure
    ctx.fillStyle = this.clr;
    ctx.fill();
    ctx.restore();
  }

  checkHero() {
    let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
    let heroH = game.hero.height; // the heros height
    let heroW = game.hero.width; // the heros width
    if (
      //checks if the heros location is overlaping with powerup
      heroLoc.x + heroW > this.loc.x &&
      heroLoc.x < this.loc.x + this.size &&
      heroLoc.y + heroH > this.loc.y &&
      heroLoc.y < this.loc.y + this.size
    ) {
      this.collected = true;
      game.hero.inventory.dbCoin = true;
    }
  }
}
