class Deer{
    constructor(pIndex, deltaX, platforms){ //takes in the platform it will destroy
        this.eatingDistance = 500; //determines when the dear starts to eat
        this.platform = platforms[pIndex]; //uses index given to locate attaches platform
        //this.pIndex = pIndex; //initial index of platform //! Unnecessary?
        this.pHealth = 5*this.platform.width; //sets plaform health
        this.loc = this.platform.loc.copy(); //sets loc to platform loc //! May have to adjust y later to account for platform height
        this.loc.x += deltaX; //deltaX adjusts the loc of the enemy from the default position
        this.docile = false;
        this.health = 50;
        this.size = 20;
    }

    run(){ 
        if(this.health>0){
        this.render();
        if(this.loc.distance(game.hero.loc) < this.eatingDistance && !this.docile){ //possibly edit
            this.eatPlatform();
        }

        let disCheck = this.loc.distance(game.hero.loc) < 60;

        if(game.hero.statusBlock.isAttacking && disCheck){
            this.health--;
        }
    }
    }

    eatPlatform(){
        this.pHealth--;
        //TODO: Change some visual element of the platform with every x decrease of platform health (use mod)
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
        //TODO: Docile yields different render

    }

}