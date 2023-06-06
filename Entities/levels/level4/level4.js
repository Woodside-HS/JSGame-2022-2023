class level4 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
        this.loadResources();
        this.loadDoors();
        this.loadEnemies();
        this.loadBackgrounds(4);
         
    }


    loadPlatforms() {
        this.platforms[0] = new level4platform(150,670,100,true);
        this.platforms[19] = new level4platform(250,670,100,true,true);
        this.platforms[20] = new level4platform(350,670,100,true);
        this.platforms[1] = new level4platform(550,670,100,true);
        this.platforms[2] = new level4platform(750,620,100,true);
        this.platforms[3] = new level4platform(950,620,120,true);
        this.platforms[4] = new level4platform(1050,500,120,true);
        this.platforms[5] = new level4platform(1250,500,200,false);
        this.platforms[6] = new level4platform(1050,620,110,false);
        this.platforms[7] = new level4platform(1250,500,110,true);
        this.platforms[8] = new level4platform(1350,620,110,false);
        this.platforms[9] = new level4platform(1050,620,100,true);
        this.platforms[21] = new level4platform(1150,620,100,true);
        this.platforms[22] = new level4platform(1250,620,100,true);
        this.platforms[10] = new level4platform(1450,500,100,true);
        this.platforms[11] = new level4platform(1550,400,100,true);
        this.platforms[12] = new level4platform(2050,400,100,true);
        this.platforms[23] = new level4platform(2150,400,100,true);
        this.platforms[24] = new level4platform(2250,400,100,true);
        this.platforms[25] = new level4platform(2350,400,100,true);
        this.platforms[26] = new level4platform(2450,400,100,true);
        this.platforms[27] = new level4platform(2550,400,100,true,true);
        this.platforms[28] = new level4platform(2650,400,100,true);
        this.platforms[29] = new level4platform(2750,400,100,true);
        this.platforms[30] = new level4platform(2850,400,100,true);
        this.platforms[31] = new level4platform(2950,400,100,true);
        this.platforms[13] = new level4platform(1370,270,100,true);
        this.platforms[14] = new level4platform(1150,220,100,true);
        this.platforms[15] = new level4platform(3150,400,110,true);
        this.platforms[16] = new level4platform(3250,400,90,false);
        this.platforms[32] = new level4platform(3050,400,100,false);
        this.platforms[33] = new level4platform(3050,300,100,false);
        this.platforms[34] = new level4platform(3050,200,100,false);
        this.platforms[35] = new level4platform(3050,100,100,false);
        this.platforms[36] = new level4platform(3050,100,100,false);
        this.platforms[37] = new level4platform(2450,300,100,true);
        
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
        this.enemies[14] = new Clown(1150,220,100,50,20)

    }

    loadDoors(){
        this.doors[0] = new Door(1300,550,1270,430);
        this.doors[1] = new Door(1575,330,2075,330);
        
        
    }
    
    loadResources(){
        this.resources[0] = new Key(1100, 590, 10, 10); 
        this.resources[1] = new Key(1220, 200, 10, 10);
        this.resources[2] = new Crucifix(2200,380,10,10)
        this.resources[3] = new GhostPowerUp(3000,220,10,10)

    }

    loadBackgrounds(num){ 
        /*let backgrounds = [];
        for(let i = 0; i < num; i++){
            backgrounds[i] = document.createElement("img");
            let path = "Images/Level" + this.id +"/Lvl" + this.id + "Background/bg" + (i+1)+".png";
            //the images need to be set in order from furthest back to furthest forward
            console.log(path);
            backgrounds[i].src = path;
        }
        this.background = new genericBackground(backgrounds);
     */   
    }
}