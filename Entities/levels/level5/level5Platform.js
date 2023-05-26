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
        this.shortPlatformImg;
    }
    run() {
        this.loadImages();
        this.update()
        this.render();
        this.checkHero();
        this.updateZombie();
    }
    loadImages() {
        this.shortPlatformImg = document.createElement("img");
        this.shortPlatformImg.src = `Images/Level5/platforms/plat1.png`
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
        // ctx.beginPath();
        // ctx.moveTo(this.loc.x, this.loc.y);
        // ctx.lineTo(this.loc.x + this.width, this.loc.y);
        // ctx.lineTo(this.loc.x + this.width, this.loc.y + 10);
        // ctx.lineTo(this.loc.x, this.loc.y + 10);
        // ctx.closePath();
        // ctx.fillStyle = this.clr;
        // ctx.fill();

        ctx.drawImage(this.shortPlatformImg, this.loc.x, this.loc.y, this.width, 10);
        ctx.restore()
    }

}