//Main goal is the refactor level class
class Level {
  //? blue comments are new additions
  //?1st thing, we want to make lvl a superclass, which will be extedended by each of the individual levels
  //?2nd thing, we want the platforms to be rendered within the individual levels rather than the broader level class
  constructor(id) {
    this.id = id;
    this.platforms = [];
    this.obstacles = [];
    this.backgrounds = [];
    this.enemies = [];
    this.loadPlatforms();
  }
  //New superclass function
  endLevel() {
    //?Would reset hero loc, and health
    //?increase game state, get game ready to move on to the next level
  }
  //?platforms, backgrounds, enemies, powerups etc will be hardcoded into each of the level subclasses

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% - old code below
  loadPlatforms() { //should be independent to the levels
    //this function hard codes all of the platforms in by hand
    /* 
      ? in the new code, we will have a different file  
      ? this file will be dedicated to level storage and will only have like 7 functions
      ? each function will just be loading the platforms in, like seen below 
      ? it will just clean up the level subclasses
     */
    if (this.id = 1) {
      this.platforms = game.storage.loadLevel1;
      this.backgrounds = loadBackground1();
    }

  }

  run() {
    //! will be moved to another location some time later
    // let hpPerc = (Math.PI*2)-(game.hero.statusBlock.hp/100)*Math.PI*2
    // ctx.save();
    // ctx.beginPath();
    // ctx.arc(game.camLoc.x+canvas.width-20, 20, 10, hpPerc, Math.PI * 2);
    // ctx.arc(game.camLoc.x+canvas.width-20, 20, 1, hpPerc, Math.PI * 2);
    // ctx.fillStyle = "red";
    // ctx.strokeStyle = "red";
    // ctx.fill();
    // ctx.stroke();
    // ctx.closePath(); 
    // ctx.restore();
    for (let i = this.platforms.length - 1; i >= 0; i--) {
      //make sure to run for loops backwards to help with splicing
      this.platforms[i].run();
    }
  }
  
  runBG() {
    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].run();
    }
  }
}
