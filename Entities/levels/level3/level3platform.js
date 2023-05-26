/*
things we need
*/

class Level3Platform extends Platform {
    constructor(x, y, w, p) {
        super(x, y, w);
        this.isDead = false;
        this.poisonOak = p;
        this.pCounter = 100;
    }

    run() {
        if(!this.isDead && !this.poisonOak){
            this.update();
            this.renderN(); //normal render
            this.checkHero();
            this.sideCollisions();
        }
        else if(!this.isDead && this.poisonOak){
            this.renderP(); //render poison oak
            if(this.checkHero()){ //could make more efficient down the line by putting the below lines into checkHero, but right now the goal is funcitonality
                if(this.pCounter%5){
                    this.checkHero.health--;
                }
                game.hero.loc.y += Math.random()*6-3; //this one line should be based on platform location
                this.pCounter--;
                if(this.pCounter<2){
                    this.poisonOak = false;
                }
            }

        }

    }

    update() {
        // template function
    }

    renderN() {
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y+10);
        ctx.lineTo(this.loc.x,this.loc.y+10);
        ctx.closePath();
        ctx.fillStyle = "green";
        ctx.fill();
    }

    renderP(){
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y);
        ctx.lineTo(this.loc.x+this.width,this.loc.y+10);
        ctx.lineTo(this.loc.x,this.loc.y+10);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();

    }

    checkHero() {
        super.checkHero();
    }

    sideCollisions(){
    }



}   