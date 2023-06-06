class lvl1Resource1{
    //will have coins throughout the level, maybe near end you can purchase bus tokens w/ coins or vise versa
    constructor(x,y){
        this.loc = new JSVector(x,y);
        //gonna have an array of a spinning coin eventually
        this.img = document.createElement("img");
        this.img.src = "Images/Level1/Lvl1Resource/lvl1Coin.png"
        this.collected = false;
    }
    run(){
        game.unique = game.levels[0].tokens;
        if(!this.collected){
            //only runs if havent been collected, wont splice out of array cause i am lazy
            this.checkHero();
            this.render();
        }
    }
    checkHero(){
        let sightSq = 25*25;
        let dist = this.loc.distanceSquared(game.hero.loc);
        if(dist<sightSq){
            this.collected = true;
            game.hero.statusBlock.coins++;
            //incraments the amount of tokens that you have
        }
    }
    render(){
        //"spin" the coin around no time
        ctx.drawImage(this.img,this.loc.x-10,this.loc.y-10,20,20);
    }
}