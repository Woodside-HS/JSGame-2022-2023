function DoubleJump(x, y, ctx, world){
    this.loc = new JSVector(x, y);
    this.duration = 600;
    this.size = 5;
    this.active = false;
    this.dead = false;
    this.ctx = ctx;
    this.world = world;
}

DoubleJump.prototype.run = function(){ //if statement runs powerup differently depending on if it has been collected
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


DoubleJump.prototype.runPower = function(){ // run when collected
    hero.jump2[0] = true;
    this.duration--;
    if(this.duration<0){
        this.dead = true;
        hero.jump2[0] = false;
    }

    
}

DoubleJump.prototype.runIdle = function(){ //not yet collected
    this.render();
    let temp = this.world.cnvLoc.copy(); 
    temp.add(hero.loc);
    if(this.loc.distance(temp) < this.size + hero.size + 2){
        this.active = true;
    }
}

DoubleJump.prototype.render = function(){
    ctx = this.ctx;
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#AD07F1";
    ctx.arc(this.loc.x, this.loc.y, this.size, 0, Math.PI*2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();



}