function Enemy(x, y, platformLoc, width, ctx, world) {
    this.platformID = 1;
    this.loc = new JSVector(x, y);
    this.leftLimit = platformLoc.x;
    this.rightLimit = platformLoc.x + width;
    this.vel = new JSVector(.5, 0);
    //this.acc = new JSVector(0,.05);
    this.clr = "green";
    this.size = 5;
    this.height = 5
    this.ctx = ctx;
}


Enemy.prototype.run = function () {
    this.render();
    this.update();
    
    if((this.loc.x >= this.rightLimit) || (this.loc.x <= this.leftLimit)){
        this.vel.x *= -1;
        
    }
    //this.checkDeath();

}

Enemy.prototype.update = function(){
    this.loc.add(this.vel);
    //this.vel.add(this.acc);
    let temp = world.cnvLoc.copy(); 
    temp.add(hero.loc);
    if(this.loc.distance(temp) < 10){
        hero.life-=1;
        if(hero.life<0){
        hero.death = true;
        }
    }
    
}






Enemy.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(this.loc.x + this.size, this.loc.y);
    ctx.lineTo(this.loc.x + this.size, this.loc.y - this.height);
    ctx.lineTo(this.loc.x, this.loc.y - this.height);
    ctx.closePath();
    ctx.fillStyle = this.clr;
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.fill();
}