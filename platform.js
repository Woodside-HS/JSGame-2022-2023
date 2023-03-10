function Platform(x, y, w, h, ctx, type, length, start, i) {
    this.ctx = ctx;
    this.loc = new JSVector(x, y);
    this.width = w;
    this.height = h;
    this.type = type;
    this.length = length;
    this.hostiles = [];
    this.regens = [];
    this.powerups = [];
    this.cleared = false;
    if (!start) {
        if (!this.type) {
            this.generateHostiles(Math.round(randomNumber(1, 2)));
        }
        this.generateRegens(Math.round(randomNumber(0, 1.6)));
        this.generatePowerUps(1);
    }
    if (i == 8) {
        this.generateHostiles(Math.round(randomNumber(1, 2)));
        this.generateRegens(Math.round(randomNumber(0.5, 1.3)));
        this.generatePowerUps(1);
    }
}

Platform.prototype.render = function () {
    if (!this.type) {
        let ctx = this.ctx;
        ctx.translate(30, -10);
        ctx.beginPath();
        ctx.rect(this.loc.x, this.loc.y + this.height, this.width, this.height);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.translate(-30, 10);
    }
}

Platform.prototype.run = function () {
    this.render();
    if (this.hostiles.length == 0 && !this.cleared) {
        world.platformsCleared++;
        this.cleared = true;
    }
    for (let i = 0; i < this.hostiles.length; i++) {
        this.hostiles[i].run();
    }
    for (let i = 0; i < this.regens.length; i++) {
        this.regens[i].run();
        if (this.regens[i].dead) {
            this.regens.splice(i, 1);
        }
    }

    for (let i = 0; i < this.powerups.length; i++) {
        this.powerups[i].run();
        if (this.powerups[i].dead) {
            this.powerups.splice(i, 1);
        }
    }
}

Platform.prototype.generateHostiles = function (n) {
    for (let i = 0; i < n; i++) {
        let x = Math.round(randomNumber(this.loc.x, this.loc.x + this.width));
        this.hostiles.push(new Hostile(x, this.loc.y, this.ctx, goblinAnims, this.loc, this.width));
    }
}

Platform.prototype.generateRegens = function (n) {
    for (let i = 0; i < n; i++) {
        let x = Math.round(randomNumber(this.loc.x, this.loc.x + this.width));
        this.regens.push(new Regen(x, this.loc.y - 20, this.ctx));
    }
}

Platform.prototype.generatePowerUps = function (n) {
    for (let i = 0; i < n; i++) {
        let x = Math.round(randomNumber(this.loc.x, this.loc.x + this.width));
        this.powerups.push(new JumpPowerUp(x, this.loc.y - 100, this.ctx));
    }
}