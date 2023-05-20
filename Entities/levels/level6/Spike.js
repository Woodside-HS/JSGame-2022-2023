class Spike {
  constructor(x, y, size, cellSize, player, img) {
    this.position = new JSVector(x, y);
    this.size = size;
    this.isActive = true;
    this.offset = 0;
    this.cellSize = cellSize;
    this.player = player;
    this.img = img;
  }

  update() {}

  draw() {
    ctx.drawImage(this.img, this.position.x - this.size / 2, this.position.y + this.cellSize - this.size, this.size, this.size);
  }

  checkCollision() {
    let player = this.player;
    if (this.isActive) {
      if (player.pos.y + player.size.y > this.position.y && player.pos.y < this.position.y + this.cellSize) {
        if (player.pos.x + player.size.x > this.position.x - this.size / 2 && player.pos.x < this.position.x + this.size / 2) {
          player.looseHealth(10);
        }
      }
    }
  }

  run(player) {
    this.checkCollision(player);
    this.draw();
  }
}

class SpikeCluster {
  constructor(x, y, amt, size, player) {
    this.x = x;
    this.y = y;
    this.cellSize = size;
    this.amt = amt;
    this.spikes = [];
    this.player = player;
    this.img = new Image();
    this.img.src = "Images/level6/spike.png";
    this.generateSpikes();
  }

  generateSpikes() {
    for (let i = 0; i < this.amt; i++) {
      let size = getRandomInt(7, 20);
      this.spikes.push(new Spike(this.x + size + getRandomInt(-size / 2, size / 2), this.y, size, this.cellSize, this.player, this.img));
    }
  }

  run() {
    for (let i = 0; i < this.spikes.length; i++) {
      this.spikes[i].run();
    }
  }
}
