function World() {
    this.cnv = document.getElementById('cnv');
    this.ctx = this.cnv.getContext('2d');
    this.dims = {
        top: -400,
        left: 0,
        bottom: 0,
        right: 6000,
        height: 400,
        width: 6000
    }

    this.cnvLoc = new JSVector(0, -400);
    this.player = new Player(50, -300, this.ctx);
    this.player2 = new Player(50, -200, this.ctx);
    this.playerDisplacement = 225;
    this.lerpDestination = this.player.loc.x - this.playerDisplacement;
    this.cameraStiffness = 0.01;


}


World.prototype.run = function () {
    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    this.ctx.save();
    this.ctx.translate(-this.cnvLoc.x, -this.cnvLoc.y);
    let ctx = this.ctx;

    //this.cnvLoc.x = lerp(this.cnvLoc.x, this.lerpDestination, this.cameraStiffness);
    this.player.run();
    this.player2.run();

    //KEEP THIS LINE AT THE BOTTOM
    ctx.restore();

}

