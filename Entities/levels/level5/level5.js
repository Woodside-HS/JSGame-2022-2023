class level5 extends Level {
    constructor(id) {
        super(id);
        // this.ground = new JSVector(0, 600)
        this.loadPlatforms();
        this.loadCoins();
    }
    run() {
    }
    loadPlatforms() {
        this.platforms[0] = new level5platform(150, 400, 100);
        this.platforms[1] = new level5platform(100, 200, 10000, "brown"); // loads the ground
        this.platforms[2] = new level5platform(200, 200, 100, "x");
        this.platforms[3] = new level5platform(400, 400, 100, "x");
        this.platforms[4] = new level5platform(600, 400, 100, "x");
        this.platforms[5] = new level5platform(800, 400, 100, "x");
        console.log("here")
        //need the specific platform class to get started on loading platforms
    }

    loadBackgrounds() {
        super.loadBackgrounds();
    }









}