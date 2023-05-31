class Bear{
    constructor(platform){
           this.docile = false
           this.speed = 2;

    }

    run(){
        if(this.docile){
            this.attack();
        }
        else{
            this.idle();
        }

    } 

    attack(){
        //!Speed dependent on level3.craze

    }

    idle(){
        //! when not attacking
        
    }
    
    befriended(){
        this.docile = true;
    }

    render(){
        if(this.docile){
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, 10, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
        }
        else{
            ctx.beginPath();
            ctx.arc(this.loc.x, this.loc.y, 10, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = "red";
            ctx.fill();
        }
    }


}