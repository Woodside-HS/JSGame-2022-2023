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
        this.action = 'idle';
        this.frame = 0;
        this.frameCount = 0;
        this.frameRate = 15;
        this.loadSpriteSheets();
    }

    loadSpriteSheets() {
        this.spriteSheets = {};
        const spriteSheetNames = ['Attacks', 'Climb', 'Death', 'Hanging', 'Health', 'Hurt', 'Idle', 'Jump', 'Pray', 'Roll', 'Run', 'Slide'];
        for (const name of spriteSheetNames) {
            const img = new Image();
            img.src = `Images/Level6/2D_SL_Knight_v1.0/${name}.png`;
            this.spriteSheets[name.toLowerCase()] = img;
        }
    }

    update() {

        this.vel.y += this.gravity;

        if (this.vel.y > 15) {
            this.vel.y = 15;
        }
        if (game.clickingA) {
            this.vel.x = -this.moveSpeed;
        } else if (game.clickingD) {
            this.vel.x = this.moveSpeed;
        } else {
            this.vel.x = 0;
        }

        if (game.clickingSpace) {
            this.floating = true;
        } else {
            this.floating = false;
        }

        if (this.floating) {
            this.vel.y += this.floatForce;
            if (this.vel.y < -7) {
                this.vel.y = -7;
            }
        }

        this.pos.add(this.vel);
        this.camLoc.x = lerp(this.camLoc.x, this.pos.x - (canvas.width / 2) + this.size.x / 2, 0.05);
        this.camLoc.y = lerp(this.camLoc.y, this.pos.y - (canvas.height / 2) + this.size.y / 2, 0.05);
        ctx.translate(-this.camLoc.x, -this.camLoc.y);

        this.frameCount++;
        if (this.frameCount >= this.frameRate) {
            this.frameCount = 0;
            this.frame++;
        }
    }

    stopHorizontalMovement() {
        this.vel.x = 0;
    }

    draw() {
        const frameWidth = 128;
        const frameHeight = 64;
        const img = this.spriteSheets[this.action];
        const frameX = this.frame * frameWidth;

        if (frameX >= img.width) {
            this.frame = 0;
        }

        let scale = 5;
        ctx.drawImage(
            img,
            frameX,
            0,
            frameWidth,
            frameHeight,
            this.pos.x - ((this.size.x * scale) - this.size.x) / 2,
            this.pos.y - ((this.size.y * scale) - this.size.y),
            this.size.x * scale,
            this.size.y * scale
        );
        //ctx.fillStyle = 'blue';
        //ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        if (this.floating) {
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