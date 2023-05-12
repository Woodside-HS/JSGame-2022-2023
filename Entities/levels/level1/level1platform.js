class level1platform extends Platform {
    constructor(x,y,w,hasDog){
        super(x,y,w);
        this.height = 50;
        if(hasDog){
            this.enemy = new lvl1Enemy2(this.loc.x,this.loc.y,this.width,15,15);
        }
        let rand = Math.random();
        if(rand >-.5){
            this.img = document.createElement("img");
            this.img.src = "Images/Level1/Lvl1Platform/plat1.png"
        } else {
            this.img = document.createElement("img");
            this.img.src = "Images/Level1/Lvl1Platform/plat2.png"
        }
        //this.img =
        //TODO get image in
    }
    run(){
        this.update();
        this.render();
        this.checkHero();
    }
    update() {
        if(this.enemy){
            //have to use nested if statemnets because some platforms dont have enemies
            if(!this.enemy.isDead){
                this.enemy.run();
            }
        }
    }

    render() {
        ctx.drawImage(this.img, this.loc.x,this.loc.y,this.width,50);
    }
}