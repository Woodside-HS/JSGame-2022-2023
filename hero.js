function Hero(width, ctx) {
    this.loc = new JSVector(50, 0);
    this.vel = new JSVector(0, 1);
    this.acc = new JSVector(0,.05);
    this.clr = "blue";
    this.size = width;
    this.ctx = ctx;
    this.height = 5
    this.jumpCoef = -3;
    this.movingRight = false;
    this.movingLeft = false;
    this.onPlatform = false;

  
}


Hero.prototype.run = function () {
    this.render();
    this.update();
    this.checkPlatform();
    if(!this.onPlatform){
        this.loc.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(2);
    }
    //this.checkPlatform();
    //this.checkDeath();
}

Hero.prototype.jump = function () {
    //if(count < 4){
    this.loc.y = this.loc.y - 10;
    this.vel.y = this.jumpCoef;
    this.onPlatform = false;
    this.vel.limit(2); //limit to twice
  //  this.count++;
   // }
}

// Hero.prototype.checkPlatform = function(){
//     for(let i = 0; i<world.platforms.length; i++){
//         //console.log(world.platforms[i].size);
//     if(this.loc.x >= world.platforms[i].loc.x && this.loc.x <= world.platforms[i].size+world.platforms[i].loc.x){
//         console.log(i);
//         if(this.loc.y >= world.platforms[i].loc.y && this.loc.y <= world.platforms[i].loc.y + world.platforms[i].height){
//             this.vel.y = 0;
//             this.loc.y = world.platforms[i].loc.y;
//             //this.count = 0; //remember to add later
//         }
//         //(this.loc.y >= world.platforms[i].loc.y && this.loc.y <= world.platforms[i].loc.y + world.platforms[i].height) && ((this.loc.x >= world.platforms[i].loc.x) && (this.loc.x <= world.platforms[i].size+world.platforms[i].loc.x)) && this.vel.y >=0
//     }
// }
// }


Hero.prototype.render = function () {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(this.loc.x + this.size, this.loc.y);
    ctx.lineTo(this.loc.x + this.size, this.loc.y - this.height);
    ctx.lineTo(this.loc.x, this.loc.y - this.height);
    ctx.closePath();
    ctx.fillStyle = this.clr;
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.fill();
}