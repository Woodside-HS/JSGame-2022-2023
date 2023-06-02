//will be a bus stop that you get on an then leave on
class lvl1BusStop{
    constructor(x,y){
        this.loc = new JSVector(x,y);
        this.img = document.createElement("img");
        this.img.src = "Images/Level1/Lvl1End/lvl1BusStop.png"
        this.txt;
        this.desiredAmount = 20;
        this.bus = document.createElement("img");
        this.bus.src = "Images/Level1/Lvl1End/lvl1Bus.png";
        this.busLoc = new JSVector(this.loc.x+800,this.loc.y);
        this.confirmed = false;
    }
    run(){
        if(game.hero.loc.x > 4000){
            //cuts down on uncessary dist checks
            this.checkHero();
        }
        this.render();
        if(this.confirmed){
            //console.log("confirmed conforimed");
            this.endLvl();
        }
    }
    checkHero(){
        let sightSq = 100*100;
        let dist = this.loc.distanceSquared(game.hero.loc);
        if(dist<sightSq){
            //makes sure the hero is close enought to the ending 
            //will create popup that says you need coins
            this.txt = "You have " + game.levels[0].tokens + "/" + this.desiredAmount  + " required bus tickets";
            ctx.fillText(this.txt, this.loc.x-20,this.loc.y);
            if(game.levels[0].tokens>=this.desiredAmount&& !this.confirmed){
                game.clickingA = false;//makes sure the hero doesnt get stuck moving in a direction
                game.clickingD = false;
                this.confirmed = true;
                this.endLvl();
                window.confirm("next level");
            }
        }
    }
    render(){
        ctx.drawImage(this.img, this.loc.x,this.loc.y, 100,100);
    }
    endLvl(){
        ctx.drawImage(this.bus,this.busLoc.x,this.busLoc.y,600,200);
        //console.log("runnign");
        if(this.busLoc.x>=game.hero.loc.x){
            this.busLoc.x-=10;
        } else if(this.busLoc.x<=game.hero.loc.x){
            gameState++;

        } 
    }
}