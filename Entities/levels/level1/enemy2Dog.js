//its gonna be a dog off of his leash thats chasing after you
//bound to a platform by his leash
class lvl1Enemy2 {
    constructor(x, y, platformWidth, enemyWidth, enemyHeight) {
        //x and y are the platforms location, w is the width
        this.loc = new JSVector(x, y - enemyHeight); //enemies location, does change
        this.pLoc = new JSVector(x, y); //platforms location, should not change
        this.pWidth = platformWidth;
        this.h = enemyHeight;
        this.w = enemyWidth;
        this.move = .25; // the speed of the enemy movement
        this.isdead = false;
        this.sees = false;
        this.sightSq = 2500;//50 pixesl
        //this.loadImages();
    }
    loadImages() {

    }
    run() {
        this.render();
        this.update();
        this.checkAttack();
        this.checkHero();
    }
    update() {
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y);
        if (this.loc.distanceSquared(heroLoc) < this.sightSq) {
            this.sees = true;
            console.log("seen enemy");
        }
        if (this.sees) {
            this.move = 0;
            if (this.loc.x > this.pLoc.x && this.loc.x < this.pLoc.x + this.pWidth - 45) {
                //if enemy is within the platform, checks for player direction
                if (heroLoc.x < this.loc.x) {
                    //if hero is to the left, moves left
                    this.move = -.4;
                } else {
                    this.move = .4;
                }
            }
            this.loc.x += this.move;
        } else {
            this.loc.x += this.move;
            if (this.loc.x > this.pLoc.x + this.pWidth - 45) {
                //hits the other side and bounces
                this.move = -.25;
            }
            if (this.loc.x < this.pLoc.x) {
                this.move = .25;
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
            //checks if the heros location is overlaping with the coin/thing
            heroLoc.x + heroW > this.loc.x &&
            heroLoc.x < this.loc.x + this.w &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y < this.loc.y + this.h
        ) {
            if (!game.hero.inventory.invulnerability) {
                game.hero.statusBlock.hp--;
            }
        }
    }
    checkAttack() {
        if (game.hero.statusBlock.isAttacking) {
            if (this.loc.x > game.hero.loc.x && this.loc.x < game.hero.loc.x + 80 && game.hero.posNeg) {
                //enemy is within attack bounds
                if (this.loc.y > game.hero.loc.y && this.loc.y < game.hero.loc.y + game.hero.height) {
                    this.isdead = true;
                }
            } else if (this.loc.x < game.hero.loc.x && this.loc.x > game.hero.loc.x - 40) {
                //enemy is within attack bounds
                if (this.loc.y > game.hero.loc.y && this.loc.y < game.hero.loc.y + game.hero.height) {
                    this.isdead = true;
                }
            }
        }
    }
}