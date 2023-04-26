class level4 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
    }

    loadPlatforms() {
        this.platforms[0] = new level4platform(150,670,300,true);
        this.platforms[1] = new level4platform(550,670,100,true);
        this.platforms[2] = new level4platform(750,620,100,true);
        this.platforms[3] = new level4platform(950,620,100,true);
        this.platforms[4] = new level4platform(1050,500,100,true);
        this.platforms[5] = new level4platform(1250,500,100,true);
        this.platforms[6] = new level4platform(1450,670,100,true);
        this.platforms[7] = new level4platform(1650,670,100,true);
        this.platforms[8] = new level4platform(1850,670,100,true);
        this.platforms[9] = new level4platform(1850,670,100,false);

        
    }
}