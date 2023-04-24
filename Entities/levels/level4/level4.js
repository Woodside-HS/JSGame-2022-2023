class level4 extends Level{
    constructor(){
        super();   
        this.walls = [];
        this.loadPlatforms();
        this.loadCoins();
        this.loadWalls();
        this.runWalls();
        
        
    }

    runWalls(){
        for(let i = 0;i<this.walls.length;i++){
            this.walls[i].run();
        }
    }
    loadPlatforms() {
        this.platforms[0] = new level4platform(150,670,300);
        this.platforms[1] = new level4platform(550,670,100);
        this.platforms[2] = new level4platform(750,620,100);
        this.platforms[3] = new level4platform(950,620,100);
        this.platforms[4] = new level4platform(1050,500,100);
        this.platforms[5] = new level4platform(1250,500,100);
        this.platforms[6] = new level4platform(1450,670,100);
        this.platforms[7] = new level4platform(1650,670,100);
        this.platforms[8] = new level4platform(1850,670,100);

        
    }

    loadWalls(){
        this.walls[0] = new Wall(100,200,100);
    }


}