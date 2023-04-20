/*
things we need
*/

class Platform {
    constructor(x, y, w) {
        this.loc = new JSVector(x, y);
        this.width = w;
        this.height = w/3;
        this.coin = null;
        this.resource = null;
        this.enemy = null;
        this.image = null;
        this.id = null;
    }

    update() {
        // template function
    }

    render() {
        // template function
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

    run() {
        this.update();
        this.render();
        this.checkHero();
    }

}   