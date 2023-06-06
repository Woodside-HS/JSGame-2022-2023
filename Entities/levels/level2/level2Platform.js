class level2platform extends Platform {
    constructor(x, y, w, enemy, resource) {
        super(x, y, w);
        this.x = x;
        this.y = y;
        this.hasEnemy = enemy;
        if (this.hasEnemy) {
            const enemyHeight = 50;
            const enemyWidth = 50;

            if (Math.random() < 0.5) {
                this.enemy = new TrashEnemy(x, y, enemyHeight, enemyWidth, w);
            } else {
                this.enemy = new FogMonster(x, y, enemyHeight, enemyWidth, w);
            }
        } else {
            this.enemy = null;
        }
        this.hasResource = resource;
        if (this.hasResource) {
            this.resource = new DoubleJumpResource(x + w / 2, y - 50, 10);
        }
        this.loadImages();

    }
    loadImages() {
        this.img = document.createElement("img");
        this.img.src = "Images/Level2/WoodPlatform.png";
    }
    run() {
        if (this.enemy) {
            this.enemy.run(game.hero.loc);
        }
        if (this.resource) {
            this.resource.run(game.hero);
        }
        this.update();
        this.render();
        this.checkHero();
    }
    update() {
    }

    render() {
        ctx.drawImage(this.img, this.x, this.y);
    }
}