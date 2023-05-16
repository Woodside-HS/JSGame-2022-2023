class level3 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
        this.craze = 0;
    }
    loadPlatforms() {
        this.platforms[0] = new Level3Platform(150,400,100);
        this.platforms[1] = new Level3Platform(300,430,75);
        this.platforms[2] = new Level3Platform(400,400,25);
        this.platforms[3] = new Level3Platform(475,380,25);
        this.platforms[4] = new Level3Platform(550,350,150);
        this.platforms[5] = new Level3Platform(770,300,100);
        this.platforms[6] = new Level3Platform(950,325,50); 
        this.platforms[7] = new Level3Platform(1050,350,50);
        this.platforms[8] = new Level3Platform(1150,360,20);
        this.platforms[9] = new Level3Platform(1220,370,20);
        this.platforms[10] = new Level3Platform(1290,380,20);
        this.platforms[11] = new Level3Platform(1360,390,20);
        this.platforms[12] = new Level3Platform(1430,350,100);
        // this.platforms[13] = new Level3Platform(150,400,100); //!continue
        // this.platforms[14] = new Level3Platform(150,400,100);
        // this.platforms[15] = new Level3Platform(150,400,100);
        // this.platforms[16] = new Level3Platform(150,400,100);
        // this.platforms[17] = new Level3Platform(150,400,100);
        // this.platforms[18] = new Level3Platform(150,400,100);
        // this.platforms[19] = new Level3Platform(150,400,100);
        // this.platforms[20] = new Level3Platform(150,400,100);
        // this.platforms[21] = new Level3Platform(150,400,100);
        // this.platforms[22] = new Level3Platform(150,400,100);
        // this.platforms[23] = new Level3Platform(150,400,100);
        // this.platforms[24] = new Level3Platform(150,400,100);
        // this.platforms[25] = new Level3Platform(150,400,100);
        // this.platforms[26] = new Level3Platform(150,400,100);


        
    }

    loadResources(pArray1, pArray2) {
        //pArray1 is the array of platforms with powerup 1 
        //pArray2 is the array of platforms with powerup 2
        //which powerup goes into which platform is hardcoded
        
    }
    
    loadEnemies(pArray1, pArray2) { 
        //pArray1 is the array of platforms with enemy 1 
        //pArray2 is the array of platforms with enemy 2
        //hardcoding which type of enemies
    }

    loadPlatformImages(){
        // template function 
        /*
        for(let i = 0; i < platforms.length; i++){
            this.platformImages[i] = document.createElement("img");
            this.platformImages[i].src = "resources/Platform/platform1" + this.id + ".png";
        }
        */
    }
    loadBackgrounds(){
        // for(let i = 0; i < 3; i++){
        //     this.backgroundImages[i] = document.createElement("img");
        //     this.backgroundImages[i].src = "resources/Background/background" + this.id + ".png";
        // }
    }
    loadEnemy1Images(){
        // template function
        // for(let i = 0; i < 8; i++){
        //     this.enemy1Images[i] = document.createElement("img");
        //     this.enemy1Images[i].src  = "resources/enemy/el"+i+".png";
        // }
    }
    loadEnemy2Images(){
        // template function
        // for(let i = 0; i < 8; i++){
        //     this.enemy2Images[i] = document.createElement("img");
        //     this.enemy2Images[i].src  = "resources/enemy/el"+i+".png";
        // }
    }

    update() {
        // template function
    }




}