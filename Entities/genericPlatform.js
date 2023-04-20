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

    sideCollisions(){
        //does not work vertically for now
//         if (game.hero.loc.x + game.hero.width < this.loc.x) {
//             //the hero is to the left of the platform
//             if (game.hero.loc.x + game.hero.width > this.loc.x - 10) {
//                 if (
//                     game.hero.loc.y + game.hero.height - 5 > this.loc.y &&
//                     game.hero.loc.y < this.loc.y + game.hero.height
//                 ) {
//                     //makes sure hero is not above the platform
//                     hittingLeft = true;
//                     hittingRight = false;
//                     //hitting left works(for now)
//                 }
//             }
//         } //left check if statement
//         if (game.hero.loc.x > this.loc.x + this.width) {
//             //checks that it is right
//             if (game.hero.loc.x < this.loc.x + this.width + 10) {
//                 if (
//                     game.hero.loc.y + game.hero.height - 5 > this.loc.y &&
//                     game.hero.loc.y < this.loc.y + game.hero.height
//                 ) {
//                     hittingRight = true;
//                     hittingLeft = false;
//                 }
//             }
//         }
//         if (game.hero.loc.y + game.hero.height < this.loc.y - 11) {
//             hittingLeft = false;
//             hittingRight = false;
//         }
    }


    run() {
        this.update();
        this.render();
        this.checkHero();
        this.sideCollisions();
    }

}   