class JumpBoost {
    constructor(x, y, size) {
        this.loc = new JSVector(x, y)
        this.size = size
        this.bounce = 0;
        this.bounceAmount = -0.05
        this.collected = false
    }

    run() {
        this.bounceCoin();
        this.render()
        this.checkHero();
    }

    render() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y - this.bounce, this.size, 0, Math.PI * 2);
        ctx.closePath(); //beginning and closing path just to be sure
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.restore();
        // console.log("there is a thisfalsdfj")
    }
    bounceCoin() {
        //so the coin will move up and down gently
        this.bounce += this.bounceAmount;
        if (this.bounce >= 1) {
            this.bounceAmount = -0.1;
        }
        if (this.bounce <= -1) {
            this.bounceAmount = 0.1;
        }
    }
    checkHero() {
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        if (
            //checks if the heros location is overlaping with the coin
            heroLoc.x + heroW > this.loc.x &&
            heroLoc.x < this.loc.x + this.size &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y < this.loc.y + this.size
        ) {
            game.hero.statusBlock.coins++;
            if (game.hero.inventory.dbCoin) {
                game.hero.statusBlock.coins++;
            }
            // console.log(game.hero.statusBlock.coins);
            game.hero.inventory.JumpBoost = true
            console.log(game.hero.inventory.JumpBoost)
            this.collected = true;
            displayCoinCount(); //displays the coin count
        }
    }
}