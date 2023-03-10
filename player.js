// Define a Player class that takes in a starting x, y position and a canvas context
function Player(x, y, ctx) {
    // Store the player's location, velocity, acceleration, mass, and terminal velocity
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0, gravity / 100);
    this.mass = 0.5;
    this.terminalVelocity = this.mass * gravity;

    // Store the maximum velocity and context for rendering
    this.maxVel = new JSVector(2.3, this.terminalVelocity);
    this.ctx = ctx;

    // Store booleans for movement, friction, and collision detection
    this.moving = {
        right: false,
        left: false,
        up: false,
        down: false
    }
    this.friction = 0.02;
    this.isColliding = 0;

    // Store variables for jumping, display, hitbox, health, attacking, and bullet properties
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

// Update the player object every frame
Player.prototype.update = function () {
    // Loop through all the bullets of the player and run their update function
    for (let i = 0; i < this.bullets.length; i++) {
        this.bullets[i].run();
        // If the bullet is dead, remove it from the bullets array
        if (this.bullets[i].isDead) {
            this.bullets.splice(i, 1);
        }
    }

    // If the player falls off the screen, set health to 0
    if (this.loc.y > 0) {
        this.health = 0;
    }

    // Set the maximum velocity based on whether the player is attacking or not
    if (this.isAttacking) {
        this.maxVel.x = 0.5;
    } else {
        this.maxVel.x = 2.3;
    }

    // Move the player based on user input
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

    // If the player is not moving, set velocity to 0 to prevent sliding
    if (!this.moving.right && !this.moving.left) {
        if (this.vel.x > -0.1 || this.vel.x < 0.1) {
            this.vel.x = 0;
        }
    }

    // Update the moving properties of the player based on their current velocity
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

    // Limit the maximum velocity of the player on the x axis and adjust friction accordingly
    if (this.vel.x >= this.maxVel.x) {
        this.friction = 0.2;
    } else {
        this.friction = 0.02;
    }

    // Apply gravity to the player's velocity
    this.vel.add(this.acc);

    // If the player is colliding with another object, set their vertical velocity to 0
    if (this.isColliding) {
        this.vel.y = 0;
    }

    // Move the player according to their current velocity
    this.loc.add(this.vel);

    // If the player's health is less than 50, increase their jump power
    if (world.player.health < 50) {
        world.player.jumpPower = -4;
    }

}


// Define the jump function for the player object
Player.prototype.jump = function () {
    // Check if the player has double jumps left
    if (this.doubleJump !== this.maxJumps) {
        // Move the player up
        this.loc.y -= 10;
        // Set the player's vertical velocity to the jump power
        this.vel.y = this.jumpPower;
        // Increase the double jump count
        this.doubleJump++;
    }
}

// Define the shoot function for the player object
Player.prototype.shoot = function () {
    // Determine the shooting direction based on the player's horizontal velocity
    if (this.vel.x > 0) {
        this.shootingDirection = true;
    } else if (this.vel.x < 0) {
        this.shootingDirection = false;
    }
    // Add a new bullet to the bullets array with the player's position, canvas context, and shooting direction
    this.bullets.push(new Bullet(this.loc.x, this.loc.y, this.ctx, this.shootingDirection));
}

// Define the slide function for the player object
Player.prototype.slide = function () {
    // Check if the player is moving left and set the horizontal velocity accordingly
    if (world.player.moving.left) {
        this.vel.x = -5;
    } else {
        this.vel.x = 5;
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
            this.playerLoc = new JSVector(this.loc.x + world.player.hitboxWidth * .5, world.player.loc.y - world.player.hitboxheight / 2);
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
