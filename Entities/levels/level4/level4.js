class level4 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
        this.loadResources();
        this.loadDoors();
        this.loadEnemies();
        this.runEnemies();
    }


    loadPlatforms() {
        this.platforms[0] = new level4platform(150,670,300,true);
        this.platforms[1] = new level4platform(550,670,100,true);
        this.platforms[2] = new level4platform(750,620,100,true);
        this.platforms[3] = new level4platform(950,620,100,true);
        this.platforms[4] = new level4platform(1050,500,110,true);
        this.platforms[5] = new level4platform(1250,500,200,false);
        this.platforms[6] = new level4platform(1050,620,110,false);
        this.platforms[7] = new level4platform(1250,500,110,true);
        this.platforms[8] = new level4platform(1350,620,110,false);
        this.platforms[9] = new level4platform(1050,620,300,true);
        this.platforms[10] = new level4platform(1450,500,100,true);
        this.platforms[11] = new level4platform(1550,400,100,true);
        this.platforms[12] = new level4platform(2050,400,1000,true);
        this.platforms[13] = new level4platform(1370,270,100,true);
        this.platforms[14] = new level4platform(1150,220,110,true);
        this.platforms[15] = new level4platform(3150,400,100,true);
        this.platforms[16] = new level4platform(3250,400,100,false);
        this.platforms[17] = new level4platform(3250,300,100,true);
        this.platforms[18] = new level4platform(3250,300,100,true);

    }

    loadEnemies(){
        this.enemies[0] = new Ghost(150,500,300,50,20)
        this.enemies[1] = new Ghost(650,500,300,50,20)
        this.enemies[2] = new Ghost(1050,500,300,50,20)
        this.enemies[3] = new Clown(150,670,300,50,20)
        this.enemies[4] = new Ghost(2050,250,300,50,20)
        this.enemies[5] = new Ghost(2150,550,300,50,20)
        this.enemies[6] = new Ghost(2250,250,300,50,20)
        this.enemies[7] = new Ghost(2350,550,300,50,20)
        this.enemies[8] = new Ghost(2450,250,300,50,20)
        this.enemies[9] = new Ghost(2550,550,300,50,20)
        this.enemies[10] = new Ghost(2650,250,300,50,20)
        this.enemies[11] = new Ghost(2750,550,300,50,20)
        this.enemies[12] = new Ghost(2850,250,300,50,20)
        this.enemies[13] = new Ghost(2950,550,300,50,20)

    }

    loadDoors(){
        this.doors[0] = new Door(1300,550,1270,430);
        this.doors[1] = new Door(1575,330,2075,330);
        
        
    }
    
    loadResources(){
        this.resources[0] = new Key(1100, 590, 10, 10, 0); 
        this.resources[2] = new Key(1220, 200, 10, 10, 2);
        this.resources[1] = new GhostPowerUp(1200,590,10,10,1)
    }

    runEnemies(){
        for(let i = this.enemies.length-1;i>0;i--){
            this.enemies
        }
    }
}