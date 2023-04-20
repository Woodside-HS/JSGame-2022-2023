class level1platform extends Platform {
    constructor(){
        super();
    }

    update() {
    }

    render() {
        ctx.beginPath();
        ctx.moveTo(this.loc.x,this.loc.y);
    }
}