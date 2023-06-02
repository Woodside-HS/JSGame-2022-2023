/*
things we need
*/

class Level3Platform extends Platform {
    constructor(x, y, w, p) {
        super(x, y, w);
        this.isDead = false;
        this.poisonOak = p;
        this.pCounter = 100;
    }

    run() {
        if(!this.isDead && !this.poisonOak){
            this.update();
            this.renderN(); //normal render
            this.checkHero();
            this.sideCollisions();
        }
        else if(!this.isDead && this.poisonOak){
            this.renderP(); //render poison oak
            let temp = this.checkHero();
            if(temp){ //so checkHero is consistent
                if(this.pCounter%5){
                    this.checkHero.health--;
                }
                game.hero.loc.y += Math.random()*6-3; //this one line should be based on platform location
                this.pCounter--;
                if(this.pCounter<2){
                    this.poisonOak = false;
                }
            }

        }

    }

    update() {
       //maybe use for photos
    }

    renderN() {
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y+10);
        ctx.lineTo(this.loc.x,this.loc.y+10);
        ctx.closePath();
        ctx.fillStyle = "green";
        ctx.fill();
    }

    renderP(){
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y+10);
        ctx.lineTo(this.loc.x,this.loc.y+10);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();

    }

    checkHero() { //copied and pasted from genericPlatform... something was weird with the booleans
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        if (
            //checks if the heros location is overlaping with the platform
            heroLoc.x + heroW - 20 > this.loc.x &&
            heroLoc.x + 10 < this.loc.x + this.width &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y + 2 * heroH / 3 < this.loc.y + this.height / 2
        ) {
            // console.log("touching platform");
            if (game.hero.vel.y > 0) {
                // checks if the hero is falling
                game.hero.statusBlock.jumpCount = 0;
                game.hero.vel.y = 0;
                game.hero.loc.y = this.loc.y - game.hero.height; // places the hero on the top of the platform
            }
            game.hero.statusBlock.onPlatform = true;
            return true;
        }
        return false;
    }

    sideCollisions(){
    }



}   