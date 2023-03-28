class hammerSmash {
  constructor(x, y, ctx, hammerDirection) {
    this.x = x;
    this.y = y;
    this.hammerDirection = hammerDirection;
    this.loc = new JSVector(x, y);
    this.ctx = ctx;
    this.life = 0;
    this.lifeSpan = 50;
    this.isDead = false;
    this.count = 0;
  }

  run() {
    this.render();
    this.update();
  }

  update() {
    this.life++;
    this.count++;
    if (this.life > this.lifeSpan) {
      this.isDead = true;
    }
    this.loc.add(this.vel);

    for (let i = 0; i < game.levels[0].platforms.length; i++) {
      for (let j = 0; j < game.levels[0].platforms[i].enemies.length; j++) {
        this.distance = game.levels[0].platforms[i].enemies[j].loc.distance(
          this.loc
        );
        if (this.distance < 10) {
          game.levels[0].platforms[i].enemies.splice(j, 1);
          this.isDead = true;
        }
      }
    }
  }

  render() {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.count, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}
