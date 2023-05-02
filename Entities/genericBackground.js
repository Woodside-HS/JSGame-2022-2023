class genericBackground {
    constructor(images){
        this.loc = new JSVector(0, 0);
        this.offset = [];
        this.imgs = images;
        for(let i = 0; i <this.imgs.length; i++){
            this.offset[i]=0;
        }
        this.parrallaxEffect = 1;
        this.width = canvas.width;
        this.height = canvas.height;
    }
    //id of 0 should return 1, used for parrallax effect and height
    //each sucessive id 
    calcPerc(id){
        //short for calculate percentage
        let perc = id/this.imgs.length;
        if(id ==0){
            //makes sure that the furtherest back actually moves
            return (this.imgs.length*.05)/this.imgs.length;
        } else {
            return (this.imgs.length*perc)/this.imgs.length;
        }
        
    }
    run(){
        for(let i = 0; i < this.imgs.length; i++){
            //runs thru each of the images
            this.render(i);
            this.loop(i);
        }
    }
    render(id){
        let perc = this.calcPerc(id);
        //id is which image is being rendered 
        ctx.save();
        ctx.translate(game.camLoc.x*(1-perc), 0);
        if(id==0){
            perc = 0;
            //fixing small error overlooked earlier
        }
        ctx.drawImage(this.imgs[id], this.loc.x+canvas.width+this.offset[id],   this.height*perc,  this.width,  this.height-this.height*perc);
        ctx.drawImage(this.imgs[id], this.loc.x+this.offset[id],                this.height*perc,  this.width,  this.height-this.height*perc);
        ctx.drawImage(this.imgs[id], this.loc.x-canvas.width+this.offset[id],   this.height*perc,  this.width,  this.height-this.height*perc);
        ctx.restore();
    }
    loop(id){
        let perc = this.calcPerc(id);
        if((perc)*game.camLoc.x>canvas.width*(this.offset[id]/canvas.width)){
            this.offset[id] += canvas.width;
        } else if((perc)*game.camLoc.x<canvas.width*(this.offset[id]/canvas.width)-canvas.width){
            this.offset[id] -= canvas.width;
        }
    }
}