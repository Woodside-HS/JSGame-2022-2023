class level3 extends Level{
    constructor(id, levels){
        super(id);   
        this.loadPlatforms();
        this.end = Date.now() + 60000;
        this.loadBackgrounds(3);
        this.loadCoins();
        this.loadResources([2, 6, 8, 10, 11, 11, 13, 15, 20, 22, 23, 25, 27, 30, 32],[34],[5, 7, 9, 12, 18, 26]);
        this.loadEnemies([11, 19, 25], [3, 3, 19, 19, 19, 30, 33, 24]);
        this.endX;
        this.endY;
    }

    loadPlatforms() {
        this.platforms[0] = new Level3Platform(150,400,100, false);
        this.platforms[1] = new Level3Platform(300,430,75, true);
        this.platforms[2] = new Level3Platform(475,380,25, false);
        this.platforms[3] = new Level3Platform(550,350,150, false);
        this.platforms[4] = new Level3Platform(660,500,40, false);
        this.platforms[34] = new Level3Platform(600,540,40, false);
        this.platforms[5] = new Level3Platform(820,375,150, false); 
        this.platforms[6] = new Level3Platform(1050,350,50, false);
        this.platforms[7] = new Level3Platform(1320,360,20, true); 
        this.platforms[8] = new Level3Platform(1430,370,20, true);
        this.platforms[9] = new Level3Platform(1520,380,20, true);
        this.platforms[10] = new Level3Platform(1610,390,20, true);
        this.platforms[11] = new Level3Platform(1700,350,100, false);
        this.platforms[12] = new Level3Platform(1880,400,10, false);
        this.platforms[13] = new Level3Platform(1970,400,100, false);
        this.platforms[14] = new Level3Platform(2130,370,50, true);
        this.platforms[15] = new Level3Platform(2230,380,20, false);
        this.platforms[16] = new Level3Platform(2330,450,20, true);
        this.platforms[17] = new Level3Platform(2500,560,10, false);
        this.platforms[18] = new Level3Platform(2550,600,50, true);
        this.platforms[19] = new Level3Platform(2650,550,300, false);
        this.platforms[20] = new Level3Platform(3100,530,10, true);
        this.platforms[21] = new Level3Platform(3160,570,50, false);
        this.platforms[22] = new Level3Platform(3300,540,10, true);
        this.platforms[23] = new Level3Platform(3350,500,75, false);
        this.platforms[24] = new Level3Platform(3475,460,100, true);
        this.platforms[25] = new Level3Platform(3600,420,100, false);
        this.platforms[26] = new Level3Platform(3850,400,10, true);
        this.platforms[27] = new Level3Platform(3930,440,10, false);
        this.platforms[28] = new Level3Platform(4110,450,10, true);
        this.platforms[29] = new Level3Platform(4190,400,10, false);
        this.platforms[30] = new Level3Platform(4270,330,50, true);
        this.platforms[31] = new Level3Platform(4420,350,10, false);
        this.platforms[32] = new Level3Platform(4480,500,50, true);
        this.platforms[33] = new Level3Platform(4550,450,200, false);
        this.platforms[35] = new Level3Platform(0,0,0, false); //! To fix color issue
    
        this.endX = this.platforms[this.platforms.length-1].loc.x + this.platforms[this.platforms.length-1].width; //- 50;
        this.endY = this.platforms[this.platforms.length-1].loc.y + 20;    
    }

    run(){
        super.run();
        if(game.hero.loc.x>this.endX && game.hero.loc.y<this.endY){
            gameState = 4;
        }
        if(Date.now()>this.end){
            game.hero.statusBlock.isDead = true;
        }
        else{
            let sec = Math.ceil((this.end - Date.now())/(1000));
            let clr;
            if(sec>15){
                clr = "white";
            }
            else{
                clr = "red";
            }
            drawText(ctx, sec, "30px serif", 25 + game.camLoc.x, 25, clr, clr);
        }
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
        let temp;
        for(let i = 0; i<pArray1.length; i++){
            this.enemies[i] = new Deer(pArray1[i], 30, this.platforms);
        }
        for(let j = 0; j<pArray2.length; j++){
            let deltaX = Math.floor(Math.random()*this.platforms[pArray2[j]].width);
            temp = new Bear(pArray2[j], deltaX, this.platforms);
            this.enemies.push(temp);
        }
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