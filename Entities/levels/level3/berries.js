class Berries{
    constructor(x, y){
        this.crazeFactor = 0.1; //Berries make bears go... crazy
        this.loc = new JSVector(x, y);
        this.collected = false;
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
        if(this.loc.distance(hero.loc)<=20){ //hard coded, check later w/image added
            game.levels[2].craze += this.crazeFactor; //bears will check against craze factor
            game.hero.statusBlock.coins++; //berries function as coins despite their negative side effect
            this.collected = true;
        }
    }

    render(){
        ctx.drawImage(this.img, this.loc.x, this.loc.y);
        
    }

}