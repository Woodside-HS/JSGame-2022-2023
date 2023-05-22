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
        this.platforms[4] = new level1platform(650,550,150,false);
        this.platforms[5] = new level1platform(1250,600,150,false)
        this.platforms[6] = new level1platform(950,500,150,true);
        this.platforms[7] = new level1platform(900,650,150,false);
        this.platforms[8] = new level1platform(1150,450,150,false);
        this.platforms[9] = new level1platform(1075,700,150,false);
        this.platforms[10] = new level1platform(1400,600,150,false);

        this.platforms[11] = new level1platform(1500,650,150, false);//! big ground platform
        this.platforms[12] = new level1platform(1750,550,150, true);
        this.platforms[13] = new level1platform(1900,675,150, false);
        this.platforms[14] = new level1platform(2150,550,150,false);
        this.platforms[15] = new level1platform(2750,600,150,false)
        this.platforms[16] = new level1platform(2450,500,150,true);
        this.platforms[17] = new level1platform(2400,650,150,false);
        this.platforms[18] = new level1platform(2650,450,150,false);
        this.platforms[19] = new level1platform(2275,700,150,false);
        this.platforms[20] = new level1platform(2900,600,150,false);

        this.platforms[21] = new level1platform(3000,650,150, false);//! big ground platform
        this.platforms[22] = new level1platform(3250,550,150, true);
        this.platforms[23] = new level1platform(3400,675,150, false);
        this.platforms[24] = new level1platform(3550,650,150,false);
        this.platforms[25] = new level1platform(3750,600,150,false)
        this.platforms[26] = new level1platform(4050,500,150,true);
        this.platforms[27] = new level1platform(4000,650,150,false);
        this.platforms[28] = new level1platform(3950,450,150,false);
        this.platforms[29] = new level1platform(3875,700,150,false);
        this.platforms[30] = new level1platform(4200,600,150,false);
    }
    loadFreeEnemies(){
        this.enemies[0] = new lvl1Enemy1(25,650,0,150,200);
    }

    loadResources() {
        this.resource[0] = new lvl1Resource1(200,200);
    }


}