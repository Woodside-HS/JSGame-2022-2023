class Hero {
    constructor() {
        this.loc = new JSVector(200,200);//ideally loc would only be a y value for how far up the screen they are
        this.vel = new JSVector(0,0);
        this.width = 50;
        this.grav = new JSVector(0,0.05);//gravity for when falling
        this.inventory = {
            dbJump: false,
            dash: false,
            loveRay: false,
            block: false,
        }
        this.statusBlock = {
            hp: 100,
            coins: 0,
            shots: 10,
            onPlatform: false,
        }
    }

    run() {
        this.render();
        if(!this.statusBlock.onPlatform){
            this.vel.add(this.grav);
        }
        this.loc.add(this.vel)
    }
    render(){
        ctx.save(); // draws the hero 
        ctx.beginPath();//Malcom you need begin path
        //without begin path, it continues to render old boxes so it wont be cleared
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x+this.width, this.loc.y);
        ctx.lineTo(this.loc.x+this.width, this.loc.y+this.width);
        ctx.lineTo(this.loc.x, this.loc.y+this.width);
        ctx.closePath()
        ctx.fillStyle = "green";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.restore()
    }
}