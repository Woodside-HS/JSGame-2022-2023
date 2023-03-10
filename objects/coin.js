function Coin(x, y, platformLoc, width, ctx) {
    this.platformID = 1;
    this.loc = new JSVector(x, y);
    this.relativeLoc = null;
    this.leftLimit = platformLoc.x;
    this.rightLimit = platformLoc.x + width;
    //this.vel = new JSVector(.5, 0);
    //this.acc = new JSVector(0,.05);
    this.clr = "yellow";
    this.size = 5;
    this.rad = 5;
    this.height = 5
    this.ctx = ctx;
    
    
  
}


Coin.prototype.run = function () {
    this.render();
    this.update();
    // let ctx = this.ctx;
    // ctx.strokeStyle = "white";
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.moveTo(this.loc.x, this.loc.y);
    // ctx.lineTo(this.relativeLoc.x, this.relativeLoc.y)
    // ctx.stroke();
    // ctx.closePath();

    if(this.relativeLoc.distance(hero.loc) < this.rad){
        
        //this.collectCoin();
        console.log("coin collected")
    }
    


}

Coin.prototype.update = function(){
    //this.loc.add(this.vel);
    //this.vel.add(this.acc);
    this.relativeLoc  = new JSVector(world.cnvLoc.x + hero.loc.x, world.cnvLoc.y + hero.loc.y);

    
}

Coin.prototype.collectCoin = function() {
    coinCount++;
    displayCoinCount();
    //Platform.coins.splice(this);
}







Coin.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.loc.x+this.rightLimit, this.loc.y-20, this.rad, 0, Math.PI*2);
    ctx.fillStyle = this.clr;
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}