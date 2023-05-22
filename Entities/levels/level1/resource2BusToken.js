class lvl1Resource2{
    //will be a bus token, have like 15 tokens, will only need like 12 to end the game
    constructor(x,y){
        this.loc = new JSVector(x,y);
        this.img;
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
            game.levels[0].tokens++;
            //incraments the amount of tokens that you have
        }
    }
    render(){
        //will be a token that kinda floats
        ctx.beginPath();
        ctx.moveTo(this.loc.x+5,this.loc.y+5);
        ctx.lineTo(this.loc.x-5,this.loc.y+5);
        ctx.lineTo(this.loc.x-5,this.loc.y-5);
        ctx.lineTo(this.loc.x+5,this.loc.y-5);
        ctx.closePath();
        ctx.fillStyle = "pink";
        ctx.fill();
    }
}