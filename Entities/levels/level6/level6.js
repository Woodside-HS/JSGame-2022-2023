class level6 {
    constructor() {
        this.size = 100;
        LevelGen.create(this.size).then(levelGen => {
            this.levelGen = levelGen;
            this.isLoaded = false;
            this.character = new HellHero(0, 0, 30, 50);
            this.enemies = [];
            this.spawnEnemies(this.levelGen.emptyCells);
        });
    }

    async loadLevel() {
        return new Promise((resolve) => {
            this.levelGen.load(() => {
                resolve();
            });
        });
    }

    checkEdgeCollisions() {
        const character = this.character;
        const edgeCells = this.levelGen.edgeCells;
        const cellSize = this.levelGen.size;

        for (let cell of edgeCells) {
            const cellLeft = cell.x;
            const cellRight = cell.x + cellSize;
            const cellTop = cell.y;
            const cellBottom = cell.y + cellSize;

            const characterLeft = character.pos.x;
            const characterRight = character.pos.x + character.size.x;
            const characterTop = character.pos.y;
            const characterBottom = character.pos.y + character.size.y;

            const isColliding =
                characterLeft < cellRight &&
                characterRight > cellLeft &&
                characterTop < cellBottom &&
                characterBottom > cellTop;

            if (isColliding) {
                // Collision resolution
                const overlapX = Math.min(characterRight - cellLeft, cellRight - characterLeft);
                const overlapY = Math.min(characterBottom - cellTop, cellBottom - characterTop);

                if (overlapX < overlapY) {
                    if (character.pos.x < cell.x) {
                        character.pos.x -= overlapX;
                    } else {
                        character.pos.x += overlapX;
                    }
                    character.vel.x = 0;
                } else {
                    if (character.pos.y < cell.y) {
                        character.pos.y -= overlapY;
                        character.isOnGround = true;
                    } else {
                        character.pos.y += overlapY;
                    }
                    character.vel.y = 0;
                }
            }
        }
    }

    spawnEnemies(cells) {
        // iterate through eveyr cell
        cells.forEach(cell => {
            // 1% chance of spawning enemy
            if (Math.random() < 0.0075) {
                const enemy = new Crawler(cell.x, cell.y, 5);
                this.enemies.push(enemy);
            }
        });
    }


    run() {
        if (!this.isLoaded) {
            this.character.pos = new JSVector(this.levelGen.room1.x * this.size / 2, this.levelGen.room1.y * 30);
            this.isLoaded = true;
        }
        this.checkEdgeCollisions();
        this.character.update();
        game.characterPosition = this.character.pos;
        ctx.drawImage(this.levelGen.canvas, 0, 0, this.levelGen.canvas.width, this.levelGen.canvas.height);
        this.character.draw();
        this.enemies.forEach(enemy => {
            enemy.run();
        });
    }
}
