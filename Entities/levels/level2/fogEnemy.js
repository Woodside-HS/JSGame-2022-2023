class FogMonster {
    constructor(x, y, h, w, pw) {
        this.w = 200;
        this.h = h;
        this.platformWidth = pw;
        this.platformLoc = new JSVector(x, y);
        this.loc = new JSVector(x, y - this.h);
        this.isDead = false;
        this.hp = 200;
        this.fadingIn = true;
        this.fadeTime = 4000;
        this.lastFadeTime = Date.now();
        this.damageOnContact = true;
        this.particleSystem = new ParticleSystem2();
    }

    run(heroLoc) {
        this.render();
        this.checkHero(heroLoc, game.hero.height, game.hero.width);
        this.handleFade();
        this.particleSystem.update();
        this.particleSystem.draw();
    }

    handleFade() {
        if (Date.now() - this.lastFadeTime >= this.fadeTime) {
            this.fadingIn = !this.fadingIn;
            this.damageOnContact = this.fadingIn;
            this.lastFadeTime = Date.now();
        }
    }

    render() {
        ctx.save();
        ctx.fillStyle = "grey";
        ctx.translate(this.loc.x, this.loc.y);
        ctx.globalAlpha = this.fadingIn ? 1 : 0.5;
        ctx.rect(0, 0, this.w, this.h);
        ctx.fill();
        ctx.restore();
    }

    checkHero(heroLoc, heroH, heroW) {
        let middleOfHero = heroLoc.x + (heroW / 2)
        if (
            this.damageOnContact &&
            heroLoc.x + heroW > this.loc.x &&
            heroLoc.x < this.loc.x + this.w &&
            heroLoc.y + heroH > this.loc.y &&
            heroLoc.y < this.loc.y + this.h &&
            middleOfHero < this.loc.x + this.w &&
            middleOfHero > this.loc.x
        ) {
            game.hero.statusBlock.hp--;
            this.particleSystem.addParticles(heroLoc.x, heroLoc.y, 10);
            return true;
            console.log("hi");
        }
        return false;
    }
}
