class Store {
  constructor() {
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

    this.potionSize = 50;
    this.buttons = {
      health: new Button(this.images.potions.health, "Instant Health", { x: canvas.width / 2 + 75, y: canvas.height / 2 - 135 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.healthButtonClicked),
      shield: new Button(this.images.potions.shield, "Instant Shield", { x: canvas.width / 2 + 75 + 75 + 75, y: canvas.height / 2 - 135 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.shieldButtonClicked),
      strength: new Button(this.images.potions.strength, "Boost Strength", { x: canvas.width / 2 - 75, y: canvas.height / 2 - 135 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.strengthButtonClicked),
      invinsibility: new Button(this.images.potions.invinsibility, "Temp Invincibility", { x: canvas.width / 2 - 75 - 75 - 75, y: canvas.height / 2 - 135 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.invinsibilityButtonClicked),
      reach: new Button(this.images.abilities.reach, "Increased Reach", { x: canvas.width / 2 + 75, y: canvas.height / 2 + 75 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.reachButtonClicked),
      regen: new Button(this.images.abilities.regen, "Increased Health", { x: canvas.width / 2 + 75 + 75 + 75, y: canvas.height / 2 + 75 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.regenButtonClicked),
      fortify: new Button(this.images.abilities.fortify, "Increased Shield", { x: canvas.width / 2 - 75, y: canvas.height / 2 + 75 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.fortifyButtonClicked),
      speed: new Button(this.images.abilities.speed, "Increased Speed", { x: canvas.width / 2 - 75 - 75 - 75, y: canvas.height / 2 + 75 + this.potionSize / 2 }, { w: this.potionSize, h: this.potionSize }, this.speedButtonClicked),
    };
  }

  healthButtonClicked() {
    console.log("health button clicked");
  }

  shieldButtonClicked() {
    console.log("shield button clicked");
  }

  strengthButtonClicked() {
    console.log("strength button clicked");
  }

  invinsibilityButtonClicked() {
    console.log("invinsibility button clicked");
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
  constructor(img, title, pos, size, action) {
    this.img = img;
    this.title = title;
    this.pos = pos;
    this.sizeDefault = size;
    this.sizeHover = { w: size.w * 1.1, h: size.h * 1.1 };
    this.size = this.sizeDefault;
    this.action = action;
    this.isClicked = false;
    this.isHovering = false;

    this.init();
  }

  init() {
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
  }

  draw() {
    const xPos = this.pos.x - this.size.w / 2;
    const yPos = this.pos.y - this.size.h / 2;

    ctx.drawImage(this.img, xPos, yPos, this.size.w, this.size.h);

    ctx.font = "18px 'CompassPro'";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeText(this.title, xPos + this.size.w / 2, yPos + this.size.h + 10);
    ctx.fillStyle = "white";
    ctx.fillText(this.title, xPos + this.size.w / 2, yPos + this.size.h + 10);
  }

  update() {
    if (this.isHovering) {
      this.size = this.sizeHover;
    } else {
      this.size = this.sizeDefault;
    }
  }

  run() {
    this.update();
    this.draw();
  }
}
