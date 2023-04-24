class level4platform extends Platform {
    constructor(x,y,w,isFloor){
        super(x,y,w);
        this.isFloor = isFloor;
        if(this.isFloor === false){
            this.loc.x = this.loc.x-this.width
        }
    }
    run(){
        this.update();
        if(this.isFloor){
        this.checkHero();
        this.renderFloor();
        } else {
            this.renderWall();
            this.checkHeroWall();
        }
        
    }
    update() {

    }

    renderFloor() {
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y+10);
        ctx.lineTo(this.loc.x,this.loc.y+10);
        ctx.closePath();
        ctx.fillStyle = "purple";
        ctx.fill();
    }

    renderWall(){
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        ctx.lineTo(this.loc.x+10,this.loc.y);
        ctx.lineTo(this.loc.x+10,this.loc.y-this.width);
        ctx.lineTo(this.loc.x,this.loc.y-this.width);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
    }

    checkHeroWall() {
            let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
            let heroH = game.hero.height; // the heros height
            let heroW = game.hero.width; // the heros width
            if (
                heroLoc.x + heroW > this.loc.x &&
                heroLoc.x < this.loc.x + this.width &&
                heroLoc.y + heroH > this.loc.y &&
                heroLoc.y < this.loc.y + this.height
            ){
                console.log("collision")
            }
    }
}