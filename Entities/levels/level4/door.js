class Door{
    constructor(x,y,dx,dy){
        this.loc = new JSVector(x,y);
        this.dloc = new JSVector(dx,dy);
        this.width = 40;
        this.height = 70;
        
     
    }

    run(){
        this.render();
        this.checkHero();
    }

    render(){
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y+this.height);
        ctx.lineTo(this.loc.x,this.loc.y+this.height);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.dloc.x,this.dloc.y);
        ctx.lineTo(this.dloc.x+this.width,this.dloc.y);
        ctx.lineTo(this.dloc.x+this.width,this.dloc.y+this.height);
        ctx.lineTo(this.dloc.x,this.dloc.y+this.height);
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
    }

    checkHero(){
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        let doorLoc = new JSVector(this.dloc.x,this.dloc.y);
        if(
            (heroLoc.x + heroW > this.loc.x &&
            heroLoc.x < this.loc.x + this.width &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y < this.loc.y + this.height) && game.hero.inventory.keyCount>0
        ){
            game.hero.loc = doorLoc;
            game.hero.inventory.keyCount--;
        }
    }
}