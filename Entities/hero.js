class Hero {
  constructor(x, y) {
    this.loc = new JSVector(x, y); //ideally loc would only be a y value for how far up the screen they are
    this.vel = new JSVector(0, 0);
    this.cursorLoc = new JSVector(0, 0); //location of the cursor aids in attacking
    this.posNeg = true; //related to attacking
    this.height = 50;
    this.width = 50;
    this.grav = new JSVector(0, 0.2); //gravity for when falling
    this.clr = "green";
    this.bullets = [];
    this.shootingDirection = true; //true = right, false = left
    this.inventory = {
      dbJump: false,
      dbCoin: false,
      dash: false,
      loveRay: false,
      block: false,
      jumpBoost: false,
      invulnerability: false
    };
    this.statusBlock = {
      hp: 100,
      isDead: false,
      coins: 0,
      shots: 10,
      onPlatform: false,
      jumpCount: 0,
      isAttacking: false,
      onCoolDown: false,
      coolDownTimer: 100, // the length of the attack cooldown
      attackTimer: 50, // the length/amount of time that the hero attacks for
      jumpBoostCounter: 0,
      dbCoinCounter: 0,
      dbJumpCounter: 0,
      invulnerabilityCounter: 0,
      powerUpLength: 1000
    };
    this.indc = 0;
  }

  run() {
    this.render();
    this.update();
    // this.attack();
    this.vel.add(this.grav);
    this.loc.add(this.vel);

    if (this.vel.y > 0) {
      this.statusBlock.onPlatform = false;
    }
  }
  render() {
    ctx.save(); // draws the hero
    ctx.beginPath(); //Malcom you need begin path
    //without begin path, it continues to render old boxes so it wont be cleared
    // MY BAD LMAO!
    ctx.font = "50px serif";
    //ctx.fillText(this.statusBlock.hp, this.loc.x, this.loc.y - 20);
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(this.loc.x + this.width, this.loc.y);
    ctx.lineTo(this.loc.x + this.width, this.loc.y + this.height);
    ctx.lineTo(this.loc.x, this.loc.y + this.height);
    ctx.closePath();
    ctx.fillStyle = this.clr;
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(this.loc.x, this.loc.y);
    if (game.clickingA) {
      this.indc = -20;
    }
    if (game.clickingD) {
      this.indc = 20;
    }
    ctx.lineTo(this.loc.x + this.indc, this.loc.y);
    ctx.strokeStyle = "orange";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
  update() {
    //! %%%%%%%%%%%%%%%
    if (this.statusBlock.hp <= 0 || this.loc.y > canvas.height) {
      // the hero "dies" when hp <= 0
      this.statusBlock.isDead = true;
    }

    if (this.statusBlock.isDead) {
      // if the hero is dead it brings you to the start screen (gameState1)
      gameState = 0;
      /**
       *! i have not made this function yet!!!!!
       *TODO im not sure we need to make this function but it might be helpfull
       */
      this.reSetHero();
    }
    //!%%%%%%%%%%%%%%
    if (game.mouseDown && !this.statusBlock.onCoolDown) {
      // attacking if mouse is down and the heros not on cooldown
      this.statusBlock.isAttacking = true;
    } else if (this.statusBlock.onCoolDown) {
      // runs the cooldown timer
      //console.log("onCoolDown (cant attack)")
      this.statusBlock.coolDownTimer--;
    }
    if (this.statusBlock.coolDownTimer <= 0 && this.statusBlock.onCoolDown) {
      // if the cooldown timer is 0 turns cooldown off
      this.statusBlock.onCoolDown = false;
      this.statusBlock.coolDownTimer = 100;
    }
    this.attack();

    //jumpboost timer/color changer
    // let jumpBoostTimer = 1000
    // if (this.inventory.jumpBoost && this.statusBlock.jumpBoostCounter++ >= jumpBoostTimer) {
    //     this.inventory.jumpBoost = false; // removes the jumpboost
    //     this.statusBlock.jumpBoostCounter = 0 // resets the timer.
    // }

    // if (this.inventory.jumpBoost) {
    //     this.clr = "lightblue"
    // } else if (!this.inventory.jumpBoost) {
    //     this.clr = "green"
    // }

    //double jump timer
    if (this.inventory.dbJump) {
      this.clr = "purple";
      this.statusBlock.dbJumpCounter++;
      if (this.statusBlock.dbJumpCounter > this.statusBlock.powerUpLength) {
        this.inventory.dbJump = false;
        this.statusBlock.dbJumpCounter = 0;
        this.clr = "green";
      }
    }

    //double coin timer
    if (this.inventory.dbCoin) {
      this.statusBlock.dbCoinCounter++;
      this.clr = "orange";
      if (this.statusBlock.dbCoinCounter > this.statusBlock.powerUpLength) {
        this.inventory.dbCoin = false;
        this.statusBlock.dbCoinCounter = 0;
        this.clr = "green";
      }
    }

    //invulnerability timer
    if (this.inventory.invulnerability) {
      this.statusBlock.invulnerabilityCounter++;
      this.clr = "#DDDDDD";
      if (this.statusBlock.invulnerabilityCounter > this.statusBlock.powerUpLength) {
        this.inventory.invulnerability = false;
        this.statusBlock.invulnerability = 0;
        this.clr = "green";
      }
    }
    

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].run();
      if (this.bullets[i].isDead) {
        this.bullets.splice(i, 1);
      }
    }
  }

  jump() {
    if (!this.statusBlock.onPlatform && !this.inventory.dbJump) {
      // this checks if you are on a platform and if you have double jump
      return;
    }
    let jumpLimit;
    if (this.inventory.dbJump) {
      jumpLimit = 2;
    } else {
      jumpLimit = 1;
    }

    //! change this later! I set it to a large number just for testing
    //we might not need a jumplimit but its good to have for now
    //jumplimit should be reset when you touch a platform, only alowed to jump as many times as your jumplimit
    if (this.statusBlock.jumpCount < jumpLimit) {
      // stops the velocity of the hero than subtracts 5 and incroments the jumpcount
      this.vel.y = 0; // stops the hero
      this.vel.y -= 8; // pushes the hero up
      this.statusBlock.onPlatform = false; // just an etra test to make sure the hero is not on a platform
      this.statusBlock.jumpCount++;
    }
  }
  attack() {
    this.posNeg = true; //right side
    if (this.cursorLoc.x < this.loc.x) {
      this.posNeg = false; //left side
    }

    if (this.statusBlock.isAttacking && !this.statusBlock.onCoolDown) {
      //console.log("is attacking")
      this.statusBlock.attackTimer--;
      ctx.save();
      ctx.beginPath();
      if (this.posNeg) {
        ctx.moveTo(this.loc.x + 50, this.loc.y + 0); //top left
        ctx.lineTo(this.loc.x + 80, this.loc.y + 0); //top right
        ctx.lineTo(this.loc.x + 80, this.loc.y + this.height); //bottom right
        ctx.lineTo(this.loc.x + 50, this.loc.y + this.height); //bottom left
      } else {
        ctx.moveTo(this.loc.x - 30, this.loc.y + 0); //top left
        ctx.lineTo(this.loc.x + 0, this.loc.y + 0); //top right
        ctx.lineTo(this.loc.x + 0, this.loc.y + this.height); //bottom right
        ctx.lineTo(this.loc.x - 30, this.loc.y + this.height); //bottom left
      }

      ctx.closePath();
      ctx.fillStyle = "darkgreen";
      ctx.strokeStyle = "black";
      ctx.fill();
      ctx.restore();
    }
    if (this.statusBlock.attackTimer <= 0) {
      this.statusBlock.attackTimer = 100;
      this.statusBlock.isAttacking = false;
      this.statusBlock.onCoolDown = true;
    }
  }

  shoot() {
    if (this.indc < 0) {
      this.shootingDirection = true;
    } else if (this.indc > 0) {
      this.shootingDirection = false;
    }

    this.bullets.push(
      new Bullet(this.loc.x, this.loc.y, ctx, this.shootingDirection)
    );
  }

  reSetHero() {
    //TODO im not sure we need this function but it might be usfull in the future
    this.statusBlock.hp = 101;
  }
}
