class HellHero {
    constructor(x, y, width, height) {
        this.pos = new JSVector(x, y);
        this.vel = new JSVector(0, 0);
        this.aspectRatio = 64 / 128;
        this.size = new JSVector(width, width * this.aspectRatio);
        this.isOnGround = false;
        this.gravity = 0.5;
        this.moveSpeed = 5;
        this.floating = false;
        this.floatForce = -1;
        this.camLoc = new JSVector();
        this.particles = [];
        this.camShakeIntensity = 0;
        this.camShakeDecay = 0.9;
        this.shakeCooldown = 0;
        this.lastVelY = 0;
        this.jetpackFuel = 100;
        this.jetpackLastUsed = Date.now();
    }

    update() {
        this.vel.y += this.gravity;
        if (this.vel.y > 15) {
            this.vel.y = 15;
        }

        const acceleration = 0.5;  // You can adjust this value for desired acceleration.
        const maxSpeed = this.moveSpeed;
        const friction = 0.9;  // You can adjust this value for desired smoothness.

        if (game.clickingA) {
            this.vel.x = Math.max(this.vel.x - acceleration, -maxSpeed);
        } else if (game.clickingD) {
            this.vel.x = Math.min(this.vel.x + acceleration, maxSpeed);
        } else {
            // Apply friction to smoothly stop horizontal movement.
            this.vel.x *= friction;
        }

        if (Math.abs(this.vel.x) < 0.01) {
            this.vel.x = 0;
        }

        if (game.clickingSpace) {
            this.floating = true;
        } else {
            this.floating = false;
        }

        if (this.floating && this.jetpackFuel > 0) {
            this.vel.y += this.floatForce;
            if (this.vel.y < -7) {
                this.vel.y = -7;
            }
            this.jetpackFuel = Math.max(0, this.jetpackFuel - 0.25);
            this.jetpackLastUsed = Date.now();
        } else {
            this.regenerateJetpackFuel();
        }

        if (this.lastVelY < 0 || game.clickingSpace) {
            this.camShakeIntensity += Math.abs(this.lastVelY * 0.1);  // Increase shake based on vertical speed
            this.camShakeIntensity += 0.05;  // Constant light shake
            this.camShakeIntensity *= this.camShakeDecay;  // Reduce shake intensity over time
        }

        this.pos.add(this.vel);
        this.camLoc.x = lerp(this.camLoc.x, this.pos.x - (canvas.width / 2) + this.size.x / 2, 0.05);
        this.camLoc.y = lerp(this.camLoc.y, this.pos.y - (canvas.height / 2) + this.size.y / 2, 0.05);

        // Add camera shake.
        if ((this.lastVelY < 0 || game.clickingSpace) && this.shakeCooldown <= 0) {
            let shakeX = (Math.random() - 0.5) * this.camShakeIntensity;
            let shakeY = (Math.random() - 0.5) * this.camShakeIntensity;
            ctx.translate(-this.camLoc.x + shakeX, -this.camLoc.y + shakeY);
            this.shakeCooldown = 5;  // Adjust this value to control the frequency
        } else {
            this.shakeCooldown -= 1;
            ctx.translate(-this.camLoc.x, -this.camLoc.y);
        }

        this.lastVelY = this.vel.y;
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
        ctx.fillStyle = 'red';
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        if (this.floating && this.jetpackFuel > 0) {
            this.createParticles();
        }
        this.updateParticles();
        this.drawParticles();
    }

    createParticles() {
        let particleCount = 10;
        let particleSize = 3;
        let minParticleSpeed = 1;
        let maxParticleSpeed = 3;
        let angleRange = Math.PI / 3;
        let angleOffset = (Math.PI - angleRange) / 2;
        for (let i = 0; i < particleCount; i++) {
            let speed = minParticleSpeed + Math.random() * (maxParticleSpeed - minParticleSpeed);
            let angle = angleOffset + Math.random() * angleRange;
            let particle = {
                pos: new JSVector(this.pos.x + this.size.x / 2, this.pos.y + this.size.y),
                vel: new JSVector(speed * Math.cos(angle), speed * Math.sin(angle)),
                size: particleSize,
                color: this.getParticleColor(i, particleCount)
            };
            this.particles.push(particle);
        }
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let particle = this.particles[i];
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

    getParticleColor(index, totalParticles) {
        let colorStops = [
            { stop: 0.0, color: 'red' },
            { stop: 0.5, color: 'orange' },
            { stop: 1.0, color: 'yellow' }
        ];
        let colorPosition = index / totalParticles;
        for (let i = 1; i < colorStops.length; i++) {
            if (colorPosition <= colorStops[i].stop) {
                return colorStops[i - 1].color;
            }
        }
        return colorStops[colorStops.length - 1].color;
    }
}