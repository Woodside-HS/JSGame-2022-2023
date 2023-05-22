class level2 extends Level {
    constructor(id) {
        super(id);
        this.loadPlatforms();
        this.loadCoins();
        this.loadBackgrounds(3);
    }
    loadPlatforms() {
        this.platforms[1] = new level2platform(100, 600, 200, false);
        this.platforms[2] = new level2platform(400, 550, 200, true);
        this.platforms[3] = new level2platform(700, 500, 200, false);
        this.platforms[4] = new level2platform(1000, 550, 200, true);
        this.platforms[5] = new level2platform(1300, 600, 200, false);
        this.platforms[6] = new level2platform(1600, 550, 200, true);
        this.platforms[7] = new level2platform(1900, 480, 200, false);
        this.platforms[8] = new level2platform(2200, 450, 200, true);
        this.platforms[9] = new level2platform(2500, 400, 200, false);
        this.platforms[10] = new level2platform(2800, 100, 200, true);
        this.platforms[11] = new level2platform(3100, 200, 200, false);
        this.platforms[12] = new level2platform(3400, 300, 200, true);
        this.platforms[13] = new level2platform(3700, 450, 200, false);
        this.platforms[14] = new level2platform(4000, 380, 200, true);
        this.platforms[15] = new level2platform(4300, 200, 200, false);
        this.platforms[16] = new level2platform(4600, 100, 200, true);
        this.platforms[17] = new level2platform(4900, 180, 200, false);
        this.platforms[18] = new level2platform(5200, 270, 200, true);
        this.platforms[19] = new level2platform(5500, 360, 200, false);
        this.platforms[20] = new level2platform(5800, 100, 200, true);
        this.platforms[21] = new level2platform(6100, 200, 200, false);
        this.platforms[22] = new level2platform(6400, 300, 200, true);
        this.platforms[23] = new level2platform(6700, 400, 200, false);
        this.platforms[24] = new level2platform(7000, 500, 200, true);
        this.platforms[25] = new level2platform(7300, 100, 200, false);
        this.platforms[26] = new level2platform(7600, 180, 200, true);
        this.platforms[27] = new level2platform(7900, 280, 200, false);
        this.platforms[28] = new level2platform(8200, 370, 200, true);
        this.platforms[29] = new level2platform(8500, 470, 200, false);
        this.platforms[30] = new level2platform(8800, 570, 200, true);
        this.platforms[31] = new level2platform(9100, 100, 200, false);
        this.platforms[32] = new level2platform(9400, 200, 200, true);
        this.platforms[33] = new level2platform(9700, 300, 200, false);
        this.platforms[34] = new level2platform(10000, 400, 200, true);



    }


}