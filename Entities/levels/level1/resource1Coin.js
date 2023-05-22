class lvl1Resource1{
    //will have coins throughout the level, maybe near end you can purchase bus tokens w/ coins or vise versa
    constructor(x,y){
        this.loc = new JSVector(x,y);
        this.img;//gonna have an array of a spinning coin
        this.collected = false;
    }
    run(){
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
            game.hero.statusBlocks.coins++;
            //incraments the amount of tokens that you have
        }
    }
    render(){
        //"spin" the coin around
        ctx.arc(this.loc.x,this.loc.y,5,0,Math.PI*2);
        ctx.fillStyle = "red";
        ctx.fill();
    }
}