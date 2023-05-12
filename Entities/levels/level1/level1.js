class level1 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
        this.loadBackgrounds(5);
        this.loadFreeEnemies();
    }
    loadPlatforms() {
        //enemy type 1 is loaded as a part of the platform, 4th variable
        this.platforms[0] = new level1platform(150,500,150, false);
        this.platforms[1] = new level1platform(0,650,150, false);//! big ground platform
        this.platforms[2] = new level1platform(400,550,150, true);
        this.platforms[3] = new level1platform(600,675,150, false);
    }
    loadFreeEnemies(){
        this.enemies[0] = new lvl1Enemy1(25,650,0,150,200);
    }




}