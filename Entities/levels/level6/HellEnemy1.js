class HellEnemy1 {
    constructor(x, y, size) {
        this.pos = new JSVector(x, y);
        this.vel = new JSVector(0, 0);
    }

    update() {
        // update position with velocity
        this.pos.add(this.vel);
    }

    render() {
        // render the enemy as a circle
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    run() {
        this.update();
        this.render();
    }

}