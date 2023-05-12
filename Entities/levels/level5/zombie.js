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
            if (this.attackTimer++ >= 100) {
                this.isAtacking = false;
                this.movingL = true;
                this.attackTimer = 0;
            }
            if (game.hero.loc.x > this.loc.x) {
                this.lookingR = true;
                this.lookingL = false;
                this.runAttack();
            } else {
                this.lookingL = true;
                this.lookingR = false;
                this.runAttack();
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
    }
    update() {
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
            this.lookingL = true;
            this.lookingR = false;
        }
        if (this.loc.x <= this.platformLoc.x) {
            this.movingL = false;
            this.movingR = true;
            this.lookingR = true;
            this.lookingL = false;
        }
    }
}