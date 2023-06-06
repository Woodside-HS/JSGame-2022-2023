class Particle {
  constructor(x, y) {
    this.pos = new JSVector(x, y);
    this.vel = new JSVector(Math.random() - 0.5, Math.random() - 0.5);
    this.size = 0.4;
    this.isGrowing = true;
    this.maxSize = getRandom(1, 5);
    this.life = getRandom(50, 1000);
    this.fadeSpeed = this.maxSize / this.life;
    this.colored = randomBool();
    this.rgb = this.colored ? "rgba(255,0,0," : "rgba(255,255,255,";
  }

  update() {
    this.pos.add(this.vel);

    if (this.isGrowing) {
      this.size += this.fadeSpeed;
      if (this.size >= this.maxSize) {
        this.isGrowing = false;
      }
    } else {
      this.size -= this.fadeSpeed;
      if (this.size <= 0) {
        this.size = 0;
      }
    }

    this.vel.y += 0.001; // Add some gravity
  }

  draw(ctx) {
    const normalizedSize = this.size / (this.maxSize * 2);
    ctx.fillStyle = this.rgb + normalizedSize + ")";
    ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  }
}
