class Enemy {
    constructor(x,y,platformWidth,enemySize) {
        this.loc = new JSVector(x,y-enemySize);//enemies location, does change
        //adds size so that it runs on top of the platform
        this.pLoc = new JSVector(x,y);//platforms location, should not change
        this.width = platformWidth;
        this.size = enemySize;
        this.move = 1;
        this.isdead=false;
    }
    run(){
        this.render();
        this.movePlatform();
        this.checkHero();
        this.checkAttack();
    }
    checkAttack(){
        if(game.hero.statusBlock.isAttacking){
            //currently only works if enemy is on right side of hero
            if(this.loc.x>game.hero.loc.x && this.loc.x<game.hero.loc.x+80 && game.hero.posNeg){
                //enemy is within attack bounds
                if(this.loc.y>game.hero.loc.y&&this.loc.y<game.hero.loc.y+game.hero.height){
                    this.isdead = true;
                }
            } else if(this.loc.x<game.hero.loc.x && this.loc.x>game.hero.loc.x-40){
                //enemy is within attack bounds
                if(this.loc.y>game.hero.loc.y&&this.loc.y<game.hero.loc.y+game.hero.height){
                    this.isdead = true;
                }
            }
            
        }
    }
    movePlatform(){
        this.loc.x+=this.move;
        if(this.loc.x>this.pLoc.x+this.width-this.size){
            //if the enemy goes to far the movement type gets reversed
            this.move = -1;
        }
        if(this.loc.x<this.pLoc.x){
            //does not need to add size because loc is top left
            this.move = 1;
        }
    }
    render(){
        ctx.save();//renders as simple box for now
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.size, this.loc.y);
        ctx.lineTo(this.loc.x + this.size, this.loc.y + this.size);
        ctx.lineTo(this.loc.x, this.loc.y + this.size);
        ctx.closePath()
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.restore()
    }
    checkHero(){
        let dist = this.loc.distanceSquared(game.hero.loc);
        //gets the distance from this enemy to hero;
        if(dist<game.hero.height*game.hero.height){
            //using height cause square
           game.hero.statusBlock.hp--;
           //console.log(game.hero.statusBlock.hp); works for now
        }
    }
}