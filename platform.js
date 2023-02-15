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