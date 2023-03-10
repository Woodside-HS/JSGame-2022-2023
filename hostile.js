function Hostile(x, y, ctx, platformLoc, platformWidth) {
    this.ctx = ctx;
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0, gravity / 100);
    this.mass = 0.5;
    this.terminalVelocity = this.mass * gravity;
    this.maxVel = new JSVector(0.3, this.terminalVelocity);
    this.friction = randomNumber(0.05, 0.3);
    this.sizeMultiplier = 0.4;
    let direction = Math.round(randomNumber(0, 1));
    this.moving = {
        right: false,
        left: false,
    }
    if (direction == 0) {
        this.moving.right = false;
        this.moving.left = true;
    }
    if (direction == 1) {
        this.moving.right = true;
        this.moving.left = false;
    }
    this.height = 40;
    this.width = 15;
    this.leftLimit = platformLoc.x;
    this.rightLimit = platformLoc.x + platformWidth;
}

Hostile.prototype.update = function () {

    if (this.moving.right) {
        this.vel.x = lerp(this.vel.x, this.maxVel.x, this.friction);
    } else if (this.moving.left) {
        this.vel.x = lerp(this.vel.x, -this.maxVel.x, this.friction);
    }

    if (((this.loc.x <= this.leftLimit + 10) && this.moving.left) || ((this.loc.x >= this.rightLimit - 10) && this.moving.right)) {
        if (this.moving.left) {
            this.moving.left = false;
            this.moving.right = true;
        } else if (this.moving.right) {
            this.moving.right = false;
            this.moving.left = true;
        }
    }

    this.loc.add(this.vel);
}


Hostile.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.rect(this.loc.x + this.width/2, this.loc.y, this.width*2, -this.height);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

Hostile.prototype.run = function () {
    this.update();
    this.render();
}