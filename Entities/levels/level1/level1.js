class level1 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
        this.loadBackgrounds(3);
        this.loadFreeEnemies();
    }
    loadPlatforms() {
        //enemy type 1 is loaded as a part of the platform, 4th variable
        this.platforms[0] = new level1platform(150,500,300, false);
        this.platforms[1] = new level1platform(0,650,6000, false);//! big ground platform
        this.platforms[2] = new level1platform(700,550,300, true);
        //need the specific platform class to get started on loading platforms
    }
    loadFreeEnemies(){
        this.enemies[0] = new lvl1Enemy1(100,650,50,300,200);
    }




}