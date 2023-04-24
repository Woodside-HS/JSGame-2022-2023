class genericBackground {
    constructor(images){
        this.loc = new JSVector(0, 0);
        this.offset = 0;
        this.imgs = images;
        this.parrallaxEffect = 1;
        this.width = canvas.width;
        this.height = canvas.height;
    }
    //id of 0 should return 1, used for parrallax effect and height
    //each sucessive id 
    calcPerc(id){
        //short for calculate percentage
        let perc = id/this.imgs.length;
        return (this.imgs.length*perc)/this.imgs.length;
    }
    run(){
        for(let i = 0; i < this.imgs.length; i++){
            //runs thru each of the images
            console.log(this.calcPerc(i));
            this.render(i);
            this.loop(i);
        }
    }
    render(id){
        let perc = this.calcPerc(id);
        //id is which image is being rendered 
        ctx.save();
        ctx.translate(game.camLoc.x*perc, 0);
        //ctx.drawImage(this.img, this.loc.x+2*canvas.width+this.offset, this.loc.y,canvas.width, canvas.height);
        ctx.drawImage(this.imgs[id], this.loc.x+canvas.width+this.offset, canvas.height-this.height,this.width, this.height*perc);
        ctx.drawImage(this.imgs[id], this.loc.x+this.offset, canvas.height-this.height,this.width, this.height*perc);
        ctx.drawImage(this.imgs[id], this.loc.x-canvas.width+this.offset, canvas.height-this.height,this.width, this.height*perc);
        //ctx.drawImage(this.img, this.loc.x-2*canvas.width+this.offset, this.loc.y,canvas.width, canvas.height);
        ctx.restore();
    }
    loop(id){
        let perc = this.calcPerc(id);
        if((1-perc)*game.camLoc.x>canvas.width*(this.offset/canvas.width)){
            this.offset += canvas.width;
        } else if((1-perc)*game.camLoc.x<canvas.width*(this.offset/canvas.width)-canvas.width){
            this.offset -= canvas.width;
        }
    }
}