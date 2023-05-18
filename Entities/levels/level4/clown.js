class Clown{
  constructor(x, y, platformWidth, h, w) {
    this.loc = new JSVector(x, y - h); //enemies location, does change
    this.pLoc = new JSVector(x, y); //platforms location, should not change
    this.pWidth = platformWidth;
    this.h = h;
    this.w = w;
    this.move = 3; // the speed of the enemy movement
    this.isdead = false;
    this.frames = [];
    this.groove = 0;//groove is the varible that counts down to switching games
    this.grooveId = 0;//grooveID is current frame that is being rendered
    //this.loadImages();
  }
  run() {
    this.render();
    this.movePlatform();
    this.checkHero();
    this.checkAttack();
  }
  /*loadImages(){
    for(let i= 0; i<=12;i++){
      //the 12 has to be hardcoded inn
      this.frames[i] = document.createElement("img");
      this.frames[i].src  = "resources/enemy/el"+i+".png";
    }
  }*/
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
    if (this.loc.x > this.pLoc.x + this.pWidth - 45) {
      //if the enemy goes to far the movement type gets reversed
      this.move = -this.move;
    }
    if (this.loc.x < this.pLoc.x) {
      //does not need to add size because loc is top left
      this.move = -this.move;
    }
  }
  render() {
    /*this.groove++;
    if(this.groove%5 == 0){
      this.grooveId++;
      if(this.grooveId == 13){
        this.grooveId = 0;
      }
    }
    if(this.move < 0){
      ctx.drawImage(this.frames[this.grooveId], this.loc.x, this.loc.y, 45, 35);
    } else {
      ctx.save();
      ctx.translate(this.loc.x+45, this.loc.y);
      ctx.scale(-1,1);
      ctx.drawImage(this.frames[this.grooveId], 0, 0, 45, 35);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.restore();
    }*/
    
    ctx.save(); //renders as simple box for now
    ctx.beginPath();
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(this.loc.x + this.w, this.loc.y);
    ctx.lineTo(this.loc.x + this.w, this.loc.y + this.h);
    ctx.lineTo(this.loc.x, this.loc.y + this.h);
    ctx.closePath();
    ctx.fillStyle = "red";
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
