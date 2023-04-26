class level1 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
        this.loadBackgrounds(3);
    }
    loadPlatforms() {
        this.platforms[0] = new level1platform(150,500,100);
        this.platforms[1] = new level1platform(0,650,6000);//! big ground platform
        this.platforms[2] = new level1platform(500,550,100);
        //need the specific platform class to get started on loading platforms
    }




}