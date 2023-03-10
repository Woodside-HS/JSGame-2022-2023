function FallTrap(ctx){
    this.ctx = ctx;

}

FallTrap.prototype.run = function(){
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = "#A20053";
    ctx.strokeStyle = "#A20053";
    ctx.moveTo(0, 600);
    ctx.lineTo(0, 550);
    ctx.lineTo(2400, 550);
    ctx.lineTo(2400, 600)
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    if(hero.loc.y>550){
        hero.death = true;
    }
}