class level5platform extends Platform {
    constructor(x, y, w, ynZ) {
        super(x, y, w);
        // this.enemy = []
        this.ynZ = ynZ; // yes/no Zombie (is or isnt a zombie)
        if (this.ynZ == true) {
            this.enemy = new zombie(x, y)
            // this.loadZombie()
            // console.log(this.ynZ)
        }
    }
    run() {
        this.update()
        this.render();
        this.checkHero();
    }
    update() {
        if (this.enemy) {
            this.enemy.run()
        }
    }
    loadZombie() {

        // console.log(this.enemy)
        // this.enemy[0] = new zombie(this.loc.x, this.loc.y)
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