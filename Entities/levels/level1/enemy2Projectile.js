class lvl1Projec {
    constructor(x,y,direction){
        this.loc = new JSVector(x,y);
        this.rad= .5;
        this.false= false;//is the bark too big
        if(direction){
            //left
            this.vel = new JSVector(-1,0);
        } else {
            //right
            this.vel = new JSVector(1,0)
        }
    }
    run(){
        this.render();
        this.update();
        this.checkHero();
    }
    checkHero(){
        let hLoc = new JSVector(game.hero.loc.x+(game.hero.width/2), game.hero.loc.y+(game.hero.height/2));//gets the ceneter of the hero
        let dist = this.loc.distanceSquared(hLoc);
        if(dist<this.rad*this.rad){
            game.hero.vel.y = -5;
        }
    }
    update(){
        this.rad+=.1
        this.loc.add(this.vel);
        if(this.rad>=7){
            this.false = true;
        }
    }
    render(){
        ctx.arc(this.loc.x,this.loc.y,this.rad,0,Math.PI*2,);
        ctx.fillStyle = "blue";
        ctx.fill();
    }
}