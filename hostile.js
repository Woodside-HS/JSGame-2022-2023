function Hostile(x, y, ctx, goblinAnims, platformLoc, platformWidth) {
    this.ctx = ctx;
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0, gravity / 100);
    this.mass = 0.5;
    this.terminalVelocity = this.mass * gravity;
    this.maxVel = new JSVector(0.3, this.terminalVelocity);
    this.friction = randomNumber(0.05, 0.3);
    this.goblinRunAnim = [goblinAnims[goblinRunIndex][0], goblinAnims[goblinRunIndex][1], goblinAnims[goblinRunIndex][2], goblinAnims[goblinRunIndex][3], goblinAnims[goblinRunIndex][4], goblinAnims[goblinRunIndex][5]];
    this.goblinCurr = 0;
    this.goblinAnimCurr = this.goblinRunAnim;
    this.currentImage = this.goblinAnimCurr[this.goblinCurr];
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
    if (world.tick % world.tickInterval == 0) {
        if (this.goblinCurr < this.goblinAnimCurr.length - 1) {
            this.goblinCurr++;
        } else {
            this.goblinCurr = 0;
        }
    }
    this.currentImage = this.goblinAnimCurr[this.goblinCurr];
    if (this.currentImage == null) {
        this.currentImage = this.goblinAnimCurr[0];
    }
    ctx.drawImage(this.currentImage, this.loc.x, this.loc.y - this.currentImage.height * this.sizeMultiplier, this.currentImage.width * this.sizeMultiplier, this.currentImage.height * this.sizeMultiplier);
}

Hostile.prototype.run = function () {
    this.update();
    this.render();
}