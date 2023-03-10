function Boom(x, y, ctx) {
    this.ctx = ctx;
    this.loc = new JSVector(x, y);
    this.width = 70;
    this.height = 70;
    this.isDead = false;
    this.tick = 0;
    this.tickInterval = 10;
    this.frame = 0;
    this.sizeMultipler = 3;
}

Boom.prototype.update = function () {
    this.tick++;
    if (this.tick % this.tickInterval == 0) {
        this.frame++;
    }
    if (this.frame >= Explosion.length - 1) {
        this.isDead = true;
    }
}

Boom.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.width/(1/this.frame)/3, 0, Math.PI*2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();

}

Boom.prototype.run = function () {
    this.update();
    this.render();
}