class Levels {
    constructor(id) {
        this.id =id
        this.platforms = [];
        this.enemies = [];
        this.powerups = [];
        this.obstacles = [];
        this.loadPlatforms();
    }
    loadPlatforms(){
        //this function hard codes all of the platforms in by hand
        this.platforms[0] = new Platform(0,600,500,"red");
        this.platforms[1] = new Platform(0,600,500,"green");
    }
    run() {
        // console.log("level was run")
        this.runEntities();
    }
    runEntities(){
        for(let i = this.platforms.length-1;i>=0;i--){
            //make sure to run for loops backwards to help with splicing
            this.platforms[i].run();
        }
    }
}