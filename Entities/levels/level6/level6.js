class level6 {
  constructor() {
    this.size = 100;
    LevelGen.create(this.size).then((levelGen) => {
      this.levelGen = levelGen;
      this.isLoaded = false;
      this.character = new HellHero(0, 0, 30, 50, this.levelGen);
      this.enemies = [];
      this.spawnEnemies(this.levelGen.emptyCells);
      this.particles = [];

      const numParticles = 200;
      for (let i = 0; i < numParticles; i++) {
        this.spawnParticle();
      }

      setInterval(this.spawnParticles.bind(this), 1);

      canvas.addEventListener("mousedown", (e) => {
        const mousePos = new JSVector(e.offsetX, e.offsetY);
        const mousePosWorld = JSVector.addGetNew(mousePos, this.character.camLoc);
        const mousePosGrid = new JSVector(Math.floor(mousePosWorld.x / this.levelGen.size), Math.floor(mousePosWorld.y / this.levelGen.size));
        const block = this.levelGen.array2D[mousePosGrid.y][mousePosGrid.x];

        this.character.deployGrapple(block);
      });

      canvas.addEventListener("mouseup", (e) => {
        this.character.retractGrapple();
      });
    });
  }

  async loadLevel() {
    return new Promise((resolve) => {
      this.levelGen.load(() => {
        resolve();
      });
    });
  }

  spawnParticle() {
    const emptyCells = this.levelGen.emptyCells;
    const cellSize = this.levelGen.size;
    const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const x = cell.x + Math.random() * cellSize;
    const y = cell.y + Math.random() * cellSize;
    const age = getRandom(50, 1000);

    const particle = new Particle(x, y);
    particle.age = age;
    this.particles.push(particle);
  }

  spawnParticles() {
    const numParticles = 1;
    for (let i = 0; i < numParticles; i++) {
      this.spawnParticle();
    }
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

        const isColliding = characterLeft < cellRight && characterRight > cellLeft && characterTop < cellBottom && characterBottom > cellTop;

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
        if (game.debugView) {
          ctx.strokeStyle = "green";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(character.pos.x + character.size.x / 2, character.pos.y + character.size.y / 2);
          ctx.lineTo(cell.x + cellSize / 2, cell.y + cellSize / 2);
          ctx.stroke();
        }
      }
    }
  }

  spawnEnemies(cells) {
    const numClusters = getRandomInt(30, 50);

    for (let i = 0; i < numClusters; i++) {
      console.log("hi")
      const clusterSize = getRandomInt(2, 7);
      // look for a cell with at a solid cell under it
      let foundCell = null;
      while (foundCell == null) {
        // choose a random cell from cells
        const cell = cells[Math.floor(Math.random() * cells.length)];
        let x = Math.floor(cell.x / this.levelGen.size);
        let y = Math.floor(cell.y / this.levelGen.size);
        if (!this.levelGen.array2D[y + 1][x].isSolid) {
          foundCell = cell;
        }
      }

      // once found a cell with a solid cell under it, spawn a cluster of spikes
      this.enemies.push(new SpikeCluster(foundCell.x, foundCell.y, clusterSize, this.levelGen.size));
    }
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

        const isColliding = particleLeft < cellRight && particleRight > cellLeft && particleTop < cellBottom && particleBottom > cellTop;

        if (isColliding) {
          particle.vel.y *= getRandom(-0.5, -0.75);
        }
      }

      if (particle.size < 0.1) {
        particles.splice(i, 1);
      }
    }

    const envParticles = this.particles;

    for (let i = envParticles.length - 1; i >= 0; i--) {
      let particle = envParticles[i];

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

        const isColliding = particleLeft < cellRight && particleRight > cellLeft && particleTop < cellBottom && particleBottom > cellTop;

        if (isColliding) {
          particle.vel.y *= getRandom(-0.6, -0.75);
          particle.vel.x *= getRandom(-0.6, -0.75);
        }
      }
    }
  }

  run() {
    if (!this.isLoaded) {
      this.character.pos = new JSVector((this.levelGen.room1.x * this.size) / 2, this.levelGen.room1.y * 30);
      this.isLoaded = true;
    }
    this.character.update();
    game.characterPosition = this.character.pos;
    if (!game.debugView) {
      ctx.drawImage(this.levelGen.canvas, 0, 0, this.levelGen.canvas.width, this.levelGen.canvas.height);
    } else {
      ctx.drawImage(this.levelGen.debugCanvas, 0, 0, this.levelGen.canvas.width, this.levelGen.canvas.height);
    }

    this.enemies.forEach((enemy) => {
      enemy.run(this.character);
    });
    this.updateParticles();
    this.character.draw();
    this.checkEdgeCollisions();
    this.checkParticleCollisions();
    this.drawUI();
  }

  updateParticles() {
    ctx.fillStyle = "#000";
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.update();

      if (particle.size <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      particle.draw(ctx);
    }
  }

  drawUI() {
    this.drawJetPackFuel(20, 40);
    this.drawHealth(20, 20);
  }

  drawHealth(offx, offy) {
    let barWidth = 100;
    let barHeight = 10;
    let displacement = 0;
    let x = this.character.camLoc.x + offx;
    let y = this.character.camLoc.y + offy;
    let healthRatio = this.character.health / 100;
    //drak grey
    ctx.fillStyle = "rgb(50,50,50)";
    ctx.fillRect(x + displacement, y, barWidth, barHeight);
    // fill style more red if lower but orange if lighter
    let redComponent = Math.floor(255 * (1 - healthRatio));
    let greenComponent = Math.floor(165 * healthRatio);
    ctx.fillStyle = `rgb(${redComponent}, ${greenComponent}, 0)`;

    ctx.fillRect(x + displacement, y, barWidth * healthRatio, barHeight);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x + displacement, y, barWidth, barHeight);
  }

  drawJetPackFuel(offx, offy) {
    let barWidth = 100;
    let barHeight = 10;
    let displacement = 0;
    let x = this.character.camLoc.x + offx;
    let y = this.character.camLoc.y + offy;
    let fuelRatio = this.character.jetpackFuel / 100;
    //drak grey
    ctx.fillStyle = "rgb(50,50,50)";
    ctx.fillRect(x + displacement, y, barWidth, barHeight);
    // fill style more red if lower but orange if lighter
    let redComponent = Math.floor(255 * (1 - fuelRatio));
    let greenComponent = Math.floor(165 * fuelRatio);
    ctx.fillStyle = `rgb(${redComponent}, 100 , ${greenComponent})`;

    ctx.fillRect(x + displacement, y, barWidth * fuelRatio, barHeight);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x + displacement, y, barWidth, barHeight);

    // draw jetpack image on top of the bar to the left of it
    //let jetpackImg = this.levelGen.jetPacktexture;
    //ctx.drawImage(jetpackImg, x - 15, y - 15, 50 / 2, 50 / 2);
  }
}
