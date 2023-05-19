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
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y + this.cellSize - this.size);
        ctx.lineTo(this.position.x - this.size / 2, this.position.y + this.cellSize);
        ctx.lineTo(this.position.x + this.size / 2, this.position.y + this.cellSize);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
    }


    run() {
        this.update();
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
            this.spikes.push(new Spike(this.x + i * getRandomInt(-5, 5), this.y, getRandomInt(5, 20), this.cellSize));
        }
    }

    run() {
        for (let i = 0; i < this.spikes.length; i++) {
            this.spikes[i].run();
        }
    }
}
