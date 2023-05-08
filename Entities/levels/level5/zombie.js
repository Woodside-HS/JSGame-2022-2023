class zombie {
    constructor(x, y, h, w, pw) {
        this.w = w;
        this.h = h
        this.platformWidth = pw
        this.platformLoc = new JSVector(x, y);
        this.loc = new JSVector(x, y - this.h); // sets the zombie on the top of platform its sitting on.
        this.isDead = false;
        this.hp = 100;
        this.movingL = false;
        this.movingR = true
    }
    run() {
        this.render();
        this.update();
        this.checkHero()
        this.moveZombie()
    }
    render() {
        ctx.save()
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rect(0, 0, this.h, this.w)
        ctx.fill()
        ctx.restore()
        // console.log("shoulde be here")
    }
    update() {
    }
    checkHero() {

    }
    moveZombie() {

    }
}