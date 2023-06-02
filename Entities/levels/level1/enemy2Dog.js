//its gonna be a dog off of his leash thats chasing after you
//bound to a platform by his leash
class lvl1Enemy2 {
    constructor(x, y, platformWidth, enemyWidth, enemyHeight) {
        //x and y are the platforms location, w is the width
        this.loc = new JSVector(x, y - enemyHeight-5); //enemies location, does change
        this.pLoc = new JSVector(x, y); //platforms location, should not change
        this.pWidth = platformWidth;
        this.h = enemyHeight;
        this.w = enemyWidth;
        this.move = .25; // the speed of the enemy movement
        this.isDead = false;
        this.sees = false;
        this.sightSq = 500 * 500;//500 pixesl
        this.charge = 0;
        this.cooldown = 100;
        this.isAttacking = false;
        this.waveDir = new JSVector(0, 0);
        this.projectile;
        //this.loadImages();
    }
    loadImages() {

    }
    run() {
        this.cooldown++;
        if (this.projectile) {
            if (!this.projectile.false) {
                this.projectile.run();
            }
        }
        if (!this.isAttacking) {
            this.render();
            this.update();
            this.checkAttack();
            this.checkHero();
        } else {
            this.charge++;
            this.checkAttack();
            if (this.charge >= 25 && this.cooldown >=100) {
                this.attack();
            } else {
                this.chargeRender();
            }
        }
    }
    attack() {
            //resets the attack
            this.isAttacking = false;
            this.charge = 0;
            let dir = this.waveDir.copy();
            this.projectile = new lvl1Projec(this.loc.x, this.loc.y, dir);
            this.cooldown =0;
        
    }
    chargeRender() {
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y + this.h);
        ctx.lineTo(this.loc.x, this.loc.y + this.h);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
    }
    update() {
        //let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y);
        let hLoc = new JSVector(game.hero.loc.x + (game.hero.width / 2), game.hero.loc.y + (game.hero.height / 2));//gets the ceneter of the hero
        if (this.loc.distanceSquared(hLoc) < this.sightSq) {
            this.sees = true;
        }//need to fix seeing I think
        if (this.sees) {
            this.move = 0;
            if (this.loc.x > this.pLoc.x && this.loc.x < this.pLoc.x + this.pWidth - 45) {
                //if enemy is within the platform, checks for player direction
                if (hLoc.x < this.loc.x) {
                    //if hero is to the left, moves left
                    this.move = -.75;
                } else {
                    this.move = .75;
                }
            }
            this.loc.x += this.move;
        } else {
            this.loc.x += this.move;
            if (this.loc.x > this.pLoc.x + this.pWidth - 45) {
                //hits the other side and bounces
                this.move = -1.25;
            }
            if (this.loc.x < this.pLoc.x) {
                this.move = 1.25;
            }
        }
        this.sees = false;
    }
    render() {
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y);
        ctx.lineTo(this.loc.x + this.w, this.loc.y + this.h);
        ctx.lineTo(this.loc.x, this.loc.y + this.h);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
    checkHero() {
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        if (
            heroLoc.x + heroW > this.loc.x &&
            heroLoc.x < this.loc.x + this.w &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y < this.loc.y + this.h
        ) {
            if (!game.hero.inventory.invulnerability) {
                //if hero is within certain area;
                this.waveDir = JSVector.subGetNew(this.loc, game.hero.loc);
                this.isAttacking = true;
            }
        }
    }
    checkAttack() {
        if (game.hero.statusBlock.isAttacking) {
            if (this.loc.x > game.hero.loc.x && this.loc.x < game.hero.loc.x + 80 && game.hero.posNeg) {
                //enemy is within attack bounds
                if (this.loc.y > game.hero.loc.y && this.loc.y < game.hero.loc.y + game.hero.height) {
                    //console.log("died");
                    this.isDead = true;
                }
            } else if (this.loc.x < game.hero.loc.x && this.loc.x > game.hero.loc.x - 40) {
                //enemy is within attack bounds
                if (this.loc.y > game.hero.loc.y && this.loc.y < game.hero.loc.y + game.hero.height) {
                    //console.log("died");
                    this.isDead = true;
                }
            }
        }
    }
}