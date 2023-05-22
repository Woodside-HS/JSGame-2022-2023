class Store {
  constructor() {
    this.player = null;
    this.images = {
      background: newImage("Images/Level6/storeBG.png"),
      potions: {
        health: newImage("Images/Level6/Potions/Health.png"),
        shield: newImage("Images/Level6/Potions/Shield.png"),
        strength: newImage("Images/Level6/Potions/Strength.png"),
        invinsibility: newImage("Images/Level6/Potions/Invinsibility.png"),
      },
      abilities: {
        reach: newImage("Images/Level6/Potions/Gloves.png"),
        regen: newImage("Images/Level6/Potions/Hat.png"),
        fortify: newImage("Images/Level6/Potions/Armor.png"),
        speed: newImage("Images/Level6/Potions/Boots.png"),
      },
    };

    this.costs = {
      health: 10,
      shield: 10,
      strength: 15,
      invinsibility: 15,
      reach: 30,
      regen: 100,
      fortify: 10,
      speed: 60,
    };

    this.potionSize = 50;
    this.buttons = {
      health: new Button(this.images.potions.health, "Instant Health", "10", { x: canvas.width / 2 + 75, y: canvas.height / 2 - 135 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.healthButtonClicked.bind(this)),
      shield: new Button(this.images.potions.shield, "Instant Shield", "10", { x: canvas.width / 2 + 75 + 75 + 75, y: canvas.height / 2 - 135 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.shieldButtonClicked.bind(this)),
      strength: new Button(this.images.potions.strength, "Boost Strength", "15", { x: canvas.width / 2 - 75, y: canvas.height / 2 - 135 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.strengthButtonClicked.bind(this)),
      invinsibility: new Button(this.images.potions.invinsibility, "Temp Invincibility", "15", { x: canvas.width / 2 - 75 - 75 - 75, y: canvas.height / 2 - 135 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.invinsibilityButtonClicked.bind(this)),
      reach: new Button(this.images.abilities.reach, "Increased Reach", "30", { x: canvas.width / 2 + 75, y: canvas.height / 2 + 75 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.reachButtonClicked),
      regen: new Button(this.images.abilities.regen, "Increased Health", "100", { x: canvas.width / 2 + 75 + 75 + 75, y: canvas.height / 2 + 75 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.regenButtonClicked),
      fortify: new Button(this.images.abilities.fortify, "Increased Shield", "10", { x: canvas.width / 2 - 75, y: canvas.height / 2 + 75 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.fortifyButtonClicked),
      speed: new Button(this.images.abilities.speed, "Increased Speed", "60", { x: canvas.width / 2 - 75 - 75 - 75, y: canvas.height / 2 + 75 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.speedButtonClicked),
    };
  }

  assignPlayer(player) {
    this.player = player;
  }

  healthButtonClicked() {
    if (this.player) {
      if (this.player.mana >= this.costs.health) {
        this.player.powerUp.temp.health++;
        this.player.mana -= this.costs.health;
      }
    }
  }

  shieldButtonClicked() {
    if (this.player) {
      if (this.player.mana >= this.costs.shield) {
        this.player.powerUp.temp.shield++;
        this.player.mana -= this.costs.shield;
      }
    }
  }

  strengthButtonClicked() {
    if (this.player) {
      if (this.player.mana >= this.costs.strength) {
        this.player.powerUp.temp.strength++;
        this.player.mana -= this.costs.strength;
      }
    }
  }

  invinsibilityButtonClicked() {
    if (this.player) {
      if (this.player.mana >= this.costs.invinsibility) {
        this.player.powerUp.temp.invinsibility++;
        this.player.mana -= this.costs.invinsibility;
      }
    }
  }

  reachButtonClicked() {
    console.log("reach button clicked");
  }

  regenButtonClicked() {
    console.log("regen button clicked");
  }

  fortifyButtonClicked() {
    console.log("fortify button clicked");
  }

  speedButtonClicked() {
    console.log("speed button clicked");
  }

  update() {}

  draw() {
    this.drawBackground();
    ctx.font = "100px 'CompassPro'";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 7;
    ctx.strokeText("STORE", canvas.width / 2, 50);
    ctx.fillStyle = "white";
    ctx.fillText("STORE", canvas.width / 2, 50);
    this.drawCoins();
    this.drawProducts();
  }

  drawCoins() {}

  drawProducts() {
    for (let button in this.buttons) {
      this.buttons[button].run();
    }
  }

  drawBackground() {
    ctx.drawImage(this.images.background, 0, 0, canvas.width, canvas.height);
  }

  run() {
    this.update();
    this.draw();
  }
}

class Button {
  constructor(img, title, cost, pos, size, action) {
    this.img = img;
    this.imgHover = this.createHoverImage(img);
    this.title = title;
    this.cost = cost;
    this.pos = pos;
    this.sizeDefault = size;
    this.sizeHover = { w: size.w * 1.1, h: size.h * 1.1 };
    this.size = this.sizeDefault;
    this.action = action;
    this.isClicked = false;
    this.isHovering = false;
    this.isInit = false;
    this.init();
  }

  init() {
    if (!this.isInit) {
      console.log("init");
      canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= this.pos.x - this.size.w / 2 && x <= this.pos.x + this.size.w / 2 && y >= this.pos.y - this.size.h / 2 && y <= this.pos.y + this.size.h / 2) {
          this.isClicked = true;
          this.action();
        } else {
          this.isClicked = false;
        }
      });

      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= this.pos.x - this.size.w / 2 && x <= this.pos.x + this.size.w / 2 && y >= this.pos.y - this.size.h / 2 && y <= this.pos.y + this.size.h / 2) {
          this.isHovering = true;
        } else {
          this.isHovering = false;
        }
      });
      this.isInit = true;
    }
  }

  createHoverImage(img) {
    let hoverImg = new Image();
    hoverImg.src = img.src;

    hoverImg.width = img.width * 1.1;
    hoverImg.height = img.height * 1.1;

    return hoverImg;
  }

  draw() {
    const xPos = this.pos.x - this.size.w / 2;
    const yPos = this.pos.y - this.size.h / 2;

    let imageToDraw = this.isHovering ? this.imgHover : this.img;
    //let imgWidth = this.isHovering ? this.sizeHover.w : this.size.w;
    //let imgHeight = this.isHovering ? this.sizeHover.h : this.size.h;
    ctx.drawImage(imageToDraw, xPos, yPos, imgWidth, imgHeight);

    ctx.font = "18px 'CompassPro'";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeText(this.title, xPos + this.size.w / 2, yPos + this.size.h + 10);
    ctx.fillStyle = "white";
    ctx.fillText(this.title, xPos + this.size.w / 2, yPos + this.size.h + 10);

    ctx.font = "20px 'CompassPro'";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeText("[" + this.cost + " Mana]", xPos + this.size.w / 2, yPos - 20);
    ctx.fillStyle = "white";
    ctx.fillText("[" + this.cost + " Mana]", xPos + this.size.w / 2, yPos - 20);
  }

  run() {
    this.draw();
  }
}
