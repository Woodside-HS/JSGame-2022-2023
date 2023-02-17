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
            this.platforms[0] = new Platform(0, 600, 500, 10, "red", false, true, 0, false);
            this.platforms[1] = new Platform(600, 600, 500, 10, "green", true, false, 0, false);
        }
        if (this.id == 2) {
            //level 2
            this.platforms[0] = new Platform(0, 600, 1000, 10, "pink", true, true, 0, true);
            this.platforms[1] = new Platform(1100, 500, 20, 100, "orange", false, false, 1, false);
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