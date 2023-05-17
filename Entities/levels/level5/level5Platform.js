class level5platform extends Platform {
    constructor(x, y, w, ynZ) {
        super(x, y, w);
        // this.enemy = []
        this.ynZ = ynZ; // yes/no Zombie (is or isnt a zombie)
        if (this.ynZ == true) {
            this.enemy = new zombie(x, y, 35, 20, this.width)
            // this.loadZombie()
            // console.log(this.ynZ)
        }
    }
    run() {
        this.update()
        this.render();
        this.checkHero();
        this.updateZombie();
    }
    update() {
        if (this.enemy) {
            this.enemy.run()
        }
    }
    updateZombie() {
        if (this.enemy != null && this.enemy.isDead) {
            this.enemy = null // deletes the enemy if dead
        }
    }
    render() {
        ctx.save()
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y);
        ctx.lineTo(this.loc.x + this.width, this.loc.y + 10);
        ctx.lineTo(this.loc.x, this.loc.y + 10);
        ctx.closePath();
        ctx.fillStyle = this.clr;
        ctx.fill();
        ctx.restore()
    }

}