class Coin {
    constructor(x, y, width, radius, isJumpBoost) {
        let location = Math.floor(Math.random() * width);
        //so the coin is at a random locatio nalong the platfomr
        this.loc = new JSVector(x + location, y - 5);
        this.bounce = 0;
        this.bounceAmount = -.05;
        this.size = radius;
        this.collected = false;
        this.coinClr = "yellow";
        this.jumpBoostClr = "lightblue"
        this.isJumpBoost = isJumpBoost;

    }
    run() {
        this.bounceCoin();
        this.render();
        this.checkHero();
    }
    bounceCoin() {
        //so the coing will move up and down gently
        this.bounce += this.bounceAmount;
        if (this.bounce >= 1) {
            this.bounceAmount = -.1;
        }
        if (this.bounce <= -1) {
            this.bounceAmount = .1;
        }
    }
    render() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y - this.bounce, this.size, 0, Math.PI * 2);
        ctx.closePath();//beginning and closing path just to be sure
        if (this.isJumpBoost) {
            ctx.fillStyle = this.jumpBoostClr;
        } else {
            ctx.fillStyle = "yellow";
        }
        ctx.fill();
        ctx.restore();
    }
    checkHero() {
        let dist = this.loc.distanceSquared(game.hero.loc);
        if (dist < game.hero.height * game.hero.height && this.isJumpBoost) { // checks if its a jumpboost
            game.hero.inventory.jumpBoost = true
            console.log("you got a jumpboost");
            this.collected = true;
        } else if (dist < game.hero.height * game.hero.height) { // if its not any other powerup itll be a coin.
            game.hero.statusBlock.coins++;
            console.log(game.hero.statusBlock.coins);
            this.collected = true;
        }
    }
}