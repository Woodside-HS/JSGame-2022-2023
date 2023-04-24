class Wall extends Platform{
    constructor(x,y,w){
        super(x,y,w);
        this.loc = new JSVector(x,y)
        this.height = w;
    }
    run(){
        this.update();
        this.render();
        this.checkHero();
    }
    update() {

    }

    render() {
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, 25, 0, Math.PI * 2);
        //ctx.moveTo(this.loc.x,this.loc.y);
        //ctx.lineTo(this.loc.x,this.loc.y+this.height);
        ctx.closePath();
        ctx.fillStyle = "purple";
        ctx.fill();
    }

    checkHero(){

    }
}