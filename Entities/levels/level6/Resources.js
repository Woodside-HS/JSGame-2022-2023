class ResourceManager {
  constructor(player, levelGen, resources) {
    this.player = player;
    this.levelGen = levelGen;
    this.resources = resources;
    this.maxCapacity = 100;
  }

  spawnResource() {
    if (this.resources.length >= this.maxCapacity) {
      return;
    }

    let randomCell = this.levelGen.emptyCells[Math.floor(Math.random() * this.levelGen.emptyCells.length)];

    let resource;
    switch (Math.floor(Math.random() * 10)) {
      case 0:
      case 1:
        resource = new HealthKit(randomCell, this);
        break;
      case 2:
      case 3:
        resource = new ShieldPack(randomCell, this);
        break;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        resource = new ManaPack(randomCell, this);
        break;
    }

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
  constructor(imageSrc, resourceManager, type) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.resourceManager = resourceManager;
    this.size = 20;
    this.type = type;
  }

  update(player) {
    if (player.pos.x < this.pos.x + this.size && player.pos.x + player.size.x > this.pos.x && player.pos.y < this.pos.y + this.size && player.pos.y + player.size.y > this.pos.y) {
      switch (this.type) {
        case "health":
          player.increaseHealth(10);
          break;
        case "shield":
          player.increaseShield(10);
          break;
        case "mana":
          player.increaseMana(1);
          break;
      }

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
    super("Images/Level6/healthKit.png", resourceManager, "health");
    this.pos = new JSVector(cell.x, cell.y);
  }
}

class ShieldPack extends Resource {
  constructor(cell, resourceManager) {
    super("Images/Level6/shieldKit.png", resourceManager, "shield");
    this.pos = new JSVector(cell.x, cell.y);
  }
}

class ManaPack extends Resource {
  constructor(cell, resourceManager) {
    super("Images/Level6/mana.png", resourceManager, "mana");
    this.pos = new JSVector(cell.x, cell.y);
  }
}
