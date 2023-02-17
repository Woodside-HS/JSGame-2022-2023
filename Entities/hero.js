class Hero {
    constructor(x, y) {
        this.loc = new JSVector(x, y);//ideally loc would only be a y value for how far up the screen they are
        this.vel = new JSVector(0, 0);
        this.cursorLoc = new JSVector(0, 0);//location of the cursor aids in attacking
        this.posNeg = true;//related to attacking
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
            isDead: false,
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
        ctx.font = "50px serif";
        ctx.fillText(this.statusBlock.hp, this.loc.x, this.loc.y - 20)
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
        //! %%%%%%%%%%%%%%%  
        if (this.statusBlock.hp <= 0||this.loc.y>canvas.height) { // the hero "dies" when hp <= 0
            this.statusBlock.isDead = true;
        }

        if (this.statusBlock.isDead) { // if the hero is dead it brings you to the start screen (gameState1)
            gameState = 0;
            /** 
            *! i have not made this function yet!!!!!
            *TODO im not sure we need to make this function but it might be helpfull
            */
            this.reSetHero();
        }
        //!%%%%%%%%%%%%%%
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
        let jumpLimit = 1; //! change this later! I set it to a large number just for testing
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
        this.posNeg = true;//right side
        if (this.cursorLoc.x < this.loc.x) {
            this.posNeg = false;//left side
        }

        if (this.statusBlock.isAttacking && !this.statusBlock.onCoolDown) {
            console.log("is attacking")
            this.statusBlock.attackTimer--;
            ctx.save()
            ctx.beginPath();
            if (this.posNeg) {
                ctx.moveTo(this.loc.x + (50), this.loc.y + 0);//top left
                ctx.lineTo(this.loc.x + (80), this.loc.y + 0);//top right
                ctx.lineTo(this.loc.x + (80), this.loc.y + this.height);//bottom right
                ctx.lineTo(this.loc.x + (50), this.loc.y + this.height);//bottom left
            } else {
                ctx.moveTo(this.loc.x - (30), this.loc.y + 0);//top left
                ctx.lineTo(this.loc.x + (0), this.loc.y + 0);//top right
                ctx.lineTo(this.loc.x + (0), this.loc.y + this.height);//bottom right
                ctx.lineTo(this.loc.x - (30), this.loc.y + this.height);//bottom left
            }

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

    reSetHero() {
        //TODO im not sure we need this function but it might be usfull in the future
        this.statusBlock.hp = 101;

    }
}