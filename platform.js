function Platform(x, y, s, ctx, cnvLoc){ // loc from upper left corner and size
    this.loc = new JSVector(x, y);
    this.ctx = ctx;
    this.size = s;
    this.clr = "brown";
    this.height = 20;
    this.enemies = [];
    this.cnvLoc = cnvLoc;
}


//render


Platform.prototype.render = function(){
    for (let i = 0; i < this.enemies.length; i++) {
        this.enemies[i].run();
    }
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.strokeStyle = "black";
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

Platform.prototype.loadEnemies = function(n){
    this.enemies.push(new Enemy(this.loc.x, this.loc.y, this.loc, this.size, this.ctx));
}

Platform.prototype.checkChar = function(){
    let temp = false;
    if(this.loc.x <= (hero.loc.x + this.cnvLoc.x) && (this.loc.x + this.size) >= (hero.loc.x + this.cnvLoc.x)){
        if(hero.loc.y >= this.loc.y && hero.loc.y <= this.loc.y + this.height){
            hero.vel.y = 0;
            hero.loc.y = this.loc.y;
            temp = true;
        }
    }
    hero.onPlatform = temp;
}

//stops character
// Platform.prototype.stopChar = function(){
//     if(h1.loc.x + 10 >= this.loc.x && h1.loc.x -10 <= this.loc.x + this.size){
//         if(h1.loc.y + 10 >=this.loc.y && h1.loc.y + 10 <this.loc.y+2){
//           h1.onPlatform = true;
//           h1.jVel = 0;
//           check = true;
//         }
//     }
// }