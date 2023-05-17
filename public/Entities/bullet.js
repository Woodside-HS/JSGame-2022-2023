class Bullet {
  constructor(x, y, ctx, shootingDirection) {
    this.x = x;
    this.y = y;
    this.loc = new JSVector(x + 20, y + 45);
    if (shootingDirection) {
      this.vel = new JSVector(-10, 0);
    } else {
      this.vel = new JSVector(10, 0);
    }
    this.ctx = ctx;
    this.life = 0;
    this.lifeSpan = 50;
    this.isDead = false;
  }

  run() {
    this.render();
    this.update();
  }

  update() {
    this.life++;
    if (this.life > this.lifeSpan) {
      this.isDead = true;
    }
    this.loc.add(this.vel);

    for (let i = 0; i < game.levels[0].platforms.length; i++) {
      if(game.levels[0].platforms[i].enemies){
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
  }

  render() {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
}
