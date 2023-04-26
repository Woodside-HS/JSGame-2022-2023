class level1platform extends Platform {
    constructor(x,y,w){
        super(x,y,w);
        this.enemy = new lvl1Enemy2(this.loc.x,this.loc.y,this.width,15,15);
        //this.img;
        //TODO get image in
    }
    run(){
        this.update();
        this.render();
        this.checkHero();
    }
    update() {
        if(!this.enemy.isDead){
            this.enemy.run();
        }
        if(this.enemy.isDead){
            console.log("enemy dead");
        }
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