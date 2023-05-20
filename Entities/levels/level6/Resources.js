class ResourceManager {
  constructor(player, resources) {
    this.player = player;
    this.resources = resources;
  }

  spawnResource() {
    // make sure resources are not max capacity
    // get random cell that is out side of player view

    // randomly choose a resource type
    let resourceType = Math.random() < 0.5 ? HealthPack : ShieldPack;

    let resource = new resourceType();

    this.resources.push(resource);
  }

  run() {
    this.spawnResource();
    this.resources.forEach((resource) => {
      resource.run();
    });
  }
}

class Resource {
  constructor(imageSrc) {
    this.image = new Image();
    this.image.src = imageSrc;
  }

  update() {
    // breathing effect by oscillate position on x and y axis with perlin noise
  }

  render(context) {
    context.drawImage(this.image, this.x, this.y);
  }

  run(context) {
    this.update();
    this.render(context);
  }
}

class HealthPack extends Resource {
  constructor() {
    super("path/to/healthpack/image.png");
  }
}

class ShieldPack extends Resource {
  constructor() {
    super("path/to/other/resource/image.png");
  }
}
