class hammerSmash {
  constructor(x, y, ctx, hammerDirection) {
    this.x = x;
    this.y = y;
    this.hammerDirection = hammerDirection;
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(10,0)
    this.ctx = ctx;
    this.life = 0;
    this.lifeSpan = 50;
    this.isDead = false;
    this.count = 0;
    this.clrcount = 0;
  }

  run() {
    this.render();
    this.update();
  }

  update() {
    console.log("smash")
    this.life++;
    this.count--;
    this.clrconut+=2;
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
    ctx.rect(this.loc.x, this.loc.y, this.loc.x+this.count, this.loc.y+this.count, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(255," + this.clrcount + ",0)";
    ctx.fill();
    ctx.closePath();
  }
}
