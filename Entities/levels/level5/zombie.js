class zombie {
    constructor(x, y, h, w, pw) {
        this.w = w;
        this.h = h
        this.platformWidth = pw;
        this.platformLoc = new JSVector(x, y);
        this.loc = new JSVector(x, y - this.h); // sets the zombie on the top of platform its sitting on.
        this.isDead = false;
        this.hp = 100;
        this.movingL = true;
        this.movingR = false
        this.movingSpeed = 0.5
        this.isAttacking = false;
        this.lookingL = false;
        this.lookingR = false
        this.attackTimer = 0;
        this.hitHero = false;
        this.zombieDmg = 50 // the damege that the zombie does
        this.spearDmg = 50 // the damage that the spear does
        this.fistDmg = 25 // the damege that the fist does
        this.bulletDmg = 10 // the damege that the bullet does
        this.gotHit = false
        this.invincableTimer = 0
        this.invincableLength = 200
        this.zombieImgs = [];
        this.changeFrame = 0;
        this.frameNum = 0;

    }
    run() {
        this.loadImages()
        this.render();
        this.update();
        if (!game.hero.statusBlock.isAttacking) {
            this.checkHero()
        }
        this.moveZombie()
        this.attackHero();
        this.checkIfGettingAttacked()
    }

    loadImages() {
        for (let i = 0; i < 10; i++) {
            this.zombieImgs[i] = document.createElement("img")
            this.zombieImgs[i].src = `Images/Level5/zombie/zombie${i + 1}.png`
        }
    }
    render() {

        this.changeFrame++;
        if (this.frameNum >= this.zombieImgs.length - 1) {
            this.frameNum = 1;
        }

        if (this.changeFrame >= 10) {
            this.changeFrame = 0;
            this.frameNum++
        }

        ctx.save()
        ctx.translate(this.loc.x, this.loc.y);
        // ctx.rect(0, 0, this.w, this.h)
        // ctx.scale(this.w, this.y)
        // ctx.drawImage(this.zombieImgs[this.frameNum], 0, 0, this.w, this.h)
        if (this.lookingR) {

            ctx.scale(-1, 1)
            ctx.drawImage(this.zombieImgs[this.frameNum], -this.w, 0, this.w, this.h)
        } else if (this.lookingL) {

            ctx.drawImage(this.zombieImgs[this.frameNum], 0, 0, this.w, this.h)

        }
        ctx.stroke()
        ctx.fill()
        ctx.restore()
    }
    attackHero() {
        if (this.isAttacking) {
            if (this.checkHeroPos() == "right") {
                this.lookingR = true;
                this.lookingL = false;
                this.runAttack();
            } else if (this.checkHeroPos() == "left") {
                this.lookingL = true;
                this.lookingR = false;
                this.runAttack();
            }

            if (this.attackTimer++ >= 100) {
                this.isAttacking = false;
                this.hitHero = false

                if (this.checkHeroPos() == "left") {
                    this.movingL = true;
                } else if (this.checkHeroPos() == "right") {
                    this.movingR = true;
                }
                this.attackTimer = 0;
            }
        }

    }
    runAttack() {
        if (this.isAttacking) {
            this.punchLocL = new JSVector(this.loc.x - 20, this.loc.y)
            this.punchLocR = new JSVector(this.loc.x + 20, this.loc.y)
            ctx.save()
            if (this.lookingL) {
                ctx.translate(this.punchLocL.x, this.punchLocL.y);
            } else {
                ctx.translate(this.punchLocR.x, this.punchLocR.y);
            }

            // ctx.rect(0, 0, this.w, this.h)
            // ctx.stroke()
            // ctx.fill()
            ctx.restore()

            if (!this.hitHero) { // checks if the zombie has already hit the hero in this attack cycle
                game.hero.statusBlock.hp -= this.zombieDmg
                this.hitHero = true
            }
        }

    }
    update() {
        if (this.hp <= 0) {
            this.isDead = true
        }
        if (game.hero.statusBlock.isShooting) {
            for (let i = 0; i < game.hero.bullets.length; i++) {
                if (game.hero.bullets[i].checkBullet(this.loc, this.w, this.h)) {
                    this.hp -= this.bulletDmg
                    game.hero.bullets[i].isDead = true;
                }
            }
        }



    }



    checkHeroPos() { // return left if the hero is left of the enemy and right if rights
        if (game.hero.loc.x > this.loc.x) {
            return "right"
        } else {
            return "left"
        }
    }
    checkHero() {
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        if (
            //checks if the heros location is overlaping with the platform
            heroLoc.x + heroW > this.loc.x &&
            heroLoc.x < this.loc.x + this.w &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y < this.loc.y + this.h
        ) {
            this.movingL = false;
            this.movingR = false;
            this.isAttacking = true;
            return true;
        }
        return false;
    }
    moveZombie() {
        if (this.movingL && !this.movingR) { // moving the zombie Left
            this.loc.x -= this.movingSpeed
        } else if (this.movingR && !this.movingL) { // moves the zombie Right
            this.loc.x += this.movingSpeed
        }

        if (this.loc.x + this.w >= this.platformLoc.x + this.platformWidth) {
            this.movingR = false;
            this.movingL = true;

        }
        if (this.loc.x <= this.platformLoc.x) {
            this.movingL = false;
            this.movingR = true;
        }


        if (this.movingR) {
            this.lookingR = true;
            this.lookingL = false;
        } else if (this.movingL) {
            this.lookingL = true;
            this.lookingR = false;
        }
    }
    stopMoving() {
        this.movingL = false;
        this.movingR = false;
    }

    checkIfGettingAttacked() {
        let heroAttackHitBox;
        if (game.hero.posNeg) {
            heroAttackHitBox = game.hero.attackHitBoxL
        } else {
            heroAttackHitBox = game.hero.attackHitBoxR
        }
        if (
            game.hero.statusBlock.isAttacking &&
            !this.gotHit &&
            this.loc.x + this.w > heroAttackHitBox.x &&
            this.loc.x < heroAttackHitBox.x + heroAttackHitBox.w &&
            this.loc.y + this.h > heroAttackHitBox.y &&
            this.loc.y < heroAttackHitBox.y + heroAttackHitBox.h
        ) { // if the hero hits the zombie 
            this.isAttacking = false;
            this.stopMoving()
            if (game.hero.inventory.hasSpear) {
                this.hp -= this.spearDmg
            } else {
                this.hp -= this.fistDmg
            }
            this.gotHit = true;
        }

        if (this.gotHit && this.invincableTimer++ >= this.invincableLength) {
            this.gotHit = false;
            this.invincableTimer = 0;

            if (this.checkHeroPos() === "right") {
                this.movingR = true;
            } else {
                this.movingL = true
            }
        }
    }


}