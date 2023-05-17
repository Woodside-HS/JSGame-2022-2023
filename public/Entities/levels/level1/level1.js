class level1 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
        this.loadBackgrounds(3);
    }
    loadPlatforms() {
        this.platforms[0] = new level1platform(150,690,10000);
        //need the specific platform class to get started on loading platforms
        
    }




}