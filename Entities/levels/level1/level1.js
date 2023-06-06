class level1 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
        this.loadBackgrounds(5);
        this.loadFreeEnemies();
        this.loadResources();
        this.tokens = 0;
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

        //temp platform for end testing
        this.platforms[31] = new level1platform(4400,600,500,false);//will want custom landing pad in future
        this.platforms[32] = new lvl1BusStop(4800,500);
    }
    loadFreeEnemies(){
        this.enemies[0] = new lvl1Enemy1(25,650,0,150,200);
    }

    loadResources() {
        //resources work not, just have to get them placed in
        this.resources[0] = new lvl1Resource1(400,400);//coin
        this.resources[1] = new lvl1Resource2(600,400);//bus token
        this.resources[2] = new lvl1Shop(4400,500,5);//this is the shop
        //Bus Tokens Below
        this.resources[3] = new lvl1Resource2(1000,600);
        this.resources[4] = new lvl1Resource2(1200,400);
        this.resources[5] = new lvl1Resource2(1400,650);
        this.resources[6] = new lvl1Resource2(1600,500);
        this.resources[7] = new lvl1Resource2(2000,400);
        this.resources[8] = new lvl1Resource2(2400,600);
        this.resources[9] = new lvl1Resource2(2800,550);
        this.resources[10] = new lvl1Resource2(3000,600);
        this.resources[11] = new lvl1Resource2(3400,400);
        this.resources[12] = new lvl1Resource2(3800,550);
        this.resources[13] = new lvl1Resource2(4200,400);
        //coins below
        this.resources[] = new lvl1Resource1(500,400);
        this.resources[] = new lvl1Resource1(1100,500);
        this.resources[] = new lvl1Resource1(1700,600);
        this.resources[] = new lvl1Resource1(2100,700);
        this.resources[] = new lvl1Resource1(2500,600);
        this.resources[] = new lvl1Resource1(2900,500);
        this.resources[] = new lvl1Resource1(3100,400);
        this.resources[] = new lvl1Resource1(3500,500);
        this.resources[] = new lvl1Resource1(3700,400);
        this.resources[] = new lvl1Resource1(4100,500);
    }


}