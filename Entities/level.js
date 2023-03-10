class Levels {
    constructor(id) {
        this.id = id
        this.platforms = [];
        this.obstacles = [];
        this.loadPlatforms();
    }
    loadPlatforms() {
        //this function hard codes all of the platforms in by hand
        if (this.id == 1) {
            //first level
            this.platforms[0] = new Platform(-100, 600, 12000, 10, "brown", false, false, 0, false);//ground platform
            //TODO need a barrier to keep player from going left
            this.platforms[1] = new Platform(400, 500, 200, 10, "blue", false, true, 0, false, false);//first platform
            this.platforms[2] = new Platform(700, 450, 200, 10, "blue", false, false, 0, false, true);//second platform
            this.platforms[3] = new Platform(1450, 200, 200, 10, "blue", true, false, 0, false, false);//top platform with enemy
            this.platforms[4] = new Platform(650, 250, 100, 10, "blue", false, true, 0, false, false);//upper left platform
            this.platforms[5] = new Platform(900, 350, 200, 10, "blue", false, false, 0, true, false);//trap platform
            this.platforms[6] = new Platform(1200, 400, 300, 10, "blue", false, false, 0, false, false);
            //! when the height is below like 200(top of screen), it should generally be more difficult but have more coins
            this.platforms[7] = new Platform(1100, 500, 150, 10, "blue", false, false, 0, false, false);
            this.platforms[8] = new Platform(1150, 150, 150, 10, "blue", true, true, 0, false, false);
            this.platforms[9] = new Platform(1700, 150, 200, 10, "blue", false, true, 0, true, false);
            this.platforms[10] = new Platform(1650, 450, 150, 10, "blue", false, false, 0, true, false);
            this.platforms[11] = new Platform(1700, 275, 150, 10, "blue", false, true, 0, false, false);
            this.platforms[12] = new Platform(1900, 325, 150, 10, "blue", false, true, 0, false, false);
            this.platforms[13] = new Platform(2100, 350, 150, 10, "blue", false, true, 0, false, false);
            this.platforms[14] = new Platform(2400, 250, 150, 10, "blue", false, true, 0, false, false);
            this.platforms[15] = new Platform(2700, 300, 150, 10, "blue", false, true, 0, false, false);
            this.platforms[16] = new Platform(3000, 325, 150, 10, "blue", false, true, 0, false, false);
            this.platforms[17] = new Platform(3300, 350, 150, 10, "blue", false, true, 0, false, false);
            this.platforms[18] = new Platform(3600, 275, 150, 10, "blue", false, true, 0, false, false);
        }
        if (this.id == 2) {
            //level 2
            this.platforms[0] = new Platform(0, 600, 1000, 10, "pink", true, true, 0, true, false);
            this.platforms[1] = new Platform(1100, 500, 20, 100, "orange", false, false, 1, false, false);
        }

    }
    run() {
        // console.log("level was run")
        this.runEntities();
    }
    runEntities() {
        for (let i = this.platforms.length - 1; i >= 0; i--) {
            //make sure to run for loops backwards to help with splicing
            this.platforms[i].run();
        }
    }
}