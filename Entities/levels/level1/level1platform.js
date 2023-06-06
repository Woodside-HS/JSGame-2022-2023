class level1platform extends Platform {
    constructor(x,y,w,hasDog){
        super(x,y,w);
        this.height = 50;
        if(hasDog){
            this.enemy = new lvl1Enemy2(this.loc.x,this.loc.y,this.width,25,25);
        }
        let rand = Math.random();
        this.img = document.createElement("img");
        if(rand >=.5){
            this.img.src = "Images/Level1/Lvl1Platform/plat1.png"
        } else {
            this.img.src = "Images/Level1/Lvl1Platform/plat2.png"
        }
        if(this.loc.x == 4400){
            this.img.src = "Images/Level1/Lvl1End/lvl1StopFloor.png"
            //the lazy way of specifiying the image
        }
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
        if(this.loc.x == 4400){
            //the lzy way part 2
            ctx.drawImage(this.img, this.loc.x,this.loc.y,this.width,50);
        } else {
            ctx.drawImage(this.img, this.loc.x,this.loc.y-25,this.width,50);
        }
        
    }
}