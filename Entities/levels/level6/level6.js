class level6 {
    constructor() {
        this.size = 100;
        this.levelGen = new LevelGen(this.size);
        this.isLoaded = false;
        this.character = new HellHero(0, 0, 30, 50);
        this.minimap = new Minimap(this.levelGen);
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


    run() {
        if (!this.isLoaded) {
            this.character.pos = new JSVector(this.levelGen.room1.x * this.size / 2, this.levelGen.room1.y * 30);
            this.isLoaded = true;
        }
        this.checkEdgeCollisions();
        this.character.update();
        this.minimap.update(this.character); // Update the discovered cells in the minimap
        game.characterPosition = this.character.pos;
        ctx.drawImage(this.levelGen.canvas, 0, 0, this.levelGen.canvas.width, this.levelGen.canvas.height);
        this.character.draw();
        this.minimap.draw(); // Draw the minimap on top of the main canvas
        // Draw the minimap on the top right corner of the main canvas
        ctx.drawImage(this.minimap.canvas, ctx.canvas.width - this.minimap.canvas.width - 10, 10);
    }
}

class Minimap {
    constructor(levelGen) {
        this.levelGen = levelGen;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = levelGen.canvas.width / 8;
        this.canvas.height = levelGen.canvas.height / 8;
        this.discoveredCells = new Array(levelGen.rows * levelGen.cols).fill(false);
    }

    update(character) {
        const x = Math.floor(character.pos.x / this.levelGen.size);
        const y = Math.floor(character.pos.y / this.levelGen.size);
        const index = y * this.levelGen.cols + x;

        this.discoveredCells[index] = true;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.discoveredCells.length; i++) {
            if (this.discoveredCells[i]) {
                const x = (i % this.levelGen.cols) * this.levelGen.size / 8;
                const y = Math.floor(i / this.levelGen.cols) * this.levelGen.size / 8;
                const color = this.levelGen.squares[i] ? 'black' : 'white';
                this.ctx.fillStyle = color;
                this.ctx.fillRect(x, y, this.levelGen.size / 8, this.levelGen.size / 8);
            }
        }
    }
}
