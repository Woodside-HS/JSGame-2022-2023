class Bullet {
  constructor(x, y, ctx, shootingDirection) {
    this.x = x;
    this.y = y;
    this.loc = new JSVector(x + 25, y + 25);
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
      for (let j = 0; j < game.levels[0].platforms[i].enemies.length; j++) {
        this.enemyW = game.levels[0].platforms[i].enemies[j].w;
        this.enemyH = game.levels[0].platforms[i].enemies[j].h;
        this.enemyLoc = new JSVector(game.levels[0].platforms[i].enemies[j].loc.x,game.levels[0].platforms[i].enemies[j].loc.y);
        if (
          this.enemyLoc.x + this.enemyW > this.loc.x &&
          this.enemyLoc.x < this.loc.x &&
          this.enemyLoc.y + this.enemyH > this.loc.y &&
          this.enemyLoc.y < this.loc.y
        ) {
          game.levels[0].platforms[i].enemies[j].health-=10;
          this.isDead = true;
          if(game.levels[0].platforms[i].enemies[j].health<=0){
          game.levels[0].platforms[i].enemies.splice(j, 1);
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
