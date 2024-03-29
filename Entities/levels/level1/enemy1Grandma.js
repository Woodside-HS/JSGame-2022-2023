//gonna be a grandma who tries to whack you with her cane
class lvl1Enemy1 {
    constructor(x, y, leftBound, rightBound, seeDistance) {
        this.loc = new JSVector(x, y);
        this.hp = 100;
        this.lB = leftBound;
        this.rB = rightBound;
        this.w = 30;//width
        this.h = 40;//height
        this.vel = new JSVector(1, 0);//will remain static until hero is seen
        this.acc = new JSVector(0, 0);//will get a acceleration towards the player and swap to the attack mode
        this.sightSquared = seeDistance * seeDistance;//how far the grandpa will be able to detect the hero from
        this.attack = false;
        this.attackImgs = [];
        this.moveImgs = [];
        this.frameId = 0;
        this.swap = 0;
        this.loadImages();
    }
    loadImages() {
        //TODO should load images, dont have images yet, will use placeholders as boxes
        //done
        for (let i = 1; i < 7; i++) {
            this.moveImgs[i - 1] = document.createElement("img");
            this.moveImgs[i - 1].src = "Images/Level1/Lvl1Enemies/Lvl1Enemy1/oldman" + i + ".png"
        }
        //console.log(this.moveImgs);
    }
    run() {
        this.checkHurt();
        if (this.hp > 0) {
            this.update();
            this.seeHero();
            this.fenceRender();
            if (this.attack) {
                this.attackRender();
                this.attackHero();
            } else {
                this.acc = new JSVector(0, 0);//resets acceleration to zero
                this.render();
                this.slow();//specially dedicated to slowing the hero down
            }
        }
    }
    checkHurt() {
        if(game.hero.statusBlock.isAttacking){
            if(game.hero.posNeg){
                //if hero is attacking to the right
                if(
                    this.loc.x>game.hero.loc.x+50 && //left boundary of hero attack
                    this.loc.x<game.hero.loc.x+80 && //right boundary of hero attack
                    this.loc.y>game.hero.loc.y && //below top of hero
                    this.loc.y<game.hero.loc.y+game.hero.height //above bottom of hero
                ){
                    this.hp--;
                    console.log(this.hp);
                }//end of loc if statemnet
            } else {//Positive and negative if statement
                //hero is to the right
                if(this.loc.x>game.hero.loc.x+50 && //left boundary of hero attack
                this.loc.x<game.hero.loc.x+80 && //right boundary of hero attack
                this.loc.y>game.hero.loc.y && //below top of hero
                this.loc.y<game.hero.loc.y+game.hero.height //above bottom of hero
                ){
                    this.hp--;
                    console.log(this.hp);
                }//end of loc  if statement
                }//Pos/neg if statement
            }//is attacking if statement
        }//check hurt
    
    update() {
        this.vel.add(this.acc);
        if (this.loc.x + this.w > this.rB || this.loc.x < this.lB) {
            this.vel.x *= -1;
        }
        //limits max velocity to 3
        if (this.vel.x > 3) {
            this.vel.x = 3;
        }
        if (this.vel.x < -3) {
            this.vel.x = -3;
        }
        this.loc.add(this.vel);
    }
    render() {
        // console.log("rednering enemy 1 to  " + this.loc.x + this.loc.y);
        this.swap++;
        //console.log(this.swap);
        if (this.swap > (12 - this.vel.getMagnitude() * 5)) {
            this.swap = 0;
            this.frameId++;
            if (this.frameId > 5) {
                this.frameId = 0;
            }
        }
        if (this.vel.x >= 0) {
            ctx.save();//this code flips the character if the character is facing right
            //ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.translate(this.loc.x, this.loc.y);
            ctx.scale(-1, 1);
            ctx.drawImage(this.moveImgs[this.frameId], -this.w, -this.h, this.w, this.h);
            ctx.restore();
        } else {
            ctx.drawImage(this.moveImgs[this.frameId], this.loc.x, this.loc.y - this.h, this.w, this.h);
        }


    }
    attackRender() {
        // console.log("attack enemy to enemy 1 to  " + this.loc.x + this.loc.y);
        this.render();//will eventually get a system set up for an attack animation
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y - this.h);
        ctx.lineTo(this.loc.x, this.loc.y - this.h);
        ctx.closePath();
        ctx.fillStyle = "#FF5F4933";
        ctx.fill();
        //ctx.fill();
    }
    fenceRender() {
        //renders the left bound of the enemy
        ctx.beginPath();
        ctx.moveTo(this.lB - 5, this.loc.y);//bottom left
        ctx.lineTo(this.lB + 5, this.loc.y);//top left
        ctx.lineTo(this.lB + 5, this.loc.y - 20);//top right
        ctx.lineTo(this.lB - 5, this.loc.y - 20);//bottom right
        ctx.closePath();
        ctx.fillStyle = "brown";
        ctx.fill();
        //renders the right bound of the enemy
        ctx.beginPath();
        ctx.moveTo(this.rB - 5, this.loc.y);//bottom left
        ctx.lineTo(this.rB + 5, this.loc.y);//top left
        ctx.lineTo(this.rB + 5, this.loc.y - 20);//top right
        ctx.lineTo(this.rB - 5, this.loc.y - 20);//bottom right
        ctx.closePath();
        ctx.fillStyle = "brown";
        ctx.fill();
    }
    seeHero() {
        this.attack = false;//makes sure to reset the attack if the hero is too far
        let dist = this.loc.distanceSquared(game.hero.loc);
        if (dist < this.sightSquared) {
            this.attack = true;
            //console.log("Attack y/n " + this.attack);
        }

    }
    attackHero() {
        this.acc = JSVector.subGetNew(game.hero.loc, this.loc);
        this.acc.setMagnitude(0.05);//makes sure to set the magnitude to something very small
        this.acc.y = 0;//moves the grandpa towards the hero

        //this part actually hurts the player
        let dist = this.loc.distanceSquared(game.hero.loc);
        if (dist < 225) {
            //if the player is within 15 pix then drains 1 health a frame, need to get a secondary set of frames
            game.hero.statusBlock.hp--;
        }
    }
    slow() {
        if (this.vel.getMagnitude() > 0) {
            //velocity is greater then zero
            this.vel.setMagnitude(this.vel.getMagnitude() - 0.05)
            if (this.vel.getMagnitude() > 0.9 && this.vel.getMagnitude() < 1.1) {
                //if velocity is close enough, then keeps it constant
                this.vel.setMagnitude(1);
            }
        } else if (this.vel.getMagnitude() < 0) {
            //velocity is less than zero
            this.vel.setMagnitude(this.vel.getMagnitude() + 0.05)
            if (this.vel.getMagnitude() > -1.1 && this.vel.getMagnitude() < -0.9) {
                //if velocity is small enough, just stops it 
                this.vel.setMagnitude(-1);
            }
        }
    }
}