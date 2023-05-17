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
        this.attacking = false;
        this.lookingL = false;
        this.lookingR = false
        this.attackTimer = 0;
        this.hitHero = false;
    }
    run() {
        this.render();
        this.update();
        this.checkHero()
        this.moveZombie()
        this.attackHero();
    }
    render() {
        ctx.save()
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rect(0, 0, this.w, this.h)
        if (this.lookingR) {
            ctx.moveTo(0, -10)
            ctx.lineTo(100, -10);
        } else if (this.lookingL) {
            ctx.moveTo(0, -10)
            ctx.lineTo(-100, -10);
        }
        ctx.stroke()
        ctx.fill()
        ctx.restore()
        // console.log("shoulde be here")
    }
    attackHero() {
        if (this.isAtacking) {

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
                this.isAtacking = false;
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
        this.punchLocL = new JSVector(this.loc.x - 20, this.loc.y)
        this.punchLocR = new JSVector(this.loc.x + 20, this.loc.y)
        ctx.save()
        if (this.lookingL) {
            ctx.translate(this.punchLocL.x, this.punchLocL.y);
        } else {
            ctx.translate(this.punchLocR.x, this.punchLocR.y);
        }

        ctx.rect(0, 0, this.w, this.h)
        ctx.stroke()
        ctx.fill()
        ctx.restore()

        if (!this.hitHero) { // checks if the zombie has already hit the hero in this attack cycle
            game.hero.statusBlock.hp -= 25
            console.log("a zombie hit the hero for 25 hp \n the hero now has: " + game.hero.statusBlock.hp)
            this.hitHero = true
        }

    }
    update() {
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
            this.isAtacking = true;
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
}