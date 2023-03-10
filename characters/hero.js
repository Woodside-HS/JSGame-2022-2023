function Hero(width, ctx) {
    this.loc = new JSVector(50, 0);
    this.vel = new JSVector(0, 1);
    this.acc = new JSVector(0,.05);
    this.clr = "blue";
    this.size = width;
    this.ctx = ctx;
    this.height = width
    this.jumpCoef = -3;
    this.movingRight = false;
    this.movingLeft = false;
    this.onPlatform = false;
    this.death = false;
    this.jumping = false; //testing this
    this.jump2 = [false, 0];

  
}


Hero.prototype.run = function () {
    this.render();
    if(!this.onPlatform){
        this.loc.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(2);
    }
}

Hero.prototype.jump = function () {
    this.loc.y = this.loc.y - 10;
    this.vel.y = this.jumpCoef;
    this.onPlatform = false;
    this.vel.limit(2);
    this.jumping = true;
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