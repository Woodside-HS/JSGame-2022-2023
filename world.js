function World() {

  this.cnvMain = document.getElementById('cnv1');
  this.ctxMain = this.cnvMain.getContext('2d');
  //  vector to locate canvas in the world


  this.dims = {
    top: 0,
    left: 0,
    bottom: 600,
    right: 2400,
    width: 2400,
    height: 600
  }
  this.cnvMainLoc = new JSVector(0, 0);

    window.addEventListener("keypress", function (event) {
      switch (event.code) {
        //  What is "this" inside of the listener????????????????????
        case "KeyA":
          if (world.cnvMainLoc.x > world.dims.left)
            world.cnvMainLoc.x -= 20;
          break;
        case "KeyD":
          if (world.cnvMainLoc.x + world.cnvMain.width < world.dims.right)
            world.cnvMainLoc.x += 20;
          break;
          break;
      }
    }, false);


    platforms[0] = new Platform(100, 300, 50, this.ctxMain); //code this as a function
  
}//++++++++++++++++++++++++++++++  end world constructor


// run the world in animation
World.prototype.run = function () {
  let ctx = this.ctxMain;
  for(let i = 0; i<platforms.length; i++){
    platforms[i].render();
  }

  ctx.clearRect(0, 0, this.cnvMain.width, this.cnvMain.height);
  


  ctx.save();
  ctx.translate(-this.cnvMainLoc.x, -this.cnvMainLoc.y);
  ctx.restore();

}


World.prototype.getRandomColor = function () {
  //  List of hex color values for movers
  let colors = [
    "#7102AB",
    "#ab0256",
    "#0285ab",
    "#02ab1a",
    "#ab5302",
    "#773e26",
    "#ab0256",
    "#257874",
    "#78254e",
    "#787725"
  ];
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
