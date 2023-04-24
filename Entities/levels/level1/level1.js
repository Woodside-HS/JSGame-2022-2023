class level1 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadBackgrounds();
        this.loadCoins();
    }
    loadPlatforms() {
        this.platforms[0] = new level1platform(300,550,100);
        this.platforms[1] = new level1platform(0,650,6000);//! big ground platform
        this.platforms[2] = new level1platform(500,450,100);
        //need the specific platform class to get started on loading platforms   
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
        // */
    }
    loadBackgrounds(){
         for(let i = 0; i < 3; i++){
             this.backgrounds[i] = document.createElement("img");
             let path = "Images/Level" + this.id +"/Lvl" + this.id + "Background/bg" + (i+1)+".png";
             //console.log(path);
             this.backgrounds[i].src = path;
         }
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
    

    loadCoins() {
        this.platforms.forEach(platform => {
            let halfNhalf = Math.random() * 100;
            if (halfNhalf < 50) {
                platform.coin = new Coin(platform.loc.x, platform.loc.y, 20, 20);
                console.log('platform.coin: ', platform.coin);
            }
        });
    }




}