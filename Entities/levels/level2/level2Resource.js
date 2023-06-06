class DoubleJumpResource {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.startY = y;
        this.radius = radius;
        this.bobbingSpeed = 0.05;
        this.bobbingDistance = 20;
        this.angle = Math.PI / 2;
        this.collected = false;
    }

    draw() {
        if (!this.collected) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#ff0';
            ctx.fill();
        }
    }

    update() {
        if (!this.collected) {
            this.angle += this.bobbingSpeed;
            this.y = this.startY + Math.sin(this.angle) * this.bobbingDistance;
        }
    }

    checkCollision(hero) {
        if (!this.collected) {
            let dx = hero.loc.x - this.x;
            let dy = hero.loc.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.radius + hero.width / 2) {
                console.log('collected');
                game.hero.inventory.dbJump = true;
                this.collected = true;
                return true;
            }
        }

        return false;
    }

    run(hero) {
        this.update();
        if (!this.collected) {
            this.draw();
            this.checkCollision(hero);
        }
    }
}
