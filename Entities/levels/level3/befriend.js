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
      this.img = document.createElement("img");
      this.img.src = "Images/Level3/befriend.png";
    }
    run() {
      if(!this.collected){
      this.bounceCoin();
      this.render();
      this.checkHero();
      }
      if(this.counter > 1){
        this.counter--;
      }
      else if(this.counter == 1){
        for(let i = 0; i< game.levels[2].enemies.length; i++){
            game.levels[2].enemies.docile = false;
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
      ctx.drawImage(this.img, this.loc.x -30, this.loc.y - 20, 45, 45);
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
        for(let i = 0; i< game.levels[2].enemies.length; i++){
            game.levels[2].enemies[i].docile = true;
            game.levels[2].enemies[i].speed -=1;
           }
        this.collected = true;
        this.counter = 1000;
  
        displayCoinCount(); //displays the coin count
      }
    }
    
  }
  