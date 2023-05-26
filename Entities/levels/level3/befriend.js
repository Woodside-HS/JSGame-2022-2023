class Befriend{
    constructor(x, y, width, radius) {
      let location = Math.floor(Math.random() * width);
      //so the coin is at a random locatio nalong the platfomr
      this.loc = new JSVector(x + location, y - 5);
      this.bounce = 0;
      this.bounceAmount = -0.05;
      this.size = radius;
      this.collected = false;
      this.coinClr = "brown";
      this.counter = 0;
    }
    run() {
      this.bounceCoin();
      this.render();
      this.checkHero();
      if(this.counter > 1){
        this.counter--;
      }
      else if(this.counter == 1){
        for(let i = 0; i< level3.enemies.length; i++){
            level3.enemies.docile = false;
           }
        this.counter--; 
      }
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
      ctx.fillStyle = this.coinClr;
      ctx.fill();
      ctx.restore();
    }

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
        for(let i = 0; i< level3.enemies.length; i++){
            level3.enemies.docile = true;
           }
        this.collected = true;
        this.counter = 200;
  
        displayCoinCount(); //displays the coin count
      }
    }
    
  }
  