class Bear{
    constructor(pIndex, deltaX, platforms){
           this.docile = false; //only exists for deer as I would prefer to use speed to adjust anger
           this.speed = 2;
           this.speedDirec = 1;
           this.health = 100;
           this.heroDis = 60;
           this.loc = platforms[pIndex].loc.copy();
           this.left = platforms[pIndex].loc.x;
           this.right = platforms[pIndex].loc.x + platforms[pIndex].width;
           this.loc.x+=deltaX;
           this.loc.y-=15;
           console.log(this.loc);
           this.counter = 0;

    }

    run(){
        if(this.health>0){
            if(this.speed>=2){
                this.attack();
                this.render(0);
            }
            else{
                this.render(1);
            }
        }

        let disCheck = this.loc.distance(game.hero.loc) < this.heroDis;
        if(game.hero.statusBlock.isAttacking && disCheck){
            this.health--;
        }
        else if(!game.hero.statusBlock.isAttacking && disCheck){
            if(this.counter%5){
                game.hero.statusBlock.hp--;
            }
            this.counter++;
        }
    } 

    attack(){
        this.loc.x+=0.5*this.speed*this.speedDirec;
        if(this.loc.x<this.left || this.loc.x>this.right){
            this.speedDirec*=-1;
        }

    }

    render(n){
        if(n == 0){ //!Not attacking
            ctx.beginPath();
            ctx.arc(this.loc.x, this.loc.y, 10, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
        }
        else{ //!Attack Render
            ctx.beginPath();
            ctx.arc(this.loc.x, this.loc.y, 10, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = "red";
            ctx.fill();
        }
    }


}