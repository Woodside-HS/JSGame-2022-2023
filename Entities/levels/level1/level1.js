class level1 extends Level{
    constructor(){
        super();   
        this.loadPlatforms();
        this.loadCoins();
    }
    loadPlatforms() {
        this.platforms[0] = new level1platform(100,400,100);
        //need the specific platform class to get started on loading platforms
        
    }




}