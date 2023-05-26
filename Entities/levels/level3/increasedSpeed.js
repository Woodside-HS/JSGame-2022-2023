class IncreasedSpeed{
    constructor(x, y, width, radius) {
      this.clr = "pink";
      this.counter = 0;
      let location = Math.floor(Math.random() * width);
      this.loc = new JSVector(x + location, y - 30);
      this.bounce = 0;
      this.bounceAmount = -0.05;
      this.size = radius;
      this.collected = false;
      this.img = document.createElement("img");
      this.img.src = "Images/Level3/increasedSpeed.png";
    }

    run() {
      if(!this.collected){
      this.bounceCoin();
      this.render();
      this.checkHero();
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
      ctx.drawImage(this.img, this.loc.x, this.loc.y, 30, 30);
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
        game.speed *=2;
        this.counter = 105;
        game.hero.inventory.invulnerability = true;
      }
      if(this.counter>5){
        this.counter--;
      }
      else if (this.counter > 0 && this.counter<5){
        this.counter == 0;
        game.speed *=0.5;
        game.hero.inventory.invulnerability = false;

      }
    }

  }
  