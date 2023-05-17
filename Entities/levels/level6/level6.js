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

        const collisionCheckRadius = 2 * Math.max(character.size.x, character.size.y);

        for (let cell of edgeCells) {
            // Calculate the distance from the character to the cell.
            const dx = character.pos.x + character.size.x / 2 - (cell.x + cellSize / 2);
            const dy = character.pos.y + character.size.y / 2 - (cell.y + cellSize / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only check for collisions if the cell is within the defined radius.
            if (distance <= collisionCheckRadius) {
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

                // Draw a debug line to the cell.
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(character.pos.x + character.size.x / 2, character.pos.y + character.size.y / 2);
                ctx.lineTo(cell.x + cellSize / 2, cell.y + cellSize / 2);
                ctx.stroke();
            }
        }
    }


    spawnEnemies(cells) {
        // iterate through eveyr cell
        cells.forEach(cell => {
            // 1% chance of spawning enemy
            if (Math.random() < 0.0075) {
                const enemy = new Crawler(cell.x, cell.y, 5, this.levelGen);
                this.enemies.push(enemy);
            }
        });
    }

    checkParticleCollisions() {
        const edgeCells = this.levelGen.edgeCells;
        const cellSize = this.levelGen.size;
        const particles = this.character.particles; // Assuming particles are accessible

        for (let i = particles.length - 1; i >= 0; i--) {
            let particle = particles[i];
            particle.pos.add(particle.vel);
            particle.vel.y += 0.1;
            particle.size *= 0.96;

            // Check collision with edge cells
            for (let cell of edgeCells) {
                const cellLeft = cell.x;
                const cellRight = cell.x + cellSize;
                const cellTop = cell.y;
                const cellBottom = cell.y + cellSize;

                const particleLeft = particle.pos.x;
                const particleRight = particle.pos.x + particle.size;
                const particleTop = particle.pos.y;
                const particleBottom = particle.pos.y + particle.size;

                const isColliding =
                    particleLeft < cellRight &&
                    particleRight > cellLeft &&
                    particleTop < cellBottom &&
                    particleBottom > cellTop;

                if (isColliding) {
                    // Simple bounce by reversing the velocity
                    particle.vel.y *= getRandom(-0.5, -0.75);
                }
            }

            if (particle.size < 0.1) {
                particles.splice(i, 1);
            }
        }
    }


    run() {
        if (!this.isLoaded) {
            this.character.pos = new JSVector(this.levelGen.room1.x * this.size / 2, this.levelGen.room1.y * 30);
            this.isLoaded = true;
        }
        this.character.update();
        game.characterPosition = this.character.pos;
        ctx.drawImage(this.levelGen.canvas, 0, 0, this.levelGen.canvas.width, this.levelGen.canvas.height);
        this.character.draw();
        this.checkEdgeCollisions();
        this.checkParticleCollisions();
        this.enemies.forEach(enemy => {
            enemy.run();
        });
    }
}
