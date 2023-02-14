class Platform {
    constructor(x,y,width,clr) {
        this.loc = new JSVector(x,y);
        this.width = width;
        this.clr = clr;
    }
    run(){
        this.render();
        this.checkHero();
    }
    render(){
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);//top left
        ctx.lineTo(this.loc.x+this.width, this.loc.y);//top right
        ctx.lineTo(this.loc.x+this.width, this.loc.y+10);//bottom right
        ctx.lineTo(this.loc.x, this.loc.y+10);//bottom left
        //platforms will have uniform height fo now
        ctx.closePath()
        ctx.fillStyle = this.clr;
        ctx.fill();
    }
    checkHero(){
        //should check if the hero is within 5 px or so above this platform and set onPlatform to true
        if(game.hero.loc.x<this.loc.x && game.hero.loc.x>this.loc.x+this.width){
            //checks if hero is between left and right bounds of the platform
            if(game.hero.loc.y<this.loc.y && game.hero.loc.y>this.loc.y-5){
                console.log("touching platform");
                //checks if the hero is above the platform
                game.hero.statusBlock.onPlatform = true;

            }//end of above if statemnt
        }//ed of bounds if statemnet
    }

}