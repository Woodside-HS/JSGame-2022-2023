class Spike {
    constructor(x, y, size, cellSize) {
        this.position = new JSVector(x, y);
        this.size = size;
        this.isActive = true;
        this.offset = 0;
        this.cellSize = cellSize;
    }

    update() {

    }

    draw() {
        //DARK RED
        ctx.fillStyle = "rgba(100, 0, 0, 1)";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y + this.cellSize - this.size);
        ctx.lineTo(this.position.x - this.size / 2, this.position.y + this.cellSize);
        ctx.lineTo(this.position.x + this.size / 2, this.position.y + this.cellSize);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
    }

    checkCollision(player) {
        if (this.isActive) {
            if (player.pos.y + player.size.y > this.pos.y && player.pos.y < this.pos.y + this.cellSize) {
                if (player.pos.x + player.size.x > this.pos.x - this.size / 2 && player.pos.x < this.pos.x + this.size / 2) {
                    player.die();
                }
            }
        }
    }

    run(player) {
        this.checkCollision(player);
        this.draw();
    }
}

class SpikeCluster {
    constructor(x, y, amt, size) {
        this.x = x;
        this.y = y;
        this.cellSize = size;
        this.amt = amt;
        this.spikes = [];
        this.generateSpikes();
    }

    generateSpikes() {
        for (let i = 0; i < this.amt; i++) {
            let size = getRandomInt(5, 20)
            this.spikes.push(new Spike(this.x + size + getRandomInt(-size / 2, size / 2), this.y, size, this.cellSize));
        }
    }

    run() {
        for (let i = 0; i < this.spikes.length; i++) {
            this.spikes[i].run();
        }
    }
}
