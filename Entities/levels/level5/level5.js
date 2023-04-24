class level5 extends Level {
    constructor() {
        super();
        this.ground = new JSVector(0, 600)
        this.loadPlatforms();
        this.loadCoins();

    }
    loadPlatforms() {
        // this.platforms[0] = new level5platform(150, 400, 100);
        this.platforms[1] = new level5platform(this.ground.x, this.ground.y, 10000, "brown"); // loads the ground
        this.platforms[2] = new level5platform(this.ground.x + 300, this.ground.y - 200, 100, "x");
        this.platforms[3] = new level5platform(500, 400, 100, "x");
        this.platforms[4] = new level5platform(500, 400, 100, "x");
        this.platforms[5] = new level5platform(500, 400, 100, "x");


        //need the specific platform class to get started on loading platforms

    }




}