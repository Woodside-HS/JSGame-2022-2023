class level4platform extends Platform {
    constructor(x,y,w,isFloor,isTrapFloor){
        super(x,y,w);
        this.isFloor = isFloor
        this.isTrapFloor = isTrapFloor
        this.loadImages(); 
    }

    loadImages(){
        this.img = document.createElement("img");
        this.img.src  = "resources/Platform/platform.png";
        
        this.img2 = document.createElement("img");
        this.img2.src  = "resources/Platform/platform2.png";
        
        
        this.wallImg = document.createElement("img");
        this.wallImg.src = "resources/Platform/wall.png";
      }

    run(){
        this.update();
        if(this.isFloor && !this.isTrapFloor){
            this.checkHeroFloor();
        } else if(!this.isFloor && !this.isTrapFloor){
            this.checkHeroWall();
        }
        this.render();
    
    }
    update() {

    }

    render() {
        if(!this.isFloor){
            ctx.drawImage(this.wallImg,this.loc.x,this.loc.y+10,20,-this.width-10);
            /*ctx.beginPath();
            ctx.moveTo(this.loc.x,this.loc.y+10);
            ctx.lineTo(this.loc.x+10,this.loc.y+10);
            ctx.lineTo(this.loc.x+10,this.loc.y-this.width);
            ctx.lineTo(this.loc.x,this.loc.y-this.width);
            ctx.closePath();
            ctx.fillStyle = "purple";
            ctx.fill();*/
        } else {    
        ctx.drawImage(this.img,this.loc.x,this.loc.y,this.width,20);
        if(this.isTrapFloor)
        ctx.drawImage(this.img2,this.loc.x,this.loc.y,this.width,20);
        /*ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y+10);
        ctx.lineTo(this.loc.x,this.loc.y+10);
        ctx.closePath();
        ctx.fillStyle = "purple";
        ctx.fill();*/
        }
    }

    checkHeroWall() {
        if(!this.isFloor){
            let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
            let heroH = game.hero.height; // the heros height
            let heroW = game.hero.width; // the heros width
                if (
                //checks if the heros location is overlaping with the platform
                heroLoc.x + heroW > this.loc.x &&
                heroLoc.x < this.loc.x + 10 &&
                heroLoc.y + heroH > this.loc.y - this.width &&
                heroLoc.y < this.loc.y
            ) {
                if(!game.hero.inventory.ghostPowerUp){
                if(game.clickingD)
                game.hero.loc.x = this.loc.x-50;
                if(game.clickingA)
                game.hero.loc.x = this.loc.x+10;
                }
            }
        }

    }

    checkHeroFloor(){
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        if (
            //checks if the heros location is overlaping with the platform
            heroLoc.x + heroW > this.loc.x+15 &&
            heroLoc.x < this.loc.x + this.width-15 &&
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
                game.hero.loc.y = this.loc.y + (this.height); // sets the hero the bottom of the platform so it wont go past
            }
            game.hero.statusBlock.onPlatform = true;
            return true;
        }
        return false;
    }
}