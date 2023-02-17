class Platform {
    constructor(x, y, width, height, clr, enemyYN, coinYN, coinCost, trapYN) {
        //* YN = yes/no
        this.loc = new JSVector(x, y);
        this.width = width;
        this.height = height;
        this.clr = clr;
        this.enemies = [];
        this.powerups = [];
        this.traps = [];

        this.coinCost = 0;
        if (coinCost) {
            this.coinCost = coinCost;
            //overwrites the coinc cost assuming there is one
        }
        if (enemyYN) {
            this.loadEnemies();
        }
        if (coinYN) {
            this.loadCoins();
        }
        if (trapYN) {
            this.loadTrap();
        }
    }
    loadEnemies() {
        this.enemies[0] = new Enemy(this.loc.x, this.loc.y, this.width, 10);
    }
    loadCoins() {
        this.powerups[0] = new Coin(this.loc.x, this.loc.y, this.width, 5);
    }
    loadTrap() {
        this.traps[0] = new Trap(this.loc.x, this.loc.y, this.width)
    }

    run() {
        if (game.hero.statusBlock.coins >= this.coinCost) {
            this.render();
            this.checkHero();
            this.runEntities();
            this.sideCollision();
        } else {
            this.coinLess();
        }

    }
    coinLess() {
        ctx.fillText("you dont have enough coins", this.loc.x, this.loc.y);
        ctx.fillStyle = this.clr;
        ctx.fill();
    }
    runEntities() {
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            //goes backwards to aid with splices
            this.enemies[i].run();
            if (this.enemies[i].isdead) {
                this.enemies.splice(i, 1)
            }
        }
        for (let i = this.powerups.length - 1; i >= 0; i--) {
            //goes backwards to aid with splices
            this.powerups[i].run();
            if (this.powerups[i].collected) {
                this.powerups.splice(i, 1);
                //splices out the coin if it has been collected
            }
        }

        for (let i = this.traps.length - 1; i >= 0; i--) {
            //goes backwards to aid with splices
            this.traps[i].run();
            if (this.traps[i].statusBlock.isDead) {
                this.traps.splice(i, 1);
                //splices out the trap if it dead
            }
        }
    }
    render() {
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);//top left
        ctx.lineTo(this.loc.x + this.width, this.loc.y);//top right
        ctx.lineTo(this.loc.x + this.width, this.loc.y + this.height);//bottom right
        ctx.lineTo(this.loc.x, this.loc.y + this.height);//bottom left
        //platforms will have uniform height fo now
        ctx.closePath()
        ctx.fillStyle = this.clr;
        ctx.fill();
    }
    checkHero() {
        let heroLoc = new JSVector(game.hero.loc.x, game.hero.loc.y); // the heros x & y location
        let heroH = game.hero.height; // the heros height
        let heroW = game.hero.width; // the heros width
        if ( //checks if the heros location is overlaping with the platform
            heroLoc.x + heroW > this.loc.x &&
            heroLoc.x < this.loc.x + this.width &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y < this.loc.y + this.height
        ) {
            // console.log("touching platform");
            game.hero.statusBlock.onPlatform = true;
            game.hero.statusBlock.jumpCount = 0;
            game.hero.loc.y = this.loc.y - game.hero.height; // places the hero on the top of the platform
            return true;
        } else {
            return false;
        }
    }
    sideCollision() {

        //does not work vertically for now
        if (game.hero.loc.x + game.hero.width < this.loc.x) {
            //the hero is to the left of the platform
            if (game.hero.loc.x + game.hero.width > this.loc.x - 10) {
                if (game.hero.loc.y + game.hero.height - 5 > this.loc.y && game.hero.loc.y < this.loc.y + (game.hero.height)) {
                    //makes sure hero is not above the platform
                    hittingLeft = true;
                    hittingRight = false;
                    //hitting left works(for now)
                }

            }
        }//left check if statement
        if (game.hero.loc.x > this.loc.x + this.width) {
            //checks that it is right
            if (game.hero.loc.x < this.loc.x + this.width + 10) {
                if (game.hero.loc.y + game.hero.height - 5 > this.loc.y && game.hero.loc.y < this.loc.y + (game.hero.height)) {
                    hittingRight = true;
                    hittingLeft = false;
                }
            }
        }
        if (game.hero.loc.y + game.hero.height < this.loc.y - 11) {
            hittingLeft = false;
            hittingRight = false;
        }
    }
}