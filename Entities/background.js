class Background {
    constructor(id) {
        //id of 0 is background, 1 is midground, 2 is foreground
        this.id = id;
        this.loc = new JSVector(0, 0);
        this.offset = 0;
        this.img;
        this.loadImages();
        this.parrallaxEffect = 1;
        this.width = canvas.width;
        
        if(this.id == 0){
            this.parrallaxEffect = 1;
        } else if(this.id == 1){
            this.parrallaxEffect = 0.75;
        } else if(this.id ==2){
            this.parrallaxEffect = .5;
        }
        if(this.id == 0){
            this.height = canvas.height*1;
        } else if(this.id == 1){
            this.height = canvas.height*.75;
        } else if(this.id ==2){
            this.height = canvas.height*.5;
        }
        
    }
    loadImages() {
        this.img = document.createElement("img");
        this.img.src = "resources/backgrounds/bg" + (this.id + 1) + ".png";
        console.log(this.img.src);
    }
    run() {
        this.loop();
        this.render();
    }
    loop() {
        if((1-this.parrallaxEffect)*game.camLoc.x>canvas.width*(this.offset/canvas.width)){
            this.offset += canvas.width;
        } else if((1-this.parrallaxEffect)*game.camLoc.x<canvas.width*(this.offset/canvas.width)-canvas.width){
            this.offset -= canvas.width;
        }
    }
    render() {
        //draws 3 images to make loop smoother
        ctx.save();
        ctx.translate(game.camLoc.x*this.parrallaxEffect, 0);
        ctx.drawImage(this.img, this.loc.x+canvas.width+this.offset, canvas.height-this.height,this.width, this.height);
        ctx.drawImage(this.img, this.loc.x+this.offset, canvas.height-this.height,this.width, this.height);
        ctx.drawImage(this.img, this.loc.x-canvas.width+this.offset, canvas.height-this.height,this.width, this.height);
        ctx.restore();
    }
}