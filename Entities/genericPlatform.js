/*
things we need
*/

class Platform {
    constructor() {
        this.coin = null;
        this.resource = null;
        this.enemy = null;
        this.image = null;
        this.id = null;
    }

    update() {
        // template function
    }

    render() {
        // template function
    }

    run() {
        this.update();
        this.render();
    }

}   