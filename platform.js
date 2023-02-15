function Platform(x, y, s, ctx){ // loc from upper left corner and size
    this.loc = new JSVector(x, y);
    this.ctx = ctx;
    this.size = s;
    this.clr = "brown";
    this.height = 20;
}


//render


Platform.prototype.render = function(){
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = this.clr;
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(this.loc.x+ this.size, this.loc.y);
    ctx.lineTo(this.loc.x + this.size, this.loc.y + this.height);
    ctx.lineTo(this.loc.x, this.loc.y + this.height);
    ctx.lineTo(this.loc.x, this.loc.y);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}