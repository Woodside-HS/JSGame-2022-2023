function Hero(width, ctx) {
    this.loc = new JSVector(100, 0);
    this.vel = new JSVector(0, 1);
    this.acc = new JSVector(0,.05);
    this.clr = "blue";
    this.size = width;
    this.ctx = ctx;
    this.height = 5
    this.jumpCoef = -3;
    this.movingRight = false;
    this.movingLeft = false;

  
}


Hero.prototype.run = function () {
    this.render();
    this.update();
    //this.checkDeath();

}

Hero.prototype.update = function(){
    this.loc.add(this.vel);
    this.vel.add(this.acc);
    
}

Hero.prototype.jump = function () {
    this.loc.y = this.loc.y - 10;
    this.vel.y = this.jumpCoef;
    this.vel.limit(2);
}

Hero.prototype.checkPlatform = function(){
    for(let i=0; i<world.platforms.length; i++){
        console.log(world.platforms[i].size);
        if(this.loc.y >= world.platforms[i].loc.y && this.loc.y <= world.platforms[i].loc.y + world.platforms[i].height && ((this.loc.x >= world.platforms[i].loc.x)) && (this.loc.x <= world.platforms[i].size+world.platforms[i].loc.x)){
            this.vel.y = 0;
            this.loc.y = world.platforms[i].loc.y;
        }
        //(this.loc.y >= world.platforms[i].loc.y && this.loc.y <= world.platforms[i].loc.y + world.platforms[i].height) && ((this.loc.x >= world.platforms[i].loc.x) && (this.loc.x <= world.platforms[i].size+world.platforms[i].loc.x)) && this.vel.y >=0
    }
}


Hero.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(this.loc.x + this.size, this.loc.y);
    ctx.lineTo(this.loc.x + this.size, this.loc.y - this.height);
    ctx.lineTo(this.loc.x, this.loc.y - this.height);
    ctx.closePath();
    ctx.fillStyle = this.clr;
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.fill();
}