const keyDownActions = {
  // Optimized keydown actions using arrow functions
  KeyA: () => {
    if (!stopMovement) game.clickingA = true;
  },
  KeyD: () => {
    if (!stopMovement) game.clickingD = true;
  },
  KeyF: () => {
    game.mouseDown = true;
  },
  Space: () => {
    if (!stopMovement) {
      if (!game.flight) {
        game.hero.jump();
      }
      else {
        game.clickingSpace = true;
      }
    }
  },
  KeyP: () => {
    game.hero.shoot();
  },
  KeyB: () => {
    console.log("Bed");
    game.levels[0].resources[2].purchase();
  },
};

const keyUpActions = {
  // Optimized keyup actions using arrow functions
  KeyA: () => {
    game.clickingA = false;
  },
  KeyD: () => {
    game.clickingD = false;
  },
  KeyF: () => {
    game.mouseDown = false;
  },
  Space: () => {
    if (game.flight) {
      game.clickingSpace = false;
    }
  }
};

window.addEventListener(
  "keydown",
  function (event) {
    const action = keyDownActions[event.code];
    if (action) {
      action();
    }
  },
  false
);

window.addEventListener(
  "keyup",
  function (event) {
    const action = keyUpActions[event.code];
    if (action) {
      action();
    }
  },
  false
);

window.addEventListener(
  "mousedown",
  function (event) {
    game.mouseDown = true;
  },
  false
);

window.addEventListener(
  "mouseup",
  function (event) {
    game.mouseDown = false;
  },
  false
);


window.addEventListener("keydown", function (event) {
  if (event.code === "KeyN") {
    game.debugView = !game.debugView;
  }
});


function debugViewCheckBoxClicked() {
  // Optimized debug view checkbox clicked using ternary functions
  const { checked } = document.getElementById("DebugViewCheckBox");
  console.log(`Debug View ${checked ? "Enabled" : "Disabled"}`);
  debugView = checked;
  if (checked) {
    createDebugDOM();
  }
}

function createDebugDOM() {
  // Optimized function to create the DOM for the debug view through looping through an array of properties
  const debugDiv = document.getElementById("debugDiv");
  const elementIds = [
    "PlayerLoc",
    "PlayerVel",
    "PlayerCursorLoc",
    "PlayerHP",
    "PlayerCoins",
  ];

  elementIds.forEach((id) => {
    const element = document.createElement("p");
    element.id = id;
    debugDiv.appendChild(element);
  });
}

