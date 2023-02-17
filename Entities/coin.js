class Coin {
    constructor(x, y, width, radius) {
        let location = Math.floor(Math.random() * width);
        //so the coin is at a random locatio nalong the platfomr
        this.loc = new JSVector(x + location, y - 5);
        this.bounce = 0;
        this.bounceAmount = -.05;
        this.size = radius;
        this.collected = false;
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
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.restore();
    }
    checkHero() {
        let dist = this.loc.distanceSquared(game.hero.loc);
        if (dist < game.hero.height * game.hero.height) {
            game.hero.statusBlock.coins++;
            console.log(game.hero.statusBlock.coins);
            this.collected = true;
        }
    }
}