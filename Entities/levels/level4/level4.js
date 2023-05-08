class level4 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
        this.loadEnemies();
    }

    loadPlatforms() {
        this.platforms[0] = new level4platform(150,670,300,true);
        this.platforms[1] = new level4platform(550,670,100,true);
        this.platforms[2] = new level4platform(750,620,100,true);
        this.platforms[3] = new level4platform(950,620,100,true);
        this.platforms[4] = new level4platform(1050,500,100,true);
        this.platforms[5] = new level4platform(1250,500,100,false);
        this.platforms[6] = new level4platform(1050,620,120,false);

    }

    loadEnemies(){
    }
    
    loadCoins(){
    }
}