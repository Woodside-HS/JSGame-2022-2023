function DoubleCoins(x, y, ctx, world){
    this.loc = new JSVector(x, y);
    this.duration = 600;
    this.size = 5;
    this.active = false;
    this.dead = false;
    this.ctx = ctx;
    this.world = world;
}

DoubleCoins.prototype.run = function(){ //if statement runs powerup differently depending on if it has been collected
    if(this.dead){
        //nothing -- dead powerup doesn't do unnecesary checks when dead
    }
    else if(this.active){
        this.runPower();
    }
    else{
        this.runIdle();
    }

}


DoubleCoins.prototype.runPower = function(){ // run when collected
    for(let i = 0; i < this.world.platforms.length; i++){
        for(let j = 0; j<this.world.platforms[i].coins.length; j++){
            this.world.platforms[i].coins[j].double = true;
        }
    }
    this.duration--;
    if(this.duration<0){
        this.dead = true;
        for(let i = 0; i < this.world.platforms.length; i++){
            for(let j = 0; j<this.world.platforms[i].coins.length; j++){
                this.world.platforms[i].coins[j].double = false;
            }
        }
    }

    
}

DoubleCoins.prototype.runIdle = function(){ //not yet collected
    this.render();
    let temp = this.world.cnvLoc.copy(); 
    temp.add(hero.loc);
    if(this.loc.distance(temp) < this.size + hero.size + 2){
        this.active = true;
    }
}

DoubleCoins.prototype.render = function(){
    ctx = this.ctx;
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#00E7C1";
    ctx.arc(this.loc.x, this.loc.y, this.size, 0, Math.PI*2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();



}