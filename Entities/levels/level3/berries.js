class Berries{
    constructor(x, y){
        this.crazeFactor = 0.1; //Berries make bears go... crazy
        this.loc = new JSVector(x, y);
        this.collected = false;

    }

    run(){
        if(!this.collected){
            this.render();
            this.checkHero();
        }

    }

    checkHero(){
        if(this.loc.distance(hero.loc)<=20){ //hard coded, check later w/image added
            level3.craze += this.crazeFactor; //bears will check against craze factor
            this.collected = true;
        }
    }

    render(){
        //!need image
        
    }

}