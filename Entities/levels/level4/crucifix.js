class Crucifix {
    constructor(x, y, width, radius, id) {
        this.x = x;
        this.y = y;
        this.bounce = 3;
        this.size = 10;
        this.id = id;
      this.clr = "red";
    }


    run(){
        this.render();
        this.checkHero();
    }
  
    render() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x,this.y - this.bounce, this.size, 0, Math.PI * 2);
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
        heroLoc.x + heroW > this.x &&
        heroLoc.x < this.x + this.size &&
        heroLoc.y + heroH > this.y &&
        heroLoc.y < this.y + this.size
      ) {
        this.collected = true;
        game.hero.inventory.crucifix = true;
        game.levels[3].resources.splice(this.id,1);
      }
    }
  }
  