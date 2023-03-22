class Enemy {
  constructor(x, y, platformWidth, h, w) {
    this.loc = new JSVector(x, y - h); //enemies location, does change
    this.pLoc = new JSVector(x, y); //platforms location, should not change
    this.pWidth = platformWidth;
    this.h = h;
    this.w = w;
    this.move = 1; // the speed of the enemy movement
    this.isdead = false;
  }
  run() {
    this.render();
    this.movePlatform();
    this.checkHero();
    this.checkAttack();
  }
  checkAttack() {
    if (game.hero.statusBlock.isAttacking) {
      //currently only works if enemy is on right side of hero
      if (
        this.loc.x > game.hero.loc.x &&
        this.loc.x < game.hero.loc.x + 80 &&
        game.hero.posNeg
      ) {
        //enemy is within attack bounds
        if (
          this.loc.y > game.hero.loc.y &&
          this.loc.y < game.hero.loc.y + game.hero.height
        ) {
          this.isdead = true;
        }
      } else if (
        this.loc.x < game.hero.loc.x &&
        this.loc.x > game.hero.loc.x - 40
      ) {
        //enemy is within attack bounds
        if (
          this.loc.y > game.hero.loc.y &&
          this.loc.y < game.hero.loc.y + game.hero.height
        ) {
          this.isdead = true;
        }
      }
    }
  }
  movePlatform() {
    this.loc.x += this.move;
    if (this.loc.x > this.pLoc.x + this.pWidth - this.w) {
      //if the enemy goes to far the movement type gets reversed
      this.move = -1;
    }
    if (this.loc.x < this.pLoc.x) {
      //does not need to add size because loc is top left
      this.move = 1;
    }
  }
  render() {
    ctx.save(); //renders as simple box for now
    ctx.beginPath();
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(this.loc.x + this.w, this.loc.y);
    ctx.lineTo(this.loc.x + this.w, this.loc.y + this.h);
    ctx.lineTo(this.loc.x, this.loc.y + this.h);
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.restore();
  }

  checkHero() {
    let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
    let heroH = game.hero.height; // the heros height
    let heroW = game.hero.width; // the heros width
    if (
      //checks if the heros location is overlaping with the coin/thing
      heroLoc.x + heroW > this.loc.x &&
      heroLoc.x < this.loc.x + this.w &&
      heroLoc.y + heroH > this.loc.y &&
      heroLoc.y < this.loc.y + this.h
    ) {
      if(!game.hero.inventory.invulnerability){
      game.hero.statusBlock.hp--;
      }
    }
  }
}
