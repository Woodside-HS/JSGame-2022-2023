class Hero {
  constructor(x, y) {
    this.showHitbox = false;
    this.loc = new JSVector(x, y); //ideally loc would only be a y value for how far up the screen they are
    this.vel = new JSVector(0, 0);
    this.posNeg = true; //related to attacking
    this.height = 50;
    this.width = 50;
    this.grav = new JSVector(0, 0.2); //gravity for when falling
    this.clr = "green";
    this.bullets = [];
    this.shootingDirection = false; //true = right, false = left
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
      isThrowing: false,
      isFalling: false,
      isJumping: false,
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

    //image stuff
    this.timeSinceMoved = 0;
    this.frameNum = 0;
    this.changeFrame = 0;
    this.heroFall = [];
    this.heroMove = [];
    this.heroJump = [];
    this.heroThrow = [];
    this.heroIdle = [];
    this.loadImages();
  }

  run() {
    this.checkFace();
    this.render();
    this.update();
    this.vel.add(this.grav);
    this.loc.add(this.vel);

    if (this.vel.y > 0) {
      this.statusBlock.onPlatform = false;
    }
  }
  loadImages() {
    for (let i = 0; i < 16; i++) {
      //the 9 has to be hardcoded inn
      this.heroMove[i] = document.createElement("img");
      this.heroMove[i].src = "Images/Hero/HeroMove/hero" + (i + 1) + ".png";
    }
    for (let i = 0; i < 14; i++) {
      this.heroThrow[i] = document.createElement("img");
      this.heroThrow[i].src = "Images/Hero/HeroThrow/hero" + (i + 1) + ".png";
    }
    for (let i = 0; i < 15; i++) {
      this.heroJump[i] = document.createElement("img");
      this.heroJump[i].src = "Images/Hero/HeroJump/hero" + (i + 1) + ".png";
    }
    for (let i = 0; i < 6; i++) {
      this.heroFall[i] = document.createElement("img");
      this.heroFall[i].src = "Images/Hero/HeroFall/hero" + (i + 1) + ".png";
    }
  }
  checkFace() {
    //this is the code that checks if the hero is moving or not, is used to determine if hero should be idle
    if (!game.clickingA && !game.clickingD) {
      this.timeSinceMoved++;
    } else {
      this.timeSinceMoved = 0;
    }
    if (this.timeSinceMoved > 5) {
      this.statusBlock.isMoving = false;
    } else {
      this.statusBlock.isMoving = true;
    }
    //checks which side the hero was last facing, for attacking and throwing
    if (game.clickingA) {
      this.posNeg = true;
    } else if (game.clickingD) {
      this.posNeg = false;
    }
    if (this.vel.y > 0) {
      this.statusBlock.isFalling = true;
      this.statusBlock.isJumping = false;//cuts the jump anim early
      //console.log("falling");
    } else {
      this.statusBlock.isFalling = false;
    }
  }
  render() {
    switch (true) {
      //checks if any of the following values are true, if so runs them
      case this.statusBlock.isAttacking:
        console.log("renderding Attack");
        break;
      //! END OF ATTACKING
      case this.statusBlock.isShooting:
        this.changeFrame++;
        console.log("throwing" + this.frameNum);
        if (this.changeFrame >= 2) {
          this.changeFrame = 0;
          this.frameNum++;
        }
        if (this.frameNum >= 13) {
          this.statusBlock.isShooting = false;
        }
        if (game.clickingD || !this.posNeg) {
          ctx.drawImage(this.heroThrow[this.frameNum], this.loc.x, this.loc.y + game.camLoc.y, this.width, this.height);
        } else if (game.clickingA || this.posNeg) {
          ctx.save();//this code flips the character if the character is facing right
          ctx.translate(this.loc.x, this.loc.y + game.camLoc.y);
          ctx.scale(-1, 1);
          ctx.drawImage(this.heroThrow[this.frameNum], -this.width, 0, this.width, this.height);
          ctx.restore();
        } else {
          ctx.drawImage(this.heroThrow[this.frameNum], this.loc.x, this.loc.y + game.camLoc.y, this.width, this.height);
        }
        break;
      //! END OF THROWING
      case this.statusBlock.isJumping:
        this.changeFrame++;
        //console.log("jumping"+ this.frameNum);
        if (this.changeFrame >= 4) {
          this.changeFrame = 0;
          this.frameNum++;
        }
        if (this.frameNum >= 14) {
          this.statusBlock.isJumping = false;
        }
        if (game.clickingD || !this.posNeg) {
          ctx.drawImage(this.heroJump[this.frameNum], this.loc.x, this.loc.y + game.camLoc.y, this.width, this.height);
        } else if (game.clickingA || this.posNeg) {
          ctx.save();//this code flips the character if the character is facing right
          ctx.translate(this.loc.x, this.loc.y + game.camLoc.y);
          ctx.scale(-1, 1);
          ctx.drawImage(this.heroJump[this.frameNum], -this.width, 0, this.width, this.height);
          ctx.restore();
        } else {
          ctx.drawImage(this.heroJump[this.frameNum], this.loc.x, this.loc.y + game.camLoc.y, this.width, this.height);
        }
        //console.log("jumping");
        break;
      //! END OF JUMPING
      case this.statusBlock.isFalling:
        this.changeFrame++;
        // console.log("falling"+ this.frameNum);
        if (this.changeFrame >= 4) {
          this.changeFrame = 0;
          this.frameNum++;
        }
        if (this.frameNum >= 5) {
          this.frameNum = 0;
        }
        if (game.clickingD || !this.posNeg) {
          ctx.drawImage(this.heroFall[this.frameNum], this.loc.x, this.loc.y + game.camLoc.y, this.width, this.height);
        } else if (game.clickingA || this.posNeg) {
          ctx.save();//this code flips the character if the character is facing right
          ctx.translate(this.loc.x, this.loc.y + game.camLoc.y);
          ctx.scale(-1, 1);
          ctx.drawImage(this.heroFall[this.frameNum], -this.width, 0, this.width, this.height);
          ctx.restore();
        } else {
          ctx.drawImage(this.heroFall[this.frameNum], this.loc.x, this.loc.y + game.camLoc.y, this.width, this.height);
        }


        break;
      //! END OF FALLING
      case this.statusBlock.isMoving:
        this.changeFrame++;
        if (this.frameNum >= this.heroMove.length - 1) {
          this.frameNum = 1;
        }
        if (this.changeFrame >= 3) {//changes the current imge after certain number of frames passes
          this.changeFrame = 0;
          this.frameNum++;
        }
        //swaps the hero's location when moving in another direction
        if (game.clickingD) {
          ctx.drawImage(this.heroMove[this.frameNum], this.loc.x, this.loc.y + game.camLoc.y, this.width, this.height);
        } else if (game.clickingA) {
          ctx.save();//this code flips the character if the character is facing right
          ctx.translate(this.loc.x, this.loc.y + game.camLoc.y);
          ctx.scale(-1, 1);
          ctx.drawImage(this.heroMove[this.frameNum], -this.width, 0, this.width, this.height);
          ctx.restore();
        } else {
          ctx.drawImage(this.heroMove[this.frameNum], this.loc.x, this.loc.y + game.camLoc.y, this.width, this.height);
        }
        break;
      //! END OF MOVING
      default:
        //the "else" condition

        //I give up
        if (this.posNeg && this.timeSinceMoved >= 6) {
          //checks if hero is facing right 
          ctx.save();//this code flips the character if the character is facing right
          ctx.translate(this.loc.x, this.loc.y + game.camLoc.y);
          ctx.scale(-1, 1);
          ctx.drawImage(this.heroJump[0], -this.width, 0, this.width, this.height);
          ctx.restore();
        } else if (!this.posNeg && this.timeSinceMoved >= 1) {
          ctx.drawImage(this.heroJump[0], this.loc.x, this.loc.y + game.camLoc.y, this.width, this.height);
        }

    }
    //TODO need a way to display powerups, maybe topleft of screen
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
      this.statusBlock.coolDownTimer--;
    }
    if (this.statusBlock.coolDownTimer <= 0 && this.statusBlock.onCoolDown) {
      // if the cooldown timer is 0 turns cooldown off
      this.statusBlock.onCoolDown = false;
      this.statusBlock.coolDownTimer = 100;
    }
    this.attack();
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
    this.statusBlock.isJumping = true;
    this.changeFrame = 0;//TODO need somewhere to reset changeFrame and Frame Num everytime we swap to a dif animation but this is Temp
    this.frameNum = 1;
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
    if (this.statusBlock.isAttacking && !this.statusBlock.onCoolDown) {
      this.statusBlock.attackTimer--;
      ctx.beginPath();
      if (!this.posNeg) {
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
    }
    if (this.statusBlock.attackTimer <= 0) {
      this.statusBlock.attackTimer = 100;
      this.statusBlock.isAttacking = false;
      this.statusBlock.onCoolDown = true;
    }
  }

  shoot() {
    if (this.posNeg) {
      this.shootingDirection = true;
    } else if (!this.posNeg) {
      this.shootingDirection = false;
    }
    this.bullets.push(new Bullet(this.loc.x, this.loc.y - (this.height / 2), ctx, this.shootingDirection));
    this.statusBlock.isShooting = true;
    this.changeFrame = 0;//TODO need somewhere to reset changeFrame and Frame Num everytime we swap to a dif animation but this is Temp
    this.frameNum = 1;
  }

  reSetHero() {
    //TODO im not sure we need this function but it might be usfull in the future
    this.statusBlock.hp = 101;
  }
}
