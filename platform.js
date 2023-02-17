function Platform(x, y, s, ctx, cnvLoc){ // loc from upper left corner and size
    this.loc = new JSVector(x, y);
    this.ctx = ctx;
    this.size = s;
    this.clr = "brown";
    this.height = 20;
    this.cnvLoc = cnvLoc;
}

Platform.prototype.run = function(){
    this.render();
    this.checkChar();
}


Platform.prototype.checkChar = function(){
    if(this.loc.x <= (hero.loc.x + this.cnvLoc.x) && (this.loc.x + this.size) >= (hero.loc.x + this.cnvLoc.x)){
        if(hero.loc.y >= this.loc.y && hero.loc.y <= this.loc.y + this.height){
            hero.vel.y = 0;
            hero.loc.y = this.loc.y;
            hero.onPlatform = true;
        }
    }
}


Platform.prototype.render = function(){
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = this.clr;
    ctx.strokeStyle = "black";
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(this.loc.x+ this.size, this.loc.y);
    ctx.lineTo(this.loc.x + this.size, this.loc.y + this.height);
    ctx.lineTo(this.loc.x, this.loc.y + this.height);
    ctx.lineTo(this.loc.x, this.loc.y);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}