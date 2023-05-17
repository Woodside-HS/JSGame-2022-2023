function GameArea() {
  //  Wrapper Div
  this.wrapperDiv = document.getElementById("wrapperDiv");
  this.wrapperDiv.setAttribute(
    "style",
    " background-color:yellow; border: 5px solid black; width:1100px; height:800px;"
  );
  // create tileMenuDiv
  this.tileMenuDiv = document.createElement("div");
  this.wrapperDiv.appendChild(this.tileMenuDiv);
  this.tileMenuDiv.setAttribute(
    "style",
    " background-color:#FFFFFF; width:1100px; height:100px;float:left;"
  );

  // create canvasDiv
  this.canvasDiv = document.createElement("div");
  this.wrapperDiv.appendChild(this.canvasDiv);
  this.canvasDiv.setAttribute(
    "style",
    " background-color:pink; width:1100px; height:700px;float:left;"
  );

  // place canvas in div and style
  this.canvasDiv.appendChild(canvas);
  //  create tiles for tile menu
  this.tiles = [];
  this.tileText = [];
  for (let i = 0; i < 6; i++) {
    this.tiles[i] = document.createElement("div");
    this.tileMenuDiv.appendChild(this.tiles[i]);
    this.tiles[i].setAttribute("class", "tile");
    this.tileText[i] = document.createTextNode("Tile " + (i + 1) + "");
    //this.t1Text.style.padding = "10px";
    this.tiles[i].appendChild(this.tileText[i]);
  }

  //  Add listeners to tile objects
  for (let i = 0; i < this.tiles.length; i++) {
    this.tiles[i].addEventListener(
      "mouseover", // mouseover is the name of an event
      function () {
        //  JavaScript has anonymous functions
        //  'this' is the listener target object: tile
        //  'this' does not refer to the PlayArea object
        this.style.backgroundColor = "#ac8fe3";
      },
      false
    );
    this.tiles[i].addEventListener(
      "mouseout",
      function () {
        this.style.backgroundColor = "#d5dee0";
      },
      false
    );
    this.tiles[i].addEventListener(
      "click",
      function () {
        game.gamePaused = !game.gamePaused;
        console.log("Mouse Clicked");
      },
      false
    );
  }

  // "title 1" click listener
  // if clicked itll run the game!
  this.tiles[0].addEventListener(
    "click",
    function () {
      gameState = 1;
      console.log("gameState = 1!!!"); // gameState = 1 means the you are playing on level 1
      game.hero.loc.x = 200;
      game.hero.loc.y = 200;
      game.hero.vel.setMagnitude(0);
      stopMovement = false;
    },
    false
  );
  this.tiles[1].addEventListener(
    "click",
    function () {
      gameState++;
      game.hero.loc.x = 200;
      game.hero.loc.y = 200;
      game.hero.vel.setMagnitude(0);
    },
    false
  );
}
