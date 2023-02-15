class Platform {
    constructor(x, y, width, clr) {
        this.loc = new JSVector(x, y);
        this.width = width;
        this.height = 10;
        this.clr = clr;
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

    //! i didnt want to delete your work so i just commented it out.
    // checkHero(){
    //     //should check if the hero is within 5 px or so above this platform and set onPlatform to true
    //     if(game.hero.loc.x<this.loc.x && game.hero.loc.x>this.loc.x+this.width){
    //         //checks if hero is between left and right bounds of the platform
    //         if(game.hero.loc.y<this.loc.y && game.hero.loc.y>this.loc.y-5){
    //             console.log("touching platform");
    //             //checks if the hero is above the platform
    //             game.hero.statusBlock.onPlatform = true;

    //         }//end of above if statemnt
    //     }//ed of bounds if statemnet
    // }

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
            game.hero.statusBlock.onPlatform = false;
            return false;
        }
    }
}