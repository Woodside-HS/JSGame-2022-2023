function World() {

  this.cnvMain = document.getElementById('cnv1');
  this.ctxMain = this.cnvMain.getContext('2d');
  this.cnvMini = document.getElementById('cnv2');
  this.ctxMini = this.cnvMini.getContext('2d');
  //  vector to locate canvas in the world


  this.dims = {
    top: -1500,
    left: -2000,
    bottom: 1500,
    right: 2000,
    width: 4000,
    height: 3000
  }


  this.movers = [];
  this.loadMovers(10, 900);

  //Step 1::reduce world to fit inside of mini Canvas
    this.scaleX = this.cnvMini.width/this.dims.width;
    this.scaleY = this.cnvMini.height/this.dims.height;
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
  let mini = this.ctxMini;
    //clear the rectangle in main canvas

  //  move the main canvas inside of the world
  ctx.clearRect(0, 0, this.cnvMain.width, this.cnvMain.height);
  mini.clearRect(0, 0, this.cnvMini.width, this.cnvMini.height);
  


  ctx.save();
  mini.save();
  ctx.translate(-this.cnvMainLoc.x, -this.cnvMainLoc.y);
  mini.translate(this.cnvMini.width/2, this.cnvMini.height/2);

  
  ctx.beginPath(); //draws axis main
  ctx.moveTo(this.dims.left, 0);
  ctx.lineTo(this.dims.right, 0);
  ctx.closePath();
  ctx.lineWidth = 20;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, this.dims.top);
  ctx.lineTo(0, this.dims.bottom);
  ctx.closePath();
  ctx.lineWidth = 20;
  ctx.stroke();


  ctx.beginPath(); //draws border main
  ctx.moveTo(this.dims.left, this.dims.top);
  ctx.lineTo(this.dims.left, this.dims.bottom);
  ctx.lineTo(this.dims.right, this.dims.bottom);
  ctx.lineTo(this.dims.right, this.dims.top);
  ctx.closePath();
  ctx.lineWidth = 20;
  ctx.stroke();

  //  scale the world to fit into the miniCanvas
  mini.scale(this.scaleX, this.scaleY);

  //  center the world inside of the miniCanvas
  //  run the movers in both canvas

  for (let i = 0; i < this.movers.length; i++) {
    this.movers[i].run();
  }


  ctx.restore();

  mini.beginPath(); //draws axis mini
  mini.moveTo(this.dims.left, 0);
  mini.lineTo(this.dims.right, 0);
  mini.closePath();
  mini.lineWidth = 20;
  mini.stroke();
  mini.beginPath();
  mini.moveTo(0, this.dims.top);
  mini.lineTo(0, this.dims.bottom);
  mini.closePath();
  mini.lineWidth = 20;
  mini.stroke();

  mini.beginPath(); //draws border mini
  mini.moveTo(this.cnvMainLoc.x, this.cnvMainLoc.y);
  mini.lineTo(this.cnvMainLoc.x, this.cnvMainLoc.y+this.cnvMain.height);
  mini.lineTo(this.cnvMainLoc.x + this.cnvMain.width, this.cnvMainLoc.y+this.cnvMain.height);
  mini.lineTo(this.cnvMainLoc.x + this.cnvMain.width, this.cnvMainLoc.y);
  mini.closePath();
  mini.lineWidth = 20;
  mini.stroke();



  mini.restore();
  //  restore the context

  // Step Three:  Draw the mainCanv and axes in the miniCanv ########################################################
  //    scale cnvMini to contain the entire world

  //    center the world in miniCnv

  //    draw x and y axes on miniMap

  //    outline box inside of cnvMini
}

//Load mover array
World.prototype.loadMovers = function (r, n) {
  for (let i = 0; i < n; i++) {
    let x = Math.random()*this.dims.width -this.dims.width/2;
    let y = Math.random()*this.dims.height - this.dims.height/2;
    this.movers[i] = new Mover(x, y, this.ctxMain, this.ctxMini, 10, this.getRandomColor());
  }
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
