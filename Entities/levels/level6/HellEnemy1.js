class Crawler {
    constructor(x, y, size, levelGen) {
        this.pos = new JSVector(x, y);
        this.vel = new JSVector(0, 0);
        this.size = size;
        this.levelGen = levelGen; // Access to levelGen for edgeCells
        this.speed = 0.5; // Define a slower speed for the fog
        this.color = 'rgba(192,192,192,0.5)'; // Define a fog color
    }

    findNearestWall() {
        let nearestWall = null;
        let nearestDist = Infinity;

        for (let cell of this.levelGen.edgeCells) {
            const dx = this.pos.x - (cell.x + this.levelGen.size / 2);
            const dy = this.pos.y - (cell.y + this.levelGen.size / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < nearestDist) {
                nearestWall = cell;
                nearestDist = distance;
            }
        }

        return nearestWall;
    }

    update() {
        const nearestWall = this.findNearestWall();

        if (nearestWall) {
            const dx = (nearestWall.x + this.levelGen.size / 2) - this.pos.x;
            const dy = (nearestWall.y + this.levelGen.size / 2) - this.pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Set velocity towards the nearest wall
            this.vel.x = this.speed * dx / distance;
            this.vel.y = this.speed * dy / distance;
        }

        this.pos.add(this.vel);
    }

    render() {
        // Render the fog entity
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    run() {
        this.update();
        this.render();
    }
}
