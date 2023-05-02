class level5platform extends Platform {
    constructor(x, y, w, ynZ) {
        super(x, y, w);
        this.ynZ = ynZ; // yes/no Zombie (is or isnt a zombie)
        if (this.ynZ == true) {
            this.loadZombie()
            // console.log(this.ynZ)
        }
    }
    run() {
        this.update;
        this.render();
        this.checkHero();
    }
    update() {
    }
    loadZombie() {
        // console.log(this.levels)
        this.enemies[0] = new zombies()
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