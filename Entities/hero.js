class Hero {
    constructor() {
        this.loc = new JSVector(200, 200);//ideally loc would only be a y value for how far up the screen they are
        this.vel = new JSVector(0, 0);
        this.height = 50;
        this.width = 50;
        this.grav = new JSVector(0, 0.2);//gravity for when falling
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
            onCoolDown: false,
            coolDownTimer: 100, // the length of the attack cooldown 
            attackTimer: 50,  // the length/amount of time that the hero attacks for
        }
    }

    run() {
        this.render();
        this.update();
        // this.attack();
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
        if (game.mouseDown && !this.statusBlock.onCoolDown) { // attacking if mouse is down and the heros not on cooldown
            this.statusBlock.isAttacking = true;
        } else if (this.statusBlock.onCoolDown) { // runs the cooldown timer
            console.log("onCoolDown (cant attack)")
            this.statusBlock.coolDownTimer--;
        }
        if (this.statusBlock.coolDownTimer <= 0 && this.statusBlock.onCoolDown) { // if the cooldown timer is 0 turns cooldown off
            this.statusBlock.onCoolDown = false;
            this.statusBlock.coolDownTimer = 100
        }
        this.attack();


    }

    jump() {
        let jumpLimit = 2000000000000000000; //! change this later! I set it to a large number just for testing
        //we might not need a jumplimit but its good to have for now
        //jumplimit should be reset when you touch a platform, only alowed to jump as many times as your jumplimit
        if (this.statusBlock.jumpCount < jumpLimit) {
            // stops the velocity of the hero than subtracts 5 and incroments the jumpcount
            this.vel.y = 0 // stops the hero
            this.vel.y -= 6 // pushes the hero up
            this.statusBlock.onPlatform = false; // just an etra test to make sure the hero is not on a platform
            this.statusBlock.jumpCount++;
        }
    }
    attack() {
        if (this.statusBlock.isAttacking && !this.statusBlock.onCoolDown) {
            console.log("is attacking")
            this.statusBlock.attackTimer--;
            ctx.save()
            ctx.beginPath();
            ctx.moveTo(this.loc.x + 50, this.loc.y + 0);//top left
            ctx.lineTo(this.loc.x + 80, this.loc.y + 0);//top right
            ctx.lineTo(this.loc.x + 80, this.loc.y + this.height);//bottom right
            ctx.lineTo(this.loc.x + 50, this.loc.y + this.height);//bottom left
            ctx.closePath()
            ctx.fillStyle = "darkgreen";
            ctx.strokeStyle = "black";
            ctx.fill();
            ctx.restore();
        }
        if (this.statusBlock.attackTimer <= 0) {
            this.statusBlock.attackTimer = 100
            this.statusBlock.isAttacking = false
            this.statusBlock.onCoolDown = true;
        }
    }
}