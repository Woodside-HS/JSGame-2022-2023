class level2 extends Level {
    constructor(id) {
        super(id);
        this.loadPlatforms();
        this.loadCoins();
        this.loadBackgrounds(2);
    }
    loadPlatforms() {
        this.platforms[1] = new level2platform(100, 600, 200, false, true);
        this.platforms[2] = new level2platform(400, 550, 200, true);
        this.platforms[3] = new level2platform(700, 500, 200, false);
        this.platforms[4] = new level2platform(1000, 550, 200, true);
        this.platforms[5] = new level2platform(1300, 600, 200, false);
        this.platforms[6] = new level2platform(1600, 550, 200, true);
        this.platforms[7] = new level2platform(1900, 480, 200, false);
        this.platforms[8] = new level2platform(2200, 450, 200, true);
        this.platforms[9] = new level2platform(2500, 400, 200, false, true);
        this.platforms[10] = new level2platform(2800, 100, 200, true);
        this.platforms[11] = new level2platform(3100, 200, 200, false);
        this.platforms[12] = new level2platform(3400, 300, 200, true, true);
    }

    update() {
        if (game.hero.loc.x > 3100) {
            gameState++;
        }
    }
}