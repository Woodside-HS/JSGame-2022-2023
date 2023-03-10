function Bullet(x, y, ctx, direction) {
    this.ctx = ctx;
    this.loc = new JSVector(x, y - world.player.hitboxheight/2);
    if (direction) {
        this.vel = new JSVector(10, 0);
    } else {
        this.vel = new JSVector(-10, 0);
    }
    
    this.width = 10;
    this.height = 10;
    this.playerLoc = new JSVector(x, y);
    this.distance = JSVector.subGetNew(this.playerLoc, this.loc);
    this.mag = this.distance.getMagnitude();
    this.isDead = false;
    this.life = 0;

    this.lifeSpan = 30;
    
    
}

Bullet.prototype.update = function () {
    this.life++;
    if (this.life > this.lifeSpan) {
        this.isDead = true;
    }
    this.loc.add(this.vel);

    for (let i = 0; i < world.platforms.length; i++) {
        for (let j = 0; j < world.platforms[i].hostiles.length; j++) {
            this.distance = JSVector.subGetNew(this.loc, world.platforms[i].hostiles[j].loc);
            this.mag = this.distance.getMagnitude();
            if (this.mag < 37) {
                world.platforms[i].hostiles.splice(j, 1);
                this.isDead = true;
            }
        }
    }
    
}

Bullet.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.width/2, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

}

Bullet.prototype.run = function () {
    this.update();
    this.render();
}