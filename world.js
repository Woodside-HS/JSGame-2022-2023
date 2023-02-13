function World() {

  this.cnvMain = document.getElementById('cnv1');
  this.ctxMain = this.cnvMain.getContext('2d');
  //  vector to locate canvas in the world


  this.dims = {
    top: -1500,
    left: -2000,
    bottom: 1500,
    right: 2000,
    width: 4000,
    height: 3000
  }

    this.cnvMainLoc = new JSVector(0, 0);

      // add an event handler such that the a, s, w, d keys
      // will reposition the canvas within the world.
      window.addEventListener("keypress", function (event) {
        switch (event.code) {
          //  What is "this" inside of the listener????????????????????
          case "KeyW":
            if (world.cnvMainLoc.y + 100 > world.dims.top)
              world.cnvMainLoc.y -= 20;
            break;
          case "KeyS":
            if (world.cnvMainLoc.y + world.cnvMain.height - 100 < world.dims.bottom)
              world.cnvMainLoc.y += 20;
            break;
          case "KeyA":
            if (world.cnvMainLoc.x + 100 > world.dims.left)
              world.cnvMainLoc.x -= 20;
            break;
          case "KeyD":
            if (world.cnvMainLoc.x + world.cnvMain.width - 100 < world.dims.right)
              world.cnvMainLoc.x += 20;
            break;
            break;
        }
      }, false);
}//++++++++++++++++++++++++++++++  end world constructor


// run the world in animation
World.prototype.run = function () {
  let ctx = this.ctxMain;
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
