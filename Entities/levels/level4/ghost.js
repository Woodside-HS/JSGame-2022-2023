class Ghost{
  constructor(x, y, platformWidth, h, w) {
    this.loc = new JSVector(x, y - h); //enemies location, does change
    this.vel = new JSVector(0,0);
    this.acc = new JSVector(0,0);
    this.hide = false;
    this.h = h;
    this.w = w;
    this.indc = 0;
    this.look = false;
    this.isdead = false;
    this.speed = 1.5;
    this.frames = [];
    this.groove = 0;//groove is the varible that counts down to switching games
    this.grooveId = 0;//grooveID is current frame that is being rendered
    //this.loadImages();
  }
  run() {
    this.render();
    this.move();
    this.checkHero();
    this.checkAttack();
    this.checkLook();
    this.checkCrucifix();
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
  move() {
  
    this.loc.add(this.vel);  
    let d = game.hero.loc.distance(this.loc)

      if(d < 200){
      this.acc = JSVector.subGetNew(game.hero.loc, this.loc)  
      }
      this.acc.normalize();
      if(d < 200)
      this.acc.multiply(.5);
      if(d>=200)
      this.acc.multiply(0);
      this.vel.limit(this.speed);
      this.vel.add(this.acc);
  } 

  checkLook() {
    if(game.clickingD)
    this.indc = 20;
    if(game.clickingA)
    this.indc = -20;
  
    if((this.indc > 0 && this.loc.x>game.hero.loc.x) || (this.indc < 0 && this.loc.x<game.hero.loc.x)){
      this.vel.limit(0)
      this.hide = true;
    } else {
      this.vel.limit(this.speed)
      this.hide = false;
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
    if(!this.hide)
    ctx.fillStyle = "white";
    if(this.hide)
    ctx.fillStyle = "rgb(255,255,255,.1)"
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

  checkCrucifix(){
    let d = game.hero.loc.distance(this.loc);
    if(game.hero.inventory.crucifix && d < 75)
    game.levels[3].enemies.splice(0,1);
  }
}
