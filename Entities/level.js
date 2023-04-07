//Main goal is the refactor level class
class Levels {
  //? blue comments are new additions
  //?1st thing, we want to make lvl a superclass, which will be extedended by each of the individual levels
  //?2nd thing, we want the platforms to be rendered within the individual levels rather than the broader level class
  constructor(id) {
    this.id = id;
    this.platforms = [];
    this.obstacles = [];
    this.backgrounds = [];
    this.loadPlatforms();
  }
//New superclass function
endLevel(){
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

        
      if (this.id == 1) {
          //backgrounds of first level
          this.backgrounds[0] = new Background(0);
          this.backgrounds[1] = new Background(1);
          this.backgrounds[2] = new Background(2);
          //first level
          this.platforms[0] = new Platform(-100, 600, 12000, 20, "brown", false, false, 0, 0);//ground platform
          //TODO need a barrier to keep player from going left
          this.platforms[1] = new Platform(400, 500, 200, 20, "blue", false, true, 0, false, 0);//first platform
          this.platforms[2] = new Platform(700, 450, 200, 20, "blue", true, false, 0, false, 1);//second platform
          this.platforms[3] = new Platform(1450, 200, 200, 20, "blue", true, false, 0, false, 0);//top platform with enemy
          this.platforms[4] = new Platform(650, 250, 100, 20, "blue", false, true, 0, false, 2);//upper left platform
          this.platforms[5] = new Platform(900, 350, 200, 20, "blue", false, false, 0, true, 0);//trap platform
          this.platforms[6] = new Platform(1200, 400, 300, 20, "blue", false, false, 0, false, 3);
          //! when the height is below like 200(top of screen), it should generally be more difficult but have more coins
          this.platforms[7] = new Platform(1100, 500, 150, 20, "blue", false, false, 0, false, 0);
          this.platforms[8] = new Platform(1150, 150, 150, 20, "blue", true, true, 0, false, 0);
          this.platforms[9] = new Platform(1700, 150, 200, 20, "blue", false, true, 0, true, 0);
          this.platforms[10] = new Platform(1650, 450, 150, 20, "blue", false, false, 0, true, 0);
          this.platforms[11] = new Platform(1700, 275, 150, 20, "blue", false, true, 0, false, 0);
          this.platforms[12] = new Platform(1900, 325, 150, 20, "blue", false, true, 0, false, 1);
          this.platforms[13] = new Platform(2100, 350, 150, 20, "blue", false, true, 0, false, 0);
          this.platforms[14] = new Platform(2400, 250, 150, 20, "blue", false, true, 0, false, 2);
          this.platforms[15] = new Platform(2700, 300, 150, 20, "blue", false, true, 0, false, 0);
          this.platforms[16] = new Platform(3000, 325, 150, 20, "blue", false, true, 0, false, 3);
          this.platforms[17] = new Platform(3300, 350, 150, 20, "blue", false, true, 0, false, 0);
          this.platforms[18] = new Platform(3600, 275, 150, 20, "blue", false, true, 0, false, 0);
      }
      if (this.id == 2) {
          //level 2
          this.platforms[0] = new Platform(0, 600, 1000, 10, "pink", true, true, 0, true, false);
          this.platforms[1] = new Platform(1100, 500, 20, 100, "orange", false, false, 1, false, false);
      }
  }
    
  run() {
    // console.log("level was run")
    this.runEntities();
  }
  
  runEntities() {
    let hpPerc = (Math.PI*2)-(game.hero.statusBlock.hp/100)*Math.PI*2
    ctx.save();
    ctx.beginPath();
    ctx.arc(game.camLoc.x+canvas.width-20, 20, 10, hpPerc, Math.PI * 2);
    ctx.arc(game.camLoc.x+canvas.width-20, 20, 1, hpPerc, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.fill();
    ctx.stroke();
    ctx.closePath(); //beginning and closing path just to be sure
    ctx.restore();

    for (let i = this.platforms.length - 1; i >= 0; i--) {
      //make sure to run for loops backwards to help with splicing
      this.platforms[i].run();
    }
  }
  runBG(){
    for(let i = 0; i <this.backgrounds.length; i++){
      this.backgrounds[i].run();
    }
  }
}
