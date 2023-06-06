class lvl1Shop {
    constructor(x,y, cost){
        this.loc = new JSVector(x,y);
        this.cost = cost;
        this.img = document.createElement("img");
        this.img.src = "Images/Level1/Lvl1End/Lvl1Shop.png"
    }
    run(){
        if(game.hero.loc.x > 4000){
            //cuts down on uncessary dist checks
            this.checkHero();
        }
        this.render();
    }
    render(){
        ctx.drawImage(this.img, this.loc.x,this.loc.y, 100,100);
    }
    checkHero(){
        let sightSq = 100*100;
        let dist = this.loc.distanceSquared(game.hero.loc);
        if(dist<sightSq){
            this.txt1 = "Buy a bus token for " + this.cost + " coins";
            ctx.fillText(this.txt1, this.loc.x-20,this.loc.y);
            if(game.hero.statusBlock.coins >= 5){
                this.txt2 = "Press B to buy"
            } else {
                this.txt2 = "";
            }
            
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