class Deer{
    constructor(pIndex, deltaX, platforms){ //takes in the platform it will destroy
        this.eatingDistance = 500; //determines when the dear starts to eat
        this.platform = platforms[pIndex]; //uses index given to locate attaches platform
        this.pHealth = 5*this.platform.width; //sets plaform health
        this.loc = this.platform.loc.copy(); //sets loc to platform loc
        this.loc.x += deltaX; //deltaX adjusts the loc of the enemy from the default position
        this.loc.y-=25;
        this.docile = false;
        this.health = 50;
        this.size = 20;
        this.speed = 0; //! NOT FUNCTIONAL JUST FOR EASE IN GOING THROUGH AN ARRAY
        this.img = document.createElement("img");
        this.img.src = "Images/Level3/deer.png";
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
        if(this.platform.isDead){
            this.health = 0;
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
        ctx.drawImage(this.img, this.loc.x, this.loc.y, 30, 30);
        //TODO: Docile yields different render

    }

}