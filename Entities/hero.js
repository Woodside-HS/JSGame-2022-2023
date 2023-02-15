class Hero {
    constructor() {
        this.loc = new JSVector(200, 200);//ideally loc would only be a y value for how far up the screen they are
        this.vel = new JSVector(0, 0);
        this.height = 50;
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
            isAttacking: false,
        }

        this.attackRate = 20
        this.attackTimer = 0;
        // this.clicks = 0;
        // this.attacks = 0;
    }

    run() {
        this.render();
        this.update();
        this.attack();
        if (!this.statusBlock.onPlatform) {
            this.vel.add(this.grav);
        } else {
            this.vel.y = 0 // stops the hero on the platform
        }
        this.loc.add(this.vel);
        game.hero.statusBlock.onPlatform = false;
    }
    render() {
        ctx.save(); // draws the hero 
        ctx.beginPath();//Malcom you need begin path
        //without begin path, it continues to render old boxes so it wont be cleared 
        // MY BAD LMAO!
        ctx.fillText(this.loc.x + 20, this.loc.y - 20, this.statusBlock.hp)
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y + this.height);
        ctx.lineTo(this.loc.x, this.loc.y + this.height);
        ctx.closePath()
        ctx.fillStyle = "green";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.restore()
    }
    update() {
        if (game.mouseDown) {
            this.statusBlock.isAttacking = true;
        }
        if (this.statusBlock.isAttacking) {
            this.attackTimer++;
        }
        if (this.attackTimer >= this.attackRate) {
            this.statusBlock.isAttacking = false
            this.attackTimer = 0
        }

    }

    jump() {
        let jumpLimit = 2000000000000000000; //! change this later! I set it to a large number just for testing
        //we might not need a jumplimit but its good to have for now
        if (this.statusBlock.jumpCount < jumpLimit) {
            // stops the velocity of the hero than subtracts 5 and incroments the jumpcount
            this.vel.y = 0 // stops the hero
            this.vel.y -= 5 // pushes the hero up
            this.statusBlock.onPlatform = false; // just an etra test to make sure the hero is not on a platform
            this.statusBlock.jumpCount++;
        }
    }
    attack() {
        console.log(this.attackTimer)
        if (this.statusBlock.isAttacking) {
            ctx.save()
            ctx.beginPath();
            ctx.moveTo(this.loc.x + 60, this.loc.y + 20);
            ctx.lineTo(this.loc.x + 70, this.loc.y + 20);
            ctx.lineTo(this.loc.x + 70, this.loc.y + 30);
            ctx.lineTo(this.loc.x + 60, this.loc.y + 30)
            ctx.closePath()
            ctx.fillStyle = "green";
            ctx.strokeStyle = "black";
            ctx.fill();
            ctx.restore();
        }
    }
}