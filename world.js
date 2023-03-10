function World() {
    this.cnv = document.getElementById('cnv'); //canvas
    this.ctx = this.cnv.getContext('2d'); //context
    this.dims = { //dimensions
        top: -400,
        left: 0,
        bottom: 0,
        right: 6000,
        height: 400,
        width: 6000
    }
    //platforms and ground stuff
    this.groundThickness = 10;//groundthickness
    this.platforms = [];//starting platform array
    this.platformsCleared = 0; //starting platforms cleared
    this.platformAmount = 30; //amount of platforms
    this.loadPlatforms(this.platformAmount); //load the platforms
    this.traps = []; //empty traps array
    this.loadTraps(30); //load traps into empty array
    this.booms = []; //empty booms array
    this.cnvLoc = new JSVector(0, -400); //the canvas locatoin
    this.player = new Player(50, -300, this.ctx, playerAnims); //the player
    this.levelSpeed = 0.2; // unuses but if u need to use for sidescroller just use this as a constant
    this.playerDisplacement = 225; //how far away the player is centered forom the left of the screen
    this.lerpDestination = this.player.loc.x - this.playerDisplacement; //lerp destination for camera using player displacement
    this.cameraStiffness = 0.01; // camera chaseing stifness


    this.tickInterval = 30;
    this.tick = 0;



}

//run function
World.prototype.run = function () {
    this.tick++; // world tick
    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height); //refresh screen
    this.ctx.save(); //save
    this.ctx.translate(-this.cnvLoc.x, -this.cnvLoc.y); //translate to loc pos
    let ctx = this.ctx; // easier ctx reference



    this.lerpDestination = this.player.loc.x - this.playerDisplacement;
    this.cnvLoc.x = lerp(this.cnvLoc.x, this.lerpDestination, this.cameraStiffness); // chase player with camera
    this.player.run(); //run player
    for (let i = 0; i < this.platforms.length; i++) {
        this.platforms[i].run(); // run al lthe platforms
    }
    for (let i = 0; i < this.traps.length; i++) {
        this.traps[i].run(); // run all the traps
        if (this.traps[i].isDead) { // make an explisoin if a trap is triggered
            this.booms.push(new Boom(this.traps[i].loc.x, this.traps[i].loc.y, this.ctx));
            this.traps.splice(i, 1);
        }
    }

    for (let i = 0; i < this.booms.length; i++) {
        this.booms[i].run(); // run all the booms
        if (this.booms[i].isDead) {
            this.booms.splice(i, 1); // delete boom after it fades away
        }
    }

    
    //KEEP THIS LINE AT THE BOTTOM
    ctx.restore();


    if (this.player.health <= 0) {
        console.log("game over")
    }

    //platforms cleared logic
    if (this.platforms.length <= this.platformsCleared) {
        console.log("you win")
    }
}


//load platforms using reference randomness for efficient and playable platforms
World.prototype.loadPlatforms = function (n) {
    for (let i = 0; i < n; i++) {
        if (i == 0) {
            this.platforms[i] = new Platform(1000, this.dims.top / 2, 100, this.groundThickness, this.ctx, false);
        } else {
            if (this.platforms[i - 1].length != 1) {
                let length = randomNumber(0, 1);
                length = Math.round(length);
                let min = 120;
                let max = 200;
                let x = randomNumber(min, max);
                let y = randomNumber((max - x) / 2, -(max - x) / 2);
                this.platforms[i] = new Platform(this.platforms[i - 1].loc.x + x, this.platforms[i - 1].loc.y - y, 100, this.groundThickness, this.ctx, false, length);
            } else {
                let length = randomNumber(0, 1);
                length = Math.round(length);
                this.platforms[i] = new Platform(this.platforms[i - 1].loc.x + this.platforms[i - 1].width, this.platforms[i - 1].loc.y, 100, this.groundThickness, this.ctx, false, length);
            }
        }
    }
    for (let i = 0; i < 10; i++) {
        if (i == 3) {
            this.platforms.push(new Platform(60 + (i * 100), this.dims.top / 1.35, 100, this.groundThickness, this.ctx, false, 0, true, i));
        } else if (i == 4) {
            this.platforms.push(new Platform(60 + (i * 100), -1000, 100, this.groundThickness, this.ctx, false, 0, true, i));
        } else {
            this.platforms.push(new Platform(60 + (i * 100), this.dims.top / 2, 100, this.groundThickness, this.ctx, false, 0, true, i));
        }
    }
}

// load all the traps
World.prototype.loadTraps = function (n) {
    for (let i = 0; i < n; i++) {
        this.traps[i] = new Trap(randomNumber(1300, this.dims.width), randomNumber(0, this.dims.top), this.ctx);
    }
}

