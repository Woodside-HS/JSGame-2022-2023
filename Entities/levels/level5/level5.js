class level5 extends Level {
    constructor(id) {
        super(id);
        this.loadPlatforms();
        this.loadCoins();
        this.loadBackgrounds(3);
        this.loadResources()
    }
    loadPlatforms() {
        // console.log("lvl5 is here")
        this.platforms[0] = new level5platform(0, 400, 10000, false);
        this.platforms[1] = new level5platform(150, 300, 100, false);
        this.platforms[2] = new level5platform(400, 300, 100, true)
        //need the specific platform class to get started on loading platforms
    }

    loadResources(pArray1, pArray2) {
        //pArray1 is the array of platforms with powerup 1 
        //pArray2 is the array of platforms with powerup 2
        //which powerup goes into which platform is hardcoded


        this.resources[0] = new JumpBoost(400, 350, 10, 50);
    }

    loadEnemies(pArray1, pArray2) {
        //pArray1 is the array of platforms with enemy 1 
        //pArray2 is the array of platforms with enemy 2
        //hardcoding which type of enemies
        // this.enemies[0] = new zombies();
    }

    loadPlatformImages() {
        // template function 
        /*
        for(let i = 0; i < platforms.length; i++){
            this.platformImages[i] = document.createElement("img");
            this.platformImages[i].src = "resources/Platform/platform1" + this.id + ".png";
        }
        // */
    }
    loadBackgrounds(num) {
        let backgrounds = [];
        for (let i = 0; i < num; i++) {
            backgrounds[i] = document.createElement("img");
            let path = "Images/Level" + this.id + "/Lvl" + this.id + "Background/bg" + (i + 1) + ".png";
            //the images need to be set in order from furthest back to furthest forward
            console.log(path);
            backgrounds[i].src = path;
        }
        this.background = new genericBackground(backgrounds);

    }
    loadEnemy1Images() {
        // template function
        // for(let i = 0; i < 8; i++){
        //     this.enemy1Images[i] = document.createElement("img");
        //     this.enemy1Images[i].src  = "resources/enemy/el"+i+".png";
        // }
    }
    loadEnemy2Images() {
        // template function
        // for(let i = 0; i < 8; i++){
        //     this.enemy2Images[i] = document.createElement("img");
        //     this.enemy2Images[i].src  = "resources/enemy/el"+i+".png";
        // }
    }
    update() {
        // template function
        this.spliceResources();

    }

    spliceResources() {
        for (let i = 0; i < this.resources.length; i++) {
            if (this.resources[i].collected) {
                this.resources.splice(i, 1);
            }
        }
    }

}