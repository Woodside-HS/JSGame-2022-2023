class Hero {
    constructor() {
        this.loc = new JSVector(200, 200);//ideally loc would only be a y value for how far up the screen they are
        this.vel = new JSVector(0, 0);
        this.width = 50;
        this.grav = new JSVector(0, 0.05);//gravity for when falling
        this.inventory = {
            dbJump: false,
            dash: false,
            loveRay: false,
            block: false,
        }
        this.statusBlock = {
            hp: 100,
            coins: 0,
            shots: 10,
            onPlatform: false,
            jumpCount: 0,
        }
    }

    run() {
        this.render();
        this.update();
        if (!this.statusBlock.onPlatform) {
            this.vel.add(this.grav);
        } else {
            console.log("on platform")
            this.vel.y = 0 // stops the hero on the platform
        }
        this.loc.add(this.vel)
    }
    render() {
        ctx.save(); // draws the hero 
        ctx.beginPath();//Malcom you need begin path
        //without begin path, it continues to render old boxes so it wont be cleared 
        // MY BAD LMAO!
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y + this.width);
        ctx.lineTo(this.loc.x, this.loc.y + this.width);
        ctx.closePath()
        ctx.fillStyle = "green";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.restore()
    }
    update() {

    }

    jump() {
        let jumpLimit = 2000000000000000000; //! change this later! I set it to a large number just for testing
        //we might not need a jumplimit but its good to have for now
        if (this.statusBlock.jumpCount < jumpLimit) {
            // stops the velocity of the hero than subtracts 5 and incroments the jumpcount
            this.vel.y = 0
            this.vel.y -= 5
            this.statusBlock.jumpCount++;
        }
    }
}