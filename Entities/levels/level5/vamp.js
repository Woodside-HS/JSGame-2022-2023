class Vamp {
    constructor(x, y, h, w) {
        this.loc = new JSVector(x, y)
        this.w = w;
        this.h = h;
        this.isDead = false;
        this.hp = 100;
        this.movingL = true;
        this.movingR = false
        this.movingSpeed = 0.5
        this.lockedMovingSpeed = 1
        this.isAttacking = false;
        this.isLocked = false;
        this.startLocX = x
        this.movementSize = 50
        this.veiwDist = 400; // the distance that the vamp can see
        this.bulletDmg = 25; // the distance between
    }
    run() {
        this.render()
        this.update()
        this.moveVamp();
        if (!game.hero.statusBlock.isAttacking) {
            this.checkHero()
        }
        this.lookForHero()
        this.attackHero()

    }


    render() {
        ctx.save()
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rect(0, 0, this.w, this.h)
        if (this.lookingR) {

            ctx.moveTo(0, 0)
            ctx.lineTo(100, 0)
        } else if (this.lookingL) {

            ctx.moveTo(0, 0)
            ctx.lineTo(-100, 0)
        }
        ctx.stroke()
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.restore()
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

        if (this.isLocked) {
            // this.loc.x = game.hero.loc.x
            // this.loc.y = game.hero.loc.y
            this.movingSpeed = this.lockedMovingSpeed
            if (this.checkHeroPos() === 'right') {
                this.movingR = true;
                this.movingL = false
            } else {
                this.movingR = false
                this.movingL = true
            }
        }
    }

    attackHero() {
        if (this.isAttacking) {
            game.hero.statusBlock.hp = 0
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
            // this.movingL = false;
            // this.movingR = false;
            this.isAttacking = true;
            console.log("ehrer")
            return true;
        }
        return false;
    }

    lookForHero() {
        let hero = game.hero;
        if (
            this.loc.x - this.veiwDist < hero.loc.x &&
            this.loc.x + this.veiwDist > hero.loc.x
        ) {
            if (this.checkHeroPos() === "right" && this.lookingR) {
                this.isLocked = true
            } else if (this.checkHeroPos() === "left" && this.lookingL) {
                this.isLocked = true
            }
        } else {
            this.isLocked = false
        }
    }
    moveVamp() {
        if (this.movingL && !this.movingR) { // moving the zombie Left
            this.loc.x -= this.movingSpeed
        } else if (this.movingR && !this.movingL) { // moves the zombie Right
            this.loc.x += this.movingSpeed
        }


        if (!this.isLocked) {
            if (this.startLocX + this.movementSize < this.loc.x) {

                this.movingR = false;
                this.movingL = true;
            }
            if (this.startLocX - this.movementSize > this.loc.x) {
                this.movingL = false;
                this.movingR = true;
            }
        }



        if (this.movingR) {
            this.lookingR = true;
            this.lookingL = false;
        } else if (this.movingL) {
            this.lookingL = true;
            this.lookingR = false;
        }
    }


}

