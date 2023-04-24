class level5platform extends Platform {
    constructor(x, y, w, clr) {
        super(x, y, w);
        this.clr = clr
        if (clr == "x") {
            this.clr = "red"
        }
    }
    run() {
        this.update;
        this.render();
        this.checkHero();
    }
    update() {
    }

    render() {
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y + 10);
        ctx.lineTo(this.loc.x, this.loc.y + 10);
        ctx.closePath();
        ctx.fillStyle = this.clr;
        ctx.fill();
    }
}