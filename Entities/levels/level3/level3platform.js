/*
things we need
*/

class Level3Platform extends Platform {
    constructor(x, y, w) {
        super(x, y, w);
        this.isDead = false;
    }

    run() {
        if(!this.isDead){
            this.update();
            this.render();
            this.checkHero();
            this.sideCollisions();
        }
    }

    update() {
        // template function
    }

    render() {
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y+10);
        ctx.lineTo(this.loc.x,this.loc.y+10);
        ctx.closePath();
        ctx.fillStyle = "green";
        ctx.fill();
    }

    checkHero() {
        super.checkHero();
    }

    sideCollisions(){
    }



}   