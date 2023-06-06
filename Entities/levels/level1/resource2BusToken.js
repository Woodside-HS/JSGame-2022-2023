class lvl1Resource2{
    //will be a bus token, have like 15 tokens, will only need like 12 to end the game
    constructor(x,y){
        this.loc = new JSVector(x,y);
        this.img = document.createElement("img");
        this.img.src = "Images/Level1/Lvl1Resource/lvl1BusTicket.png"
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
        let sightSq = 45*45;//ive manually increaased the grab range for these
        let dist = this.loc.distanceSquared(game.hero.loc);
        if(dist<sightSq){
            this.collected = true;
            game.levels[0].tokens++;
            //incraments the amount of tokens that you have
        }
    }
    render(){
        //will be a token that kinda floats
        //no
        ctx.drawImage(this.img,this.loc.x-10,this.loc.y-10,20,20);
    }
}