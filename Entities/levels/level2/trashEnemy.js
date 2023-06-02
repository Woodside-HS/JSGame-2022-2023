class TrashEnemy {
    constructor(x, y, h, w, pw) {
        this.w = w;
        this.h = h;
        this.smallW = this.w / 2;
        this.smallH = this.h / 2;
        this.normalW = this.w;
        this.normalH = this.h;
        this.platformWidth = pw;
        this.platformLoc = new JSVector(x, y);
        this.loc = new JSVector(x, y - this.h);
        this.isDead = false;
        this.hp = 100;
        this.movingL = true;
        this.movingR = false;
        this.movingSpeed = 0.2;
        this.chaseSpeed = 1.4; // speed when chasing
        this.chaseDistance = 150; // distance to start chasing
        this.canMoveFurther = true;
        this.particleSystem = new ParticleSystem();
    }
    run(heroLoc) {
        this.render();
        this.checkHero(heroLoc, game.hero.height, game.hero.width);
        this.moveTrashEnemy(heroLoc);
        this.particleSystem.update();
        this.particleSystem.draw();
    }
    render() {
        ctx.fillStyle = "blue";
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rect(0, 0, this.h, this.w)
        ctx.fill();
        ctx.restore();
    }
    checkHero(heroLoc, heroH, heroW) {
        let middleOfHero = heroLoc.x + (heroW / 2)
        if (
            heroLoc.x + heroW > this.loc.x &&
            heroLoc.x < this.loc.x + this.w &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y < this.loc.y + this.h &&
            middleOfHero < this.loc.x + this.w &&
            middleOfHero > this.loc.x
        ) {
            game.hero.statusBlock.hp--;
            // Create blood particles at hero's location
            this.particleSystem.addParticles(heroLoc.x, heroLoc.y, 10);
            return true;
        }
        return false;
    }


    moveTrashEnemy(heroLoc) {
        if (this.loc.distance(heroLoc) <= this.chaseDistance) {
            let direction = JSVector.subGetNew(heroLoc, this.loc);
            direction.normalize();
            direction.multiply(this.chaseSpeed);

            if (this.loc.x + this.w >= this.platformLoc.x + this.platformWidth - 10) {
                this.canMoveFurther = direction.x < 0;
            } else if (this.loc.x <= this.platformLoc.x + 10) {
                this.canMoveFurther = direction.x > 0;
            } else {
                this.canMoveFurther = true;
            }

            if (this.canMoveFurther) {
                this.loc.x += direction.x;
            }
        } else {
            if (this.movingL && !this.movingR) {
                this.loc.x -= this.movingSpeed;
            } else if (this.movingR && !this.movingL) {
                this.loc.x += this.movingSpeed;
            }
            if (this.loc.x + this.w >= this.platformLoc.x + this.platformWidth) {
                this.movingR = false;
                this.movingL = true;
            } else if (this.loc.x <= this.platformLoc.x) {
                this.movingL = false;
                this.movingR = true;
            }
        }
    }

}


class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vel = { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 };
        this.alpha = 1;
    }

    update() {
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.vel.y -= -0.3;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.random() * 3 + 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    addParticles(x, y, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y));
        }
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            if (this.particles[i].alpha <= 0) {
                this.particles.splice(i, 1);
                i--;
            }
        }
    }

    draw() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].draw();
        }
    }
}
