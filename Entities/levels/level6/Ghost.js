class Ghost {
  constructor(x, y, cellSize, player) {
    this.pos = new JSVector(x, y);
    this.vel = new JSVector(Math.random() - 0.5, Math.random() - 0.5);
    this.size = new JSVector(30, 30);
    this.clr = "rgba(255, 255, 255, 0.4)";
    this.player = player;
    this.cellSize = cellSize;
  }

  update() {
    this.pos.add(this.vel);
  }

  draw() {
    ctx.fillStyle = this.clr;
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }

  checkCollision() {
    let player = this.player;

    let playerRight = player.pos.x + player.size.x;
    let enemyLeft = this.pos.x;

    let playerLeft = player.pos.x;
    let enemyRight = this.pos.x + this.size.x;

    let playerBottom = player.pos.y + player.size.y;
    let enemyTop = this.pos.y;

    let playerTop = player.pos.y;
    let enemyBottom = this.pos.y + this.size.y;

    if (playerRight > enemyLeft && playerLeft < enemyRight && playerBottom > enemyTop && playerTop < enemyBottom) {
      player.looseHealth(10, false);
    }
  }

  run() {
    this.update();
    this.checkCollision();
    this.draw();
  }
}
