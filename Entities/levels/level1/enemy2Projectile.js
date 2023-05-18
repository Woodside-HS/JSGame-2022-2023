class lvl1Projec {
    constructor(x,y,direction){
        this.loc = new JSVector(x,y);
        this.rad= .5;
        this.false= false;//is the bark too big
        this.vel = direction.copy();
        this.vel.setMagnitude(0.5);
        this.dir = JSVector.subGetNew(this.loc,game.hero.loc);//gets the direction from the bark to the hero
        this.vel.setDirection(this.dir.getDirection());
    }
    run(){
        this.render();
        this.update();
        this.checkHero();
    }
    checkHero(){
        let hLoc = new JSVector(game.hero.loc.x+(game.hero.width/2), game.hero.loc.y+(game.hero.height/2));//gets the ceneter of the hero
        let dist = this.loc.distanceSquared(hLoc);
        if(dist<(this.rad*this.rad)){
            //bumps the hero up
            game.hero.vel.y = -5;
            game.hero.loc.y -=10;
        }
    }
    update(){
        this.rad+=.1
        this.loc.add(this.vel);
        //console.log(this.loc);
        if(this.rad>=10){
            this.false = true;
        }
    }
    render(){
        //will eventually be a "sound wave"
        ctx.beginPath();
        ctx.arc(this.loc.x,this.loc.y,this.rad,0,Math.PI*2,);
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
    }
}