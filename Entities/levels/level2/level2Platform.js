class level2platform extends Platform {
    constructor(x, y, w, ynE) {
        super(x, y, w);
        // this.enemy = []
        this.ynZ = ynZ; // yes/no trash enemy
        if (this.ynE == true) {
            this.enemy = new zombie(x, y, 20, 20, this.width)
            // this.loadTrashEnemy()
            // console.log(this.ynZ)
        }
    }
    run() {
        this.update()
        this.render();
        this.checkHero();
    }
    update() {
        if (this.enemy) {
            this.enemy.run()
        }
    }
    updateZombie() {
        for (let i = 0; i < this.enemy.length; i++) {
            if (this.enemy[i].isDead) {
                this.enemy.splice(i, 1)
            }
        }
    }
    checkHero() {
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        if (
            //checks if the heros location is overlaping with the platform
            heroLoc.x + heroW > this.loc.x &&
            heroLoc.x < this.loc.x + this.width &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y < this.loc.y + this.height
        ) {
            // console.log("touching platform");
            if (game.hero.vel.y > 0) {
                // checks if the hero is falling
                game.hero.statusBlock.jumpCount = 0;
                game.hero.vel.y = 0;
                game.hero.loc.y = this.loc.y - game.hero.height; // places the hero on the top of the platform
            } else {
                // makes it so you cant go through the bottom of the platform
                game.hero.vel.y = 0;
                game.hero.loc.y = this.loc.y + this.height; // sets the hero the bottom of the platform so it wont go past
            }
            game.hero.statusBlock.onPlatform = true;
            return true;
        }
        return false;
    }
    render() {
        ctx.save()
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y + 10);
        ctx.lineTo(this.loc.x, this.loc.y + 10);
        ctx.closePath();
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.restore()
    }

}