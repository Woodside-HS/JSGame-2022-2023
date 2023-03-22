function Player(x, y, ctx) {
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0, gravity / 100);
    this.mass = 0.5;
    this.terminalVelocity = this.mass * gravity;
    this.maxVel = new JSVector(2.3, this.terminalVelocity);
    this.ctx = ctx;
    this.moving = {
        right: false,
        left: false,
        up: false,
        down: false
    }
    this.friction = 0.02;
    this.charDisplayDisplacement = 35;
}

Player.prototype.update = function () {

    if (this.moving.right) {
        this.vel.x = lerp(this.vel.x, this.maxVel.x, this.friction);
    } else if (this.vel.x > 0) {
        this.vel.x = lerp(this.vel.x, 0, this.friction);
    }
    if (this.moving.left) {
        this.vel.x = lerp(this.vel.x, -this.maxVel.x, this.friction);
    } else {
        if (this.vel.x < 0) {
            this.vel.x = lerp(this.vel.x, 0, this.friction);
        }
    }

    //apply acc
    this.vel.add(this.acc);

    //apply velocity
    this.loc.add(this.vel);
}


Player.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.rect(this.loc.x, this.loc.y, 50, 50);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
}


Player.prototype.run = function () {
    this.update();
    this.render();
    if (this.health >= 0) {
        this.render();
    }

}
