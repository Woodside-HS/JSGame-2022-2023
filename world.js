// Constructor for the world object
function World() {
    this.cnv = document.getElementById('cnv'); // Reference to the canvas
    this.ctx = this.cnv.getContext('2d'); // Reference to the 2D context of the canvas
    this.dims = { // Dimensions of the world
        top: -400,
        left: 0,
        bottom: 0,
        right: 6000,
        height: 400,
        width: 6000
    }
    this.groundThickness = 10; // Thickness of the ground
    this.platforms = []; // Array of platforms
    this.platformsCleared = 0; // The number of platforms cleared
    this.platformAmount = 30; // Total number of platforms
    this.loadPlatforms(this.platformAmount); // Load the platforms
    this.traps = []; // Array of traps
    this.loadTraps(30); // Load the traps
    this.booms = []; // Array of explosions
    this.cnvLoc = new JSVector(0, -400); // Location of the canvas
    this.player = new Player(50, -300, this.ctx); // The player
    this.levelSpeed = 0.2; // Unused, could be used for side-scroller
    this.playerDisplacement = 225; // The distance the player is from the left of the screen
    this.lerpDestination = this.player.loc.x - this.playerDisplacement; // Lerp destination for the camera using player displacement
    this.cameraStiffness = 0.01; // Camera chasing stiffness
    this.tickInterval = 30;
    this.tick = 0;
}

// Method to run the world
World.prototype.run = function () {
    this.tick++; // Increment the tick
    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height); // Clear the screen
    this.ctx.save(); // Save the current context
    this.ctx.translate(-this.cnvLoc.x, -this.cnvLoc.y); // Translate to the location position
    let ctx = this.ctx; // Easy context reference

    // Chase the player with the camera
    this.lerpDestination = this.player.loc.x - this.playerDisplacement;
    this.cnvLoc.x = lerp(this.cnvLoc.x, this.lerpDestination, this.cameraStiffness);

    this.player.run(); // Run the player
    for (let i = 0; i < this.platforms.length; i++) {
        this.platforms[i].run(); // Run all the platforms
    }
    for (let i = 0; i < this.traps.length; i++) {
        this.traps[i].run(); // Run all the traps
        if (this.traps[i].isDead) { // Create an explosion if a trap is triggered
            this.booms.push(new Boom(this.traps[i].loc.x, this.traps[i].loc.y, this.ctx));
            this.traps.splice(i, 1);
        }
    }

    for (let i = 0; i < this.booms.length; i++) {
        this.booms[i].run(); // Run all the explosions
        if (this.booms[i].isDead) {
            this.booms.splice(i, 1); // Delete the explosion after it fades away
        }
    }

    // Restore the saved context and keep this line at the bottom
    ctx.restore();

    // Game over if player's health is 0
    if (this.player.health <= 0) {
        console.log("game over")
    }

    // You win if player clears all platforms
    if (this.platforms.length <= this.platformsCleared) {
        console.log("you win")
    }
}

// This function checks if all the platforms are cleared and if yes, then logs "you win" to the console.
World.prototype.checkPlatformsCleared = function () {
    if (this.platforms.length <= this.platformsCleared) {
        console.log("You win!");
    }
}

// This function loads the platforms using reference randomness for efficient and playable platforms.
World.prototype.loadPlatforms = function (n) {
    for (let i = 0; i < n; i++) {
        if (i == 0) {
            // For the first platform, set its properties and location.
            this.platforms[i] = new Platform(
                1000,
                this.dims.top / 2,
                100,
                this.groundThickness,
                this.ctx,
                false
            );
        } else {
            if (this.platforms[i - 1].length != 1) {
                // For other platforms, generate random properties and location based on the previous platform.
                let length = randomNumber(0, 1);
                length = Math.round(length);
                let min = 120;
                let max = 200;
                let x = randomNumber(min, max);
                let y = randomNumber((max - x) / 2, -(max - x) / 2);
                this.platforms[i] = new Platform(
                    this.platforms[i - 1].loc.x + x,
                    this.platforms[i - 1].loc.y - y,
                    100,
                    this.groundThickness,
                    this.ctx,
                    false,
                    length
                );
            } else {
                // For single-length platforms, generate new platform with default properties.
                let length = randomNumber(0, 1);
                length = Math.round(length);
                this.platforms[i] = new Platform(
                    this.platforms[i - 1].loc.x + this.platforms[i - 1].width,
                    this.platforms[i - 1].loc.y,
                    100,
                    this.groundThickness,
                    this.ctx,
                    false,
                    length
                );
            }
        }
    }

    // Add 10 fixed platforms with specific properties.
    for (let i = 0; i < 10; i++) {
        if (i == 3) {
            // For the third platform, set its properties and location.
            this.platforms.push(
                new Platform(
                    60 + (i * 100),
                    this.dims.top / 1.35,
                    100,
                    this.groundThickness,
                    this.ctx,
                    false,
                    0,
                    true,
                    i
                )
            );
        } else if (i == 4) {
            // For the fourth platform, set its properties and location.
            this.platforms.push(
                new Platform(
                    60 + (i * 100),
                    -1000,
                    100,
                    this.groundThickness,
                    this.ctx,
                    false,
                    0,
                    true,
                    i
                )
            );
        } else {
            // For other platforms, set their properties and location.
            this.platforms.push(
                new Platform(
                    60 + (i * 100),
                    this.dims.top / 2,
                    100,
                    this.groundThickness,
                    this.ctx,
                    false,
                    0,
                    true,
                    i
                )
            );
        }
    }
}

// Function to load traps into the game world
World.prototype.loadTraps = function (n) {
    for (let i = 0; i < n; i++) {
        // Generate a new trap object with a random position within the game world
        this.traps[i] = new Trap(randomNumber(1300, this.dims.width), randomNumber(0, this.dims.top), this.ctx);
    }
}