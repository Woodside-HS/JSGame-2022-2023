class level1 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
        this.loadBackgrounds(3);
    }
    loadPlatforms() {
        this.platforms[0] = new level1platform(150,500,300, true);
        this.platforms[1] = new level1platform(0,650,6000, false);//! big ground platform
        this.platforms[2] = new level1platform(700,550,300, false);
        //need the specific platform class to get started on loading platforms
    }




}