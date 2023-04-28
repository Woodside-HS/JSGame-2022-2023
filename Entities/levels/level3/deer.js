class Deer{
    constructor(pIndex, deltaX){ //takes in the platform it will destroy
        this.closeToScreen = [false, 100]; //TODO: if character is within this.closeToScreen[1] from screen, deer will start eating the platform
        this.platform = game.levels[2].platforms[pIndex]; //uses index givne to locate attaches platform
        this.pIndex = pIndex; //initial index of platform //!ISSUE TO CONSIDER: INDEX OF SOME ENEMY PLATFORMS WILL CHANGE IF PLATFORMS KEEP GETTING DESTROYED
        this.pHealth = 10*this.platform.width; //sets plaform health to 
        this.loc = this.platform.loc.copy(); //sets loc to platform loc //! May have to adjust y later to account for platform height
        this.loc.x += deltaX; //deltaX adjusts the loc of the enemy from the default position
    }

    run(){ 
        /*if(){ if the deer meets conditions to begin eating
            eatPlatform();
        }
        */
    }

    eatPlatform(){
        //TODO: decreases platform health; Can change some visual element of the platform with every x decrease of platform health (use mod)
        //TODO: Platform death/splice it out of the platform array for the level. This only impacts level 3 so hard code
        //TODO: set off boolean in level3platform class to render death process
    }

    render(){
        //? Will always be eating if it is on screen so run through eating cycle

    }

    indexAdjustor(){
        //TODO: This function may not end up here but is a reminder to code an index adjustment with the death of an enemy; could also code platform death in the level3Platform class

    }


}