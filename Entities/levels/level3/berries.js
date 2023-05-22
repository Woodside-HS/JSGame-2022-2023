class Berries{
    constructor(x, y){
        this.crazeFactor = 0.1; //Berries make bears go... crazy
        this.loc = new JSVector(x, y);
        this.loc.y -= 24;
        this.collected = false;
        this.size = 24;
        this.img = document.createElement("img");
        this.img.src = "Images/Level3/berries.png";

    }

    run(){
        if(!this.collected){
            this.render();
            this.checkHero();
        }

    }

    checkHero(){
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        if (
          heroLoc.x + heroW > this.loc.x &&
          heroLoc.x < this.loc.x + this.size &&
          heroLoc.y + heroH > this.loc.y &&
          heroLoc.y < this.loc.y + this.size
        ) {
            game.levels[2].craze += this.crazeFactor; //bears will check against craze factor
            game.hero.statusBlock.coins++; //berries function as coins despite their negative side effect
            this.collected = true;
        }
    }

    render(){
        ctx.drawImage(this.img, this.loc.x, this.loc.y, 24,24);
        
    }

}