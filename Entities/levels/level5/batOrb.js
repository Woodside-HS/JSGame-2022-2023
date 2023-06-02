class BatOrb {
    constructor(x, y, size) {
        this.loc = new JSVector(x, y);
        this.size = size;
        this.bounce = 0;
        this.bounceAmount = -0.05
        this.collected = false
        this.batImg = null
    }


    run() {
        this.loadImage()
        this.bounceBatOrb()
        this.render()
        this.checkHero()
    }
    loadImage() {
        this.batImg = document.createElement('img');
        this.batImg.src = "Images/Level5/bat/batImg1.png"
    }
    bounceBatOrb() {
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

        ctx.arc(this.loc.x, this.loc.y - this.bounce, this.size, 0, Math.PI * 2);
        ctx.closePath(); //beginning and closing path just to be sure
        ctx.fillStyle = "gray";
        ctx.fill();

        ctx.drawImage(this.batImg, this.loc.x, this.loc.y, this.size, this.size)
        ctx.restore();
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
            game.hero.inventory.batMode = true
            this.collected = true;
        }
    }

}