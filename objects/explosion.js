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
    ctx.translate(-this.width / 2, -this.height / 2);
    ctx.drawImage(Explosion[this.frame], this.loc.x, this.loc.y, Explosion[this.frame].width * this.sizeMultipler, Explosion[this.frame].height * this.sizeMultipler);
    ctx.translate(this.width / 2, this.height / 2);
}

Boom.prototype.run = function () {
    this.update();
    this.render();
}