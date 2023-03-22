function Regen(x, y, ctx) {
    this.ctx = ctx;
    this.loc = new JSVector(x, y);
    this.width = 15;
    this.height = 15;
    this.playerLoc = new JSVector(0, 0);
    this.distance = new JSVector(0, 0);
    this.mag = this.distance.getMagnitude();
    this.dead = false;
    this.movement = 0;
}

Regen.prototype.update = function(i) {
    this.playerLoc.x = world.player.loc.x + world.player.hitboxWidth*1.5;
    this.playerLoc.y = world.player.loc.y - world.player.hitboxheight/2;
    this.distance = JSVector.subGetNew(this.playerLoc, this.loc);
    this.mag = this.distance.getMagnitude();
    if (this.mag < 35 && world.player.health < 100) {
        world.player.health += 10;
        this.dead = true;
        
    }
    if (world.tick % 5 == 0) {
        this.movement++;
        this.loc.y += Math.sin((this.movement/2));
    }
    
}

Regen.prototype.render = function() {
    let ctx = this.ctx;
    ctx.translate(-this.width/2, -this.height/2);
    ctx.drawImage(regen, this.loc.x, this.loc.y, this.width, this.height);
    ctx.translate(this.width/2, this.height/2);
}

Regen.prototype.run = function(i) {
    this.update(i);
    this.render();
}