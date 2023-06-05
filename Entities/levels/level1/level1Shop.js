class lvl1Shop {
    constructor(x,y, cost){
        this.loc = new JSVector(x,y);
        this.cost = cost;
        this.img;//img tbd
    }
    run(){
        if(game.hero.loc.x > 4000){
            //cuts down on uncessary dist checks
            this.checkHero();
        }
        this.render();
    }
    render(){
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        ctx.lineTo(this.loc.x,this.loc.y+25);
        ctx.lineTo(this.loc.x+25,this.loc.y+25);
        ctx.lineTo(this.loc.x+25,this.loc.y);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
    }
    checkHero(){
        let sightSq = 100*100;
        let dist = this.loc.distanceSquared(game.hero.loc);
        if(dist<sightSq){
            this.txt1 = "Buy a bus token for " + this.cost + " coins";
            ctx.fillText(this.txt1, this.loc.x-20,this.loc.y);
            this.txt2 = "Press B to buy"
            ctx.fillText(this.txt2, this.loc.x-20,this.loc.y-40);
        }
    }
    purchase(){
        let sightSq = 100*100;
        let dist = this.loc.distanceSquared(game.hero.loc);
        if(dist<sightSq && game.hero.statusBlock.coins >= 5 ){
            //makes sure the hero is both close enough and has enough coins to buy a token
            game.levels[0].tokens++;
            game.hero.statusBlock.coins-=5;
            console.log("token bought");
        }
    }
}