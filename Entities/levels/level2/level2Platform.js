class level2platform extends Platform {
    constructor(x, y, w, enemy) {
        super(x, y, w);
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

    }
    loadImages() {
        this.img = document.createElement("img");
        this.img.src = "resources/Platform/platform.png";
    }
    run() {
        if (this.enemy) {
            this.enemy.run(game.hero.loc);
        }
        this.update();
        this.render();
        this.checkHero();
    }
    update() {
    }

    render() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y + 10);
        ctx.lineTo(this.loc.x, this.loc.y + 10);
        ctx.closePath();
        ctx.fill();
    }
}