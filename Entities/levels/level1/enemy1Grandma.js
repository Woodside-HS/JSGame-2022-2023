//gonna be a grandma who tries to whack you with her cane
class lvl1Enemy1{
    constructor(x,y, leftBound, rightBound,seeDistance){
        this.loc = new JSVector(x,y);
        this.lB = leftBound;
        this.rB = rightBound;
        this.vel = new JSVector(0,0);//will remain static until hero is seen
        this.acc = new JSVector(0,0);//will get a acceleration towards the player and swap to the attack mode
        this.sightSqared = seeDistance*seeDistance;//how far the grandpa will be able to detect the hero from
        this.attack = false;
        this.attackImgs = [];
        this.moveImgs = [];
        this.loadImages();
    }
    loadImages(){
        //TODO should load images, dont have images yet, will use placeholders as boxes
        // for(let i= 0; i<=12;i++){
        //     //the 12 has to be hardcoded inn
        //     this.frames[i] = document.createElement("img");
        //     this.frames[i].src  = "resources/enemy/el"+i+".png";
        //   }
    }
    run(){
        this.update();
        this.seeHero();
        this.render();
        if(this.attack){
            //this.attackRender();
            //this.attackHero();
        } else {
            //this.render();
        }
    }
    update(){
        this.vel.add(this.acc);
        if(this.loc.x>this.rB || this.loc.x<this.lB){
            this.vel*=-1
        }
        this.loc.add(this.vel);
    }
    render(){
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y + this.h);
        ctx.lineTo(this.loc.x, this.loc.y + this.h);
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
    }
    attackRender(){
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y + this.h);
        ctx.lineTo(this.loc.x, this.loc.y + this.h);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
    }
    seeHero(){
        this.attack = false;//makes sure to reset the attack if the hero is too far
        let dist = this.loc.distanceSquared(game.hero.loc);
        if(dist<this.sightSquared){
            this.attack = true;
        }

    }
    attackHero(){
        this.acc = JSVector.subGetNew(game.hero.loc,this.loc);
        this.acc.setMagnitude(0.05);//makes sure to set the magnitude to something very small
        this.acc.y=0;
    }
}