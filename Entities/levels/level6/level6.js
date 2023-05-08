class level6 {
    constructor() {
        this.size = 100;
        this.levelGen = new LevelGen(this.size);
        this.isLoaded = false;
    }

    checkEdgeCollisions() {
        const hero = game.hero;
        const edgeCells = this.levelGen.edgeCells;
        const cellSize = this.levelGen.size;

        for (let cell of edgeCells) {
            const cellLeft = cell.x;
            const cellRight = cell.x + cellSize;
            const cellTop = cell.y;
            const cellBottom = cell.y + cellSize;

            const heroLeft = hero.loc.x - hero.radius;
            const heroRight = hero.loc.x + hero.radius;
            const heroTop = hero.loc.y - hero.radius;
            const heroBottom = hero.loc.y + hero.radius;

            const isColliding =
                heroLeft < cellRight &&
                heroRight > cellLeft &&
                heroTop < cellBottom &&
                heroBottom > cellTop;

            if (isColliding) {
                // Handle the collision, for example, stop the hero's movement or make the hero bounce
                console.log("not working WHYY")
            }
        }
    }

    run() {
        if (!this.isLoaded) {
            game.hero.loc = new JSVector(this.levelGen.room1.x * this.size / 2, this.levelGen.room1.y * 30);
            this.isLoaded = true;
        }
        this.checkEdgeCollisions();
        ctx.drawImage(this.levelGen.canvas, 0, 0, this.levelGen.canvas.width, this.levelGen.canvas.height);
    }
}