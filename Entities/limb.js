class Limb {
    constructor(location, length, width, oppositePosition, factor) {
        this.loc = location;
        this.rotation = 0;
        this.length = length;
        this.frameCount = 0;
        this.period = 60;
        this.amplitudeFactor = 0.6;
        this.amplitude;
        this.displacement = width / 3;
        this.oppositePosition = oppositePosition;
        this.forwardPosition = this.loc.x;
        this.factor = factor;
    }

    update() {

        this.forwardPosition = this.loc.x;
        this.frameCount++;
        if (game.hero.vel.x == 0) {
            this.frameCount = 0;
        }
        if (game.hero.vel.x > 0) {
            this.loc.x = this.forwardPosition;
        } else if (game.hero.vel.x < 0) {
            this.loc.x = this.oppositePosition;
        }

        this.amplitude = this.factor * this.amplitudeFactor * (game.hero.vel.x);
        this.rotation = this.amplitude * Math.sin(Math.PI * 2 * this.frameCount / this.period) + Math.PI / 2;
    }

    render() {
        // calculate the end of the limb using the location of the limb, its rotation, and itslength
        let x = this.loc.x;
        let y = this.loc.y;
        let r = this.rotation;
        let l = this.length;
        // draw the limb as a line from the start to the end with length
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.strokeStyle = "white";
        // Set stroke width to 4
        ctx.lineWidth = 4;
        ctx.lineTo(x + l * Math.cos(r), y + l * Math.sin(r));
        ctx.stroke();
        ctx.closePath();
    }

    run(location, oppositePosition) {
        this.loc = location;
        this.oppositePosition = oppositePosition;

        this.update();
        this.render();
    }
}

// class Limb {
//     constructor(location, length) {
//         this.loc = location;
//         this.rotation = 0;
//         this.length = length;
//         this.frameCount = 0;
//         this.period = 100;
//         this.amplitudeFactor = 1;
//         this.amplitude;
//         this.oppositeSide = this.loc + game.hero.width / 3;
//         this.forwardSide = this.loc;
//     }

//     update() {
//         this.frameCount++;
//         if (game.hero.vel.x == 0) {
//             this.frameCount = 0;
//         }
//         if (game.hero.vel.x > 0) {
//             this.loc = this.forwardSide;
//         } else if (game.hero.vel.x < 0) {
//             this.loc = this.oppositeSide;
//         }
//         this.amplitude = this.amplitudeFactor * (game.hero.vel.x);
//         this.rotation = this.amplitude * Math.sin(Math.PI * 2 * this.frameCount / this.period) + Math.PI / 2;
//     }

//     render() {
//         // calculate the end of the limb using the location of the limb, its rotation, and itslength
//         let x = this.loc.x;
//         let y = this.loc.y;
//         let r = this.rotation;
//         let l = this.length;
//         // draw the limb as a line from the start to the end with length
//         ctx.beginPath();
//         ctx.moveTo(x, y);
//         ctx.strokeStyle = "white";
//         // Set stroke width to 4
//         ctx.lineWidth = 4;
//         ctx.lineTo(x + l * Math.cos(r), y + l * Math.sin(r));
//         ctx.stroke();
//         ctx.closePath();
//     }

//     run(location) {
//         this.loc = location;
//         this.update();
//         this.render();
//     }
// }