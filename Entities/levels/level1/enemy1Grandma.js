//gonna be a grandma who tries to whack you with her cane
class lvl1Enemy1{
    constructor(x,y, leftBound, rightBound,seeDistance){
        this.loc = new JSVector(x,y);
        this.lB = leftBound;
        this.rB = rightBound;
        this.w = 30;//width
        this.h = 30;//height
        this.vel = new JSVector(1,0);//will remain static until hero is seen
        this.acc = new JSVector(0,0);//will get a acceleration towards the player and swap to the attack mode
        this.sightSquared = seeDistance*seeDistance;//how far the grandpa will be able to detect the hero from
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
        this.fenceRender();
        if(this.attack){
            this.attackRender();
            this.attackHero();
        } else {
            this.acc = new JSVector(0,0);//resets acceleration to zero
            this.render();
            this.slow();//specially dedicated to slowing the hero down
        }
    }
    update(){
        this.vel.add(this.acc);
        if(this.loc.x+this.w>this.rB || this.loc.x<this.lB){
            this.vel.x*=-1
        }
        //limits max velocity to 3
        if(this.vel.x>3){
            this.vel.x=3;
        }
        if(this.vel.x<-3){
            this.vel.x=-3;
        }
        this.loc.add(this.vel);
    }
    render(){
        // console.log("rednering enemy 1 to  " + this.loc.x + this.loc.y);
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y - this.h);
        ctx.lineTo(this.loc.x, this.loc.y - this.h);
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
    }
    attackRender(){
        // console.log("attack enemy to enemy 1 to  " + this.loc.x + this.loc.y);
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y - this.h);
        ctx.lineTo(this.loc.x, this.loc.y - this.h);
        ctx.closePath();
        ctx.fillStyle = "yellow";
        ctx.fill();
    }
    fenceRender(){
        //renders the left bound of the enemy
        ctx.beginPath();
        ctx.moveTo(this.lB-5, this.loc.y);//bottom left
        ctx.lineTo(this.lB + 5, this.loc.y);//top left
        ctx.lineTo(this.lB + 5, this.loc.y -20);//top right
        ctx.lineTo(this.lB-5, this.loc.y -20);//bottom right
        ctx.closePath();
        ctx.fillStyle = "brown";
        ctx.fill();
        //renders the right bound of the enemy
        ctx.beginPath();
        ctx.moveTo(this.rB-5, this.loc.y);//bottom left
        ctx.lineTo(this.rB + 5, this.loc.y);//top left
        ctx.lineTo(this.rB + 5, this.loc.y -20);//top right
        ctx.lineTo(this.rB-5, this.loc.y -20);//bottom right
        ctx.closePath();
        ctx.fillStyle = "brown";
        ctx.fill();
    }
    seeHero(){
        this.attack = false;//makes sure to reset the attack if the hero is too far
        let dist = this.loc.distanceSquared(game.hero.loc);
        if(dist<this.sightSquared){
            this.attack = true;
            //console.log("Attack y/n " + this.attack);
        }

    }
    attackHero(){
        this.acc = JSVector.subGetNew(game.hero.loc,this.loc);
        this.acc.setMagnitude(0.05);//makes sure to set the magnitude to something very small
        this.acc.y=0;
        //console.log(this.acc);
    }
    slow(){
        if(this.vel.getMagnitude()>0){
            //velocity is greater then zero
            this.vel.setMagnitude(this.vel.getMagnitude()-0.05)
            if(this.vel.getMagnitude()>0.9 &&this.vel.getMagnitude()<1.1){
                //if velocity is close enough, then keeps it constant
                this.vel.setMagnitude(1);
            }
        } else if (this.vel.getMagnitude()<0){
            //velocity is less than zero
            this.vel.setMagnitude(this.vel.getMagnitude()+0.05)
            if(this.vel.getMagnitude()>-1.1 &&this.vel.getMagnitude()<-0.9){
                //if velocity is small enough, just stops it 
                this.vel.setMagnitude(-1);
            }
        }
    }
}