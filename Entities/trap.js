class Trap {
    constructor(x, y, width) {
        this.randomX = Math.floor(Math.random() * width);
        this.loc = new JSVector(this.randomX, y);
        this.width = width;
        this.hitBox = {
            x: this.randomX - 40,
            y: y - 10,
            width: 90,
            height: 10,
        }
        this.statusBlock = {
            isTrapping: false,
            isClosed: false, // is true if the trap has been used but isnt dead
            isDead: false, // is true after the trap has been "killed" by the hero
            isTrapped: false,
        }
        this.clr = "gray"
        this.leftAngle = 0;
        this.rightAngle = 0;
    }
    run() {
        this.render();
        this.update();
        // this.checkHero();
    }
    render() {
        ctx.save()
        ctx.beginPath()
        ctx.translate(this.loc.x, this.loc.y)
        ctx.rotate(this.leftAngle);//rotatest he left side of the trap
        ctx.moveTo(0, 0)
        ctx.lineTo(- 40, 0)
        ctx.lineTo(- 40, - 10)
        ctx.lineTo(0, - 10)
        ctx.closePath();//beginning and closing path just to be sure
        ctx.fillStyle = this.clr;
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.restore();


        ctx.save()
        ctx.beginPath()
        ctx.translate(this.loc.x, this.loc.y)
        ctx.rotate(this.rightAngle);//rotatest he right side of the trap
        ctx.moveTo(0, 0)
        ctx.lineTo(+ 40, 0)
        ctx.lineTo(+ 40, - 10)
        ctx.lineTo(0, - 10)
        ctx.closePath();//beginning and closing path just to be sure
        ctx.fillStyle = this.clr;
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.restore();
    }
    update() {
        if (!this.statusBlock.isClosed) {
            this.checkHero()
            if (
                this.statusBlock.isTrapping // if the trap is closeing.
            ) {
                this.leftAngle += 0.01
                this.rightAngle -= 0.01
            }
            //* 1.5 is the angle were the trap is point up
            if (this.rightAngle <= -1.5 || this.leftAngle >= 1.5) {
                this.statusBlock.isClosed = true
                if (this.statusBlock.isTrapped) {
                    game.hero.statusBlock.isDead = true
                    this.reSetTrap() // resets the trap for the next run of the game

                }
            }

            //* you wont get trapped untill the angle gets to 1
            //* after that the hero is locked in place and will "die" from love
            if (
                (this.rightAngle <= -1 ||
                    this.leftAngle >= 1) &&
                this.checkHero()
            ) {
                this.clr = "red"
                game.clickingA = false
                game.clickingD = false
                stopMovement = true
                this.statusBlock.isTrapped = true
            }
        }

    }
    checkHero() {
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        if ( //checks if the heros location is overlaping with the trap
            heroLoc.x + heroW > this.hitBox.x &&
            heroLoc.x < this.hitBox.x + this.hitBox.width &&
            heroLoc.y + heroH > this.hitBox.y &&
            heroLoc.y < this.hitBox.y + this.hitBox.height
        ) {
            // console.log("touching trap");
            this.statusBlock.isTrapping = true
            return true;
        } else {
            return false;
        }
    }

    reSetTrap() {
        this.statusBlock = {
            isTrapping: false,
            isClosed: false, // is true if the trap has been used but isnt dead
            isDead: false, // is true after the trap has been "killed" by the hero
            isTrapped: false,
        }
        this.clr = "gray"
        this.leftAngle = 0;
        this.rightAngle = 0;
    }
}