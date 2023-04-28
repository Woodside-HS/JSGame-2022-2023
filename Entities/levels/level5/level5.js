class level5 extends Level {
    constructor(id) {
        super(id);
        this.loadPlatforms();
        this.loadCoins();
        this.loadBackgrounds(3);
    }
    loadPlatforms() {
        console.log("lvl5 is here")
        this.platforms[0] = new level5platform(150, 400, 10000);
        this.platforms[1] = new level5platform(150, 300, 50);
        //need the specific platform class to get started on loading platforms

    }




}