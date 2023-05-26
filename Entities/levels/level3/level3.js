class level3 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadBackgrounds(3);
        this.loadCoins();
        this.craze = 0;
        this.loadResources([4],[5],[6])
    }
    loadPlatforms() {
        this.platforms[0] = new Level3Platform(150,400,100, false);
        this.platforms[1] = new Level3Platform(300,430,75, true);
        this.platforms[2] = new Level3Platform(400,400,25, false);
        this.platforms[3] = new Level3Platform(475,380,25, false);
        this.platforms[4] = new Level3Platform(550,350,150, false);
        this.platforms[5] = new Level3Platform(770,300,100, false);
        this.platforms[6] = new Level3Platform(950,325,50, false); 
        this.platforms[7] = new Level3Platform(1050,350,50, false);
        this.platforms[8] = new Level3Platform(1250,360,20, true); //!expand space between platforms
        this.platforms[9] = new Level3Platform(1340,370,20, true);
        this.platforms[10] = new Level3Platform(1430,380,20, false);
        this.platforms[11] = new Level3Platform(1520,390,20, false);
        this.platforms[12] = new Level3Platform(1610,350,100, false);
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

    loadResources(pArray1, pArray2, pArray3) {
        let temp;
        for(let i = 0; i<pArray1.length; i++){
            this.resources[i] = new Berries(this.platforms[pArray1[i]].loc.x, this.platforms[pArray1[i]].loc.y);
        }
        for(let j = 0; j<pArray2.length; j++){
            temp = new IncreasedSpeed(this.platforms[pArray2[j]].loc.x, this.platforms[pArray2[j]].loc.y, this.platforms[pArray2[j]].width, 12);
            this.resources.push(temp);
        }
        for(let k = 0; k<pArray3.length; k++){
            temp = new Befriend(this.platforms[pArray3[k]].loc.x, this.platforms[pArray3[k]].loc.y, this.platforms[pArray3[k]].width, 12);
            this.resources.push(temp);
        }

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
    // }
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