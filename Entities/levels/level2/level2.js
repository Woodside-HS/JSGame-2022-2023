/*
Stuff to add
* All of the resources & platforms
* have a program to load images
* load background images(and parallax)
* Run function(runs all entities)
* Render function()
*/
class Level {
    constructor(id) {
        this.platforms = [];
        this.background;
        this.resources = [];
        this.coins = [];
        this.enemies = [];
        this.platformImages = [];
        this.id = id;
        this.enemy1Images = [];
        this.enemy2Images = [];
    }
    
    run(){
        this.update();
        this.render();
    }

    loadPlatforms() {
        
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
    loadBackgrounds(num){
        let backgrounds = [];
        for(let i = 0; i < num; i++){
            backgrounds[i] = document.createElement("img");
            let path = "Images/Level" + this.id +"/Lvl" + this.id + "Background/bg" + (i+1)+".png";
            //the images need to be set in order from furthest back to furthest forward
            console.log(path);
            backgrounds[i].src = path;
        }
        this.background = new genericBackground(backgrounds);
        
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
                platform.coin = new Coin(platform.x, platform.y, 20, 20);
                console.log('platform.coin: ', platform.coin);
            }
        });
    }

    update() {
        // template function
    }
    
    render() {
        this.platforms.forEach(platform => { //goes through array of platforms and runs them
            platform.run();
        });
        this.resources.forEach(resource => {
            resource.run();
        });
        this.enemies.forEach(enemy => {
            enemy.run();
        });
        this.coins.forEach(coin => {
            coin.run();
        });
    }
}