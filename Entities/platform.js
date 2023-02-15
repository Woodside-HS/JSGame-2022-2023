class Platform {
    constructor(x, y, width, clr, enemyYN, coinYN) {
        this.loc = new JSVector(x, y);
        this.width = width;
        this.height = 10;
        this.clr = clr;
        this.enemies = [];
        this.powerups = [];
        if(enemyYN){
            this.loadEnemies;
        }
        if(coinYN){
            this.loadCoins;
        }
    }
    loadEnemies() {
        this.enemies = new Enemy(this.loc.x,this.loc.y,);
    }
    loadCoins(){

    }
    run() {
        this.render();
        this.checkHero();
    }
    render() {
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);//top left
        ctx.lineTo(this.loc.x + this.width, this.loc.y);//top right
        ctx.lineTo(this.loc.x + this.width, this.loc.y + 10);//bottom right
        ctx.lineTo(this.loc.x, this.loc.y + 10);//bottom left
        //platforms will have uniform height fo now
        ctx.closePath()
        ctx.fillStyle = this.clr;
        ctx.fill();
    }

    checkHero() {
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        if ( //checks if the heros location is overlaping with the platform
            heroLoc.x + heroW > this.loc.x &&
            heroLoc.x < this.loc.x + this.width &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y < this.loc.y + this.height
        ) {
            // console.log("touching platform");
            game.hero.statusBlock.onPlatform = true;
            // game.hero.loc.y = this.loc.y - game.hero.height; // places the hero on the top of the platform
            return true;
        } else {
            return false;
        }
    }
}