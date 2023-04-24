class level1 extends Level{
    constructor(){
        super();   
        this.loadPlatforms();
        this.loadCoins();
    }
    loadPlatforms() {
        this.platforms[0] = new level1platform(250,550,100);
        this.platforms[1] = new level1platform(0,650,6000);//! big ground platform
        //need the specific platform class to get started on loading platforms
        
    }




}