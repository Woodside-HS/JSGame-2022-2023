class Spike {
    constructor(x, y, w, h) {
        this.loc = new JSVector(x, y);
        this.w = w
        this.h = h
        this.collected = false;
    }


    run() {
        this.bounceGhostOrb()
        this.render()
        this.checkHero()
    }

    bounceGhostOrb() {
        //so the coin will move up and down gently
        this.bounce += this.bounceAmount;
        if (this.bounce >= 1) {
            this.bounceAmount = -0.1;
        }
        if (this.bounce <= -1) {
            this.bounceAmount = 0.1;
        }
    }
    render() {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.loc.x, this.loc.y, this.w, this.h);
        ctx.closePath(); //beginning and closing path just to be sure
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.restore();
    }
    checkHero() {

        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        if (
            //checks if the heros location is overlaping with the coin
            heroLoc.x + heroW > this.loc.x &&
            heroLoc.x < this.loc.x + this.w &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y < this.loc.y + this.h
        ) {
            game.hero.inventory.hasSpike = true
            this.collected = true;
        }
    }

}