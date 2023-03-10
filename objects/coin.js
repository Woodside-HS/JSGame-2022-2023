function Coin(platformLoc, width, ctx) {
    this.platformID = 1;
    let x = Math.random()*width+platformLoc.x;
    let y = platformLoc.y - (Math.random()*40 + 10);
    this.loc = new JSVector(x, y);
    this.relativeLoc = null;
    this.clr = "yellow";
    this.size = 5;
    this.rad = 5;
    this.height = 5
    this.ctx = ctx; 
    this.dead = false;
    this.double = false;
}


Coin.prototype.run = function () {
    console.log(this.double);
    if(!this.dead){
    this.render();
    let temp = world.cnvLoc.copy(); 
    temp.add(hero.loc);
    if(this.loc.distance(temp) < this.rad*2){
        
        this.collectCoin();
    }
}
}

Coin.prototype.collectCoin = function() {
    coinCount++;
    if(this.double){
        coinCount++;
    }
    displayCoinCount();
    this.dead = true;
    //Platform.coins.splice(this);
}


Coin.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI*2);
    ctx.fillStyle = this.clr;
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}