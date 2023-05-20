class ResourceManager {
  constructor(player, levelGen, resources) {
    this.player = player;
    this.levelGen = levelGen;
    this.resources = resources;
    this.maxCapacity = 30;
  }

  spawnResource() {
    if (this.resources.length >= this.maxCapacity) {
      return;
    }

    let randomCell = this.levelGen.emptyCells[Math.floor(Math.random() * this.levelGen.emptyCells.length)];

    let resource = new HealthKit(randomCell, this);

    this.resources.push(resource);
  }

  run() {
    this.spawnResource();
    this.resources.forEach((resource) => {
      resource.run(this.player);
    });
  }
}

class Resource {
  constructor(imageSrc, resourceManager) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.resourceManager = resourceManager;
    this.size = 20;
  }

  update(player) {
    if (player.pos.x < this.pos.x + this.size && player.pos.x + player.size.x > this.pos.x && player.pos.y < this.pos.y + this.size && player.pos.y + player.size.y > this.pos.y) {
      player.increaseHealth(10);

      let index = this.resourceManager.resources.indexOf(this);
      if (index > -1) {
        this.resourceManager.resources.splice(index, 1);
      }

      this.resourceManager.spawnResource();
    }
  }

  render() {
    ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size, this.size);
  }

  run(player) {
    this.update(player);
    this.render();
  }
}

class HealthKit extends Resource {
  constructor(cell, resourceManager) {
    super("Images/Level6/healthKit.png", resourceManager);
    this.pos = new JSVector(cell.x, cell.y);
  }
}

class ShieldPack extends Resource {
  constructor() {
    super("path/to/other/resource/image.png");
  }
}
