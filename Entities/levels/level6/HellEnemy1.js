class Crawler {
    constructor(x, y, size, levelGen) {
        this.pos = new JSVector(x, y);
        this.vel = new JSVector(0, 0);
        this.size = size;
        this.levelGen = levelGen; // Access to levelGen for edgeCells
        this.speed = 1; // Define a speed for the crawler
        this.legAngles = [0, Math.PI, Math.PI / 4, (3 * Math.PI) / 4]; // Angles for spider legs
        this.legLength = size * 2; // Length of spider legs
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

    checkEdgeCollisions() {
        const nearestWall = this.findNearestWall();
        if (nearestWall) {
            const cellSize = this.levelGen.size;

            const cellLeft = nearestWall.x;
            const cellRight = nearestWall.x + cellSize;
            const cellTop = nearestWall.y;
            const cellBottom = nearestWall.y + cellSize;

            const crawlerLeft = this.pos.x;
            const crawlerRight = this.pos.x + this.size;
            const crawlerTop = this.pos.y;
            const crawlerBottom = this.pos.y + this.size;

            const isColliding =
                crawlerLeft < cellRight &&
                crawlerRight > cellLeft &&
                crawlerTop < cellBottom &&
                crawlerBottom > cellTop;

            if (isColliding) {
                // Collision resolution
                const overlapX = Math.min(crawlerRight - cellLeft, cellRight - crawlerLeft);
                const overlapY = Math.min(crawlerBottom - cellTop, cellBottom - crawlerTop);

                if (overlapX < overlapY) {
                    if (this.pos.x < nearestWall.x) {
                        this.pos.x -= overlapX;
                    } else {
                        this.pos.x += overlapX;
                    }
                    this.vel.x = 0;
                } else {
                    if (this.pos.y < nearestWall.y) {
                        this.pos.y -= overlapY;
                    } else {
                        this.pos.y += overlapY;
                    }
                    this.vel.y = 0;
                }
            }
        }
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
        // Render the spider body
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        // Render the spider legs
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        for (let angle of this.legAngles) {
            const legEndX = this.pos.x + Math.cos(angle) * this.legLength;
            const legEndY = this.pos.y + Math.sin(angle) * this.legLength;

            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(legEndX, legEndY);
            ctx.stroke();
            ctx.closePath();
        }
    }

    run() {
        this.update();
        this.checkEdgeCollisions();
        this.render();
    }


}