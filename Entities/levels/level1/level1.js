class level1 extends Level{
    constructor(){
        super();   
    }
    loadPlatforms() {
        this.platforms[0] = new level1platform(100,200,100);
        //need the specific platform class to get started on loading platforms
        
    }

    run(){
        this.render();
        this.update();
    }


}