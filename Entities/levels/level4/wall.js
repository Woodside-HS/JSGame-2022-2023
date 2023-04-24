class Wall{
    constructor(x,y,height){
        this.loc = new JSVector(x,y)
        this.height = height;
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