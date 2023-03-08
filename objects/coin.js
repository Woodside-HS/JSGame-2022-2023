function Coin(x, y, platformLoc, width, ctx) {
    this.platformID = 1;
    this.loc = new JSVector(x, y);
    this.leftLimit = platformLoc.x;
    this.rightLimit = platformLoc.x + width;
    //this.vel = new JSVector(.5, 0);
    //this.acc = new JSVector(0,.05);
    this.clr = "green";
    this.size = 5;
    this.rad = 5;
    this.height = 5
    this.ctx = ctx;
    
    
  
}


Coin.prototype.run = function () {
    this.render();
    this.update();


}

Coin.prototype.update = function(){
    //this.loc.add(this.vel);
    //this.vel.add(this.acc);
    if(this.loc.distance(hero.loc) < 10){
        hero.death = true;
    }
    
}






Coin.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.rad);
    ctx.closePath();
    ctx.fillStyle = this.clr;
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.fill();
}