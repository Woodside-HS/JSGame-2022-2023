class HellHero {
  constructor(x, y, width, height, levelGen) {
    // Initialize properties
    this.pos = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.levelGen = levelGen;
    this.aspectRatio = 64 / 128;
    this.size = new JSVector(width / 2, width / 2);
    this.isOnGround = false;
    this.gravity = 0.5;
    this.moveSpeed = 5;
    this.floating = false;
    this.floatForce = -1;
    this.camLoc = new JSVector();
    this.particles = [];
    this.camShakeIntensity = 0;
    this.camShakeDecay = 0.97;
    this.shakeCooldown = 0;
    this.lastVelY = 0;
    this.jetpackFuel = 100;
    this.jetpackLastUsed = Date.now();
    this.health = 100;
    this.invinsible = false;
    this.invinsibleLastUsed = Date.now();
    this.invinsibleDuration = 5000;
    this.clr = "rgba(255, 0, 0, 1)";

    this.powerUp = {
      jetPack: false,
      speedBoost: false,
      healBoost: false,
      shield: false,
      dash: false,
      potions: [],
    };

    this.grapplingHook = {
      active: false,
      goal: null,
      hooked: false,
      hookedTo: null,
      pos: new JSVector(),
      vel: new JSVector(),
      speed: 30,
      length: 0,
      angle: 0,
      angleVel: 0,
    };
  }

  looseHealth(amount) {
    if (!this.invinsible) {
      this.health -= amount;
      this.shakeScreen(amount);
      this.invinsible = true;
      this.invinsibleLastUsed = Date.now();
    }
  }

  handleInvisiblity() {
    if (!this.invinsible) {
      if (Date.now() - this.invinsibleLastUsed > this.invinsibleDuration) {
        this.invinsible = false;
        this.clr = "rgba(255, 0, 0, 1)";
      }
    } else {
      this.flashOpacity();
    }
  }

  flashOpacity() {
    const flashInterval = 200;
    const flashDelay = 100;
    const flashCount = 5;

    const timeSinceLastFlash = Date.now() - this.invinsibleLastUsed;
    const flashIndex = Math.floor(timeSinceLastFlash / (flashInterval + flashDelay));

    if (flashIndex < flashCount) {
      const isInvisible = flashIndex % 2 === 0;
      this.clr = isInvisible ? "rgba(255, 0, 0, 0.25)" : "rgba(255, 0, 0, 1)";
    } else {
      this.invinsible = false;
      this.clr = "rgba(255, 0, 0, 1)";
    }
  }

  shakeScreen(amount) {
    this.camShakeIntensity = amount;
  }

  getCellAt(x, y) {
    const cellSize = this.levelGen.size;
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    return this.levelGen.array2D[cellY][cellX];
  }

  deployGrapple(goal) {
    console.log("deployed grapple");
    this.grapplingHook.active = true;
    this.grapplingHook.goal = new JSVector(goal.x + this.levelGen.size / 2, goal.y + this.levelGen.size / 2);
    this.grapplingHook.pos = this.pos.copy();
    this.grapplingHook.vel = JSVector.subGetNew(this.grapplingHook.goal, this.pos);
    this.grapplingHook.vel.setMagnitude(this.grapplingHook.speed);
  }

  retractGrapple() {
    console.log("retracted grapple");
    this.grapplingHook.active = false;
    this.grapplingHook.goal = null;
    this.grapplingHook.pos = new JSVector();
    this.grapplingHook.vel = new JSVector();
    this.grapplingHook.hooked = false;
    this.grapplingHook.hookedTo = null;
    this.grapplingHook.length = 0;
    this.grapplingHook.angle = 0;
    this.grapplingHook.angleVel = 0;
  }

  handleGrapple() {
    if (this.grapplingHook.active) {
      if (!this.grapplingHook.hooked) {
        this.grapplingHook.pos.add(this.grapplingHook.vel);
        const cellOver = this.getCellAt(this.grapplingHook.pos.x, this.grapplingHook.pos.y);
        if (!cellOver.isSolid) {
          // reassign the goal to the new cell position
          this.grapplingHook.goal = new JSVector(cellOver.x + this.levelGen.size / 2, cellOver.y + this.levelGen.size / 2);
        }
        if (this.grapplingHook.pos.distance(this.grapplingHook.goal) < this.grapplingHook.speed) {
          this.grapplingHook.hooked = true;
          this.grapplingHook.pos = new JSVector(this.grapplingHook.goal.x, this.grapplingHook.goal.y);
          if (cellOver.isSolid) {
            this.retractGrapple();
          }
        }
      }
    }
  }

  drawGrapple() {
    if (this.grapplingHook.active) {
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(this.grapplingHook.pos.x, this.grapplingHook.pos.y);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  update() {
    this.applyGravity();
    this.applyHorizontalMovement();
    this.handleFloatingAndJetpack();
    this.handleGrapple();
    this.handleInvisiblity();

    this.updatePositionAndCamera();
    this.applyCameraShake();

    this.lastVelY = this.vel.y;
  }

  applyGravity() {
    this.vel.y += this.gravity;
    this.vel.y = Math.min(this.vel.y, 15);
  }

  applyHorizontalMovement() {
    const acceleration = 0.5;
    const maxSpeed = this.moveSpeed;
    const friction = 0.9;

    if (game.clickingA) {
      this.vel.x = Math.max(this.vel.x - acceleration, -maxSpeed);
    } else if (game.clickingD) {
      this.vel.x = Math.min(this.vel.x + acceleration, maxSpeed);
    } else {
      this.vel.x *= friction;
    }

    this.vel.x = Math.abs(this.vel.x) < 0.01 ? 0 : this.vel.x;
  }

  handleFloatingAndJetpack() {
    this.floating = game.clickingSpace;
    if (this.floating && this.jetpackFuel > 0) {
      this.vel.y += this.floatForce;
      this.vel.y = Math.max(this.vel.y, -7);
      this.jetpackFuel = Math.max(0, this.jetpackFuel - 0.25);
      this.jetpackLastUsed = Date.now();
      this.shakeScreen(this.vel.y);
    } else {
      this.regenerateJetpackFuel();
    }
  }

  updatePositionAndCamera() {
    this.pos.add(this.vel);
    this.camLoc.x = lerp(this.camLoc.x, this.pos.x - canvas.width / 2 + this.size.x / 2, 0.05);
    this.camLoc.y = lerp(this.camLoc.y, this.pos.y - canvas.height / 2 + this.size.y / 2, 0.05);
  }

  applyCameraShake() {
    if (this.shakeCooldown <= 0) {
      const shakeX = (Math.random() - 0.5) * this.camShakeIntensity;
      const shakeY = (Math.random() - 0.5) * this.camShakeIntensity;
      ctx.translate(-this.camLoc.x + shakeX, -this.camLoc.y + shakeY);
      this.shakeCooldown = 5;
    } else {
      this.shakeCooldown -= 1;
      ctx.translate(-this.camLoc.x, -this.camLoc.y);
    }
    this.camShakeIntensity *= this.camShakeDecay;
    if (this.camShakeIntensity < 0.1) {
      this.camShakeIntensity = 0;
    }
  }

  regenerateJetpackFuel() {
    if (Date.now() - this.jetpackLastUsed > 5000) {
      this.jetpackFuel = Math.min(100, this.jetpackFuel + 1);
    }
  }

  stopHorizontalMovement() {
    this.vel.x = 0;
  }

  draw() {
    ctx.fillStyle = this.clr;
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    if (this.floating && this.jetpackFuel > 0) {
      this.createParticles();
    }
    this.updateParticles();
    if (!game.debugView) {
      this.drawParticles();
    } else {
      this.drawDebugParticles();
    }

    this.drawGrapple();
  }

  createParticles() {
    const particleCount = 10;
    const particleSize = 3;
    const minParticleSpeed = 1;
    const maxParticleSpeed = 3;
    const angleRange = Math.PI / 3;
    const angleOffset = (Math.PI - angleRange) / 2;
    for (let i = 0; i < particleCount; i++) {
      const speed = minParticleSpeed + Math.random() * (maxParticleSpeed - minParticleSpeed);
      const angle = angleOffset + Math.random() * angleRange;
      const particle = {
        pos: new JSVector(this.pos.x + this.size.x / 2, this.pos.y + this.size.y),
        vel: new JSVector(speed * Math.cos(angle), speed * Math.sin(angle)),
        size: particleSize,
        color: this.getParticleColor(i, particleCount),
      };
      this.particles.push(particle);
    }
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.pos.add(particle.vel);
      particle.vel.y += 0.1;
      particle.size *= 0.96;
      if (particle.size < 0.1) {
        this.particles.splice(i, 1);
      }
    }
  }

  drawParticles() {
    for (let particle of this.particles) {
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.pos.x, particle.pos.y, particle.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  drawDebugParticles() {
    for (let particle of this.particles) {
      ctx.fillStyle = "blue";
      ctx.fillRect(particle.pos.x, particle.pos.y, 3, 3);
    }
  }

  getParticleColor(index, totalParticles) {
    const colorStops = [
      { stop: 0.0, color: "red" },
      { stop: 0.5, color: "orange" },
      { stop: 1.0, color: "yellow" },
    ];
    const colorPosition = index / totalParticles;
    for (let i = 1; i < colorStops.length; i++) {
      if (colorPosition <= colorStops[i].stop) {
        return colorStops[i - 1].color;
      }
    }
    return colorStops[colorStops.length - 1].color;
  }
}
