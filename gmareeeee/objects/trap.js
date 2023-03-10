function Trap(x, y, ctx) {
    this.ctx = ctx;
    this.loc = new JSVector(x, y);
    this.width = 45;
    this.height = 45;
    this.playerLoc = new JSVector(x, y);
    this.distance = JSVector.subGetNew(this.playerLoc, this.loc);
    this.mag = this.distance.getMagnitude();
    this.isDead = false;
}

Trap.prototype.update = function () {
    this.playerLoc.x = world.player.loc.x + world.player.hitboxWidth * 1.5;
    this.playerLoc.y = world.player.loc.y - world.player.hitboxheight / 2;
    if (world.player.vel.x > world.player.maxVel.x + 0.2) {
        this.playerLoc.y = world.player.loc.y - world.player.hitboxheight / 2 + 20;
    }
    this.distance = JSVector.subGetNew(this.playerLoc, this.loc);
    this.mag = this.distance.getMagnitude();
    if (this.mag < 35) {
        world.player.health -= 25;
        this.isDead = true;
    }
}

Trap.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.width/2, 0, Math.PI*2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();

}

Trap.prototype.run = function () {
    this.update();
    this.render();
}