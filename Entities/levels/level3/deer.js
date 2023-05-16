class Deer{
    constructor(pIndex, deltaX){ //takes in the platform it will destroy
        this.closeToScreen = [false, 100]; //TODO: if character is within this.closeToScreen[1] from screen, deer will start eating the platform
        this.platform = game.levels[2].platforms[pIndex]; //uses index given to locate attaches platform
        this.pIndex = pIndex; //initial index of platform //! Constant as platforms still exist in the array, just don't use collision delection
        this.pHealth = 10*this.platform.width; //sets plaform health to 
        this.loc = this.platform.loc.copy(); //sets loc to platform loc //! May have to adjust y later to account for platform height
        this.loc.x += deltaX; //deltaX adjusts the loc of the enemy from the default position
    }

    run(){ 
        this.render();
        /*if(){ if the deer meets conditions to begin eating
            eatPlatform();
        }
        */
    }

    eatPlatform(){
        //TODO: decreases platform health; Change some visual element of the platform with every x decrease of platform health (use mod)
        //TODO: Set off boolean in associated platform so that it "dies"
    }

    render(){ 
        //! begin to closePath = temporary
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, 10, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = "brown";
        ctx.fill();
        //? Will always be eating if it is on screen so run through eating cycle

    }


}