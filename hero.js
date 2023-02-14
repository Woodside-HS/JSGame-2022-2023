class Hero {
    constructor() {
        this.loc = new JSVector(200,200);//ideally loc would only be a y value for how far up the screen they are
        this.width = 50;
        this.grav
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
        }
    }

    run() {
        // console.log("hero was run")

        ctx.save(); // draws the hero 
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x+this.width, this.loc.y);
        ctx.lineTo(this.loc.x+this.width, this.loc.y+this.width);
        ctx.lineTo(this.loc.x, this.loc.x+this.width);
        ctx.closePath()
        ctx.fillStyle = "green";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.restore()
    }
}