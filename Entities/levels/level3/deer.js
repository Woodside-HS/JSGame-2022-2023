class Deer{
    constructor(pIndex, deltaX){ //takes in the platform it will destroy
        this.eatingDistance = 500; //determines when the dear starts to eat
        this.platform = game.levels[2].platforms[pIndex]; //uses index given to locate attaches platform
        //this.pIndex = pIndex; //initial index of platform //! Unnecessary?
        this.pHealth = 10*this.platform.width; //sets plaform health
        this.loc = this.platform.loc.copy(); //sets loc to platform loc //! May have to adjust y later to account for platform height
        this.loc.x += deltaX; //deltaX adjusts the loc of the enemy from the default position
    }

    run(){ 
        this.render();
        if(this.loc.distance(this.hero.loc) < this.eatingDistance){ //possibly edit
            this.eatPlatform();
        }
    }

    eatPlatform(){
        //TODO: decreases platform health; Change some visual element of the platform with every x decrease of platform health (use mod)
        if(this.pHealth < 0){
            this.platform.isDead = true;
        }
    }

    render(){ 
        //! begin to closePath = temporary; once image found, can determine changes in platform as well
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, 10, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = "brown";
        ctx.fill();
        //? Will always be eating if it is on screen so run through eating cycle

    }


}