function Player(x, y, ctx, playerAnims) {
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
    this.sizeMultiplier = 2;
    this.isColliding = 0;
    this.jumpPower = -3;
    this.charDisplayDisplacement = 35;
    this.hitboxWidth = 30;
    this.hitboxheight = 63;
    this.health = 100;
    this.isAttacking = false;
    this.doubleJump = 0;
    this.maxJumps = 2;
    this.bullets = [];
    this.shootingDirection = true;
    
}

Player.prototype.update = function () {
    for (let i = 0; i < this.bullets.length; i++) {
        this.bullets[i].run();
        if (this.bullets[i].isDead) {
            this.bullets.splice(i , 1);
        }
    }

    if (this.loc.y > 0) {
        this.health = 0;
    }
    if (this.isAttacking) {
        this.maxVel.x = 0.5;
    } else {
        this.maxVel.x = 2.3;
    }
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
    if (!this.moving.right && !this.moving.left) {
        if (this.vel.x > -0.1 || this.vel.x < 0.1) {
            this.vel.x = 0;
        }
    }

    if (this.vel.y != 0 && this.vel.getDirection() > 0) {
        this.moving.down = true;
        this.moving.up = false;
    } else if (this.vel.y != 0 && this.vel.getDirection() < 0) {
        this.moving.down = false;
        this.moving.up = true;
    } else if (this.vel.y == 0 && this.vel.x == 0) {
        this.moving.up = false;
        this.moving.down = false;
    }

    //limit on the x axis
    if (this.vel.x >= this.maxVel.x) {
        this.friction = 0.2;
    } else {
        this.friction = 0.02;
    }

    //apply gravity
    this.vel.add(this.acc);
    if (this.isColliding) {
        this.vel.y = 0;
    }

    //apply velocity
    this.loc.add(this.vel);

    if(world.player.health<50){
        world.player.jumpPower = -4;
    }
}

Player.prototype.jump = function () {
    if (this.doubleJump != this.maxJumps) {
        this.loc.y = this.loc.y - 10;
        this.vel.y = this.jumpPower;
        this.doubleJump++;
    }
}

Player.prototype.shoot = function () {
    if (this.vel.x > 0) {
        this.shootingDirection = true;
    } else if (this.vel.x < 0){
        this.shootingDirection = false;
    }


    this.bullets.push(new Bullet(this.loc.x, this.loc.y, this.ctx, this.shootingDirection));
}

Player.prototype.slide = function () {
    if (world.player.moving.left) {
        world.player.vel.x = -5;
    } else {
        world.player.vel.x = 5;
    }
}

Player.prototype.render = function () {
    let ctx = this.ctx;

    if (this.vel.getDirection() < 0) {
        this.moving.down = true;
    } else {
        this.moving.down = false;
    }

    ctx.translate(0, -this.hitboxheight);
    ctx.beginPath();
    ctx.rect(this.loc.x, this.loc.y, this.hitboxWidth, this.hitboxheight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.translate(-this.charDisplayDisplacement, this.hitboxheight);
}

Player.prototype.CheckCollisions = function () {
    for (let i = 0; i < world.platforms.length; i++) {
        if (this.loc.y >= world.platforms[i].loc.y && this.loc.y < world.platforms[i].loc.y + world.platforms[i].height && (this.loc.x > world.platforms[i].loc.x || this.loc.x + this.hitboxWidth > world.platforms[i].loc.x) && (this.loc.x < world.platforms[i].loc.x + world.platforms[i].width) && (this.moving.down || (!this.moving.down && !this.moving.up))) {
            this.loc.y = world.platforms[i].loc.y + 1;
            this.vel.y = 0;
            this.doubleJump = 0;
        }
    }
    for (let i = 0; i < world.platforms.length; i++) {
        for (let j = 0; j < world.platforms[i].hostiles.length; j++) {
            this.playerLoc = new JSVector(this.loc.x + world.player.hitboxWidth*.5, world.player.loc.y - world.player.hitboxheight / 2);
            this.distance = JSVector.subGetNew(this.playerLoc, world.platforms[i].hostiles[j].loc);
            this.mag = this.distance.getMagnitude();
            if (this.mag < 50) {
                if (this.isAttacking) {
                    world.platforms[i].hostiles.splice(j, 1);
                } else {
                    this.health -= 0.7;
                }
            }
        }
    }
}

Player.prototype.run = function () {
    this.update();
    this.CheckCollisions();
    if (this.health >= 0) {
        this.render();
    }

}
