class Hero {
    constructor() {
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
        ctx.moveTo(200, 200);
        ctx.lineTo(250, 200)
        ctx.lineTo(250, 250)
        ctx.lineTo(200, 250)
        ctx.closePath()
        ctx.fillStyle = "green";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.restore()
    }
}