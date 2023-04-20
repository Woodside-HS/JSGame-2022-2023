class level1platform extends Platform {
    constructor(x,y,w){
        super(x,y,w);
    }
    run(){
        this.update;
        this.render();
        this.checkHero();
    }
    update() {
    }

    render() {
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y+10);
        ctx.lineTo(this.loc.x,this.loc.y+10);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
    }
}