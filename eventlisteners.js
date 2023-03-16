window.addEventListener("keydown", function (event) {
    switch (event.code) {
        case "KeyA":
            if (!stopMovement) {
                game.clickingA = true;
            }
            break;

        case "KeyD":
            if (!stopMovement) {
                game.clickingD = true
            }
            break;

        case "KeyF":
            game.mouseDown = true;

            break;
        case "Space":
            if (!stopMovement) {
                game.hero.jump();
            }
            break;
    }
}, false);

window.addEventListener("keyup", function (event) {
    switch (event.code) {

        case "KeyA":
            game.clickingA = false;
            break;
        case "KeyD":
            game.clickingD = false;
            break;

        case "KeyF":
            game.mouseDown = false;

            break;
    }
}, false);

window.addEventListener('mousedown', function (event) {
    game.mouseDown = true;
    // game.hero.attack();
    cursor = new JSVector(event.offsetX, event.offsetY);//gets the location of the cursor whenever it is over the canvas
    game.hero.cursorLoc.x = cursor.x + game.camLoc.x;
    game.hero.cursorLoc.y = cursor.y + game.camLoc.y;
}, false);

window.addEventListener("mouseup", function (event) {
    game.mouseDown = false;
}, false);


function debugViewCheckBoxClicked() {
    const checkbox = document.getElementById('DebugViewCheckBox');
    if (checkbox.checked) {
        console.log('Debug View Enabled');
        debugView = true;
        createDebugDOM();
    } else {
        console.log('Debug View Disabled');
        debugView = false;
    }
}

function createDebugDOM() {
    const debugDiv = document.getElementById('debugDiv');

    const playerLoc = document.createElement('p');
    playerLoc.setAttribute('id', 'PlayerLoc');
    debugDiv.appendChild(playerLoc);

    const playerVel = document.createElement('p');
    playerVel.setAttribute('id', 'PlayerVel');
    debugDiv.appendChild(playerVel);

    const playerCursorLoc = document.createElement('p');
    playerCursorLoc.setAttribute('id', 'PlayerCursorLoc');
    debugDiv.appendChild(playerCursorLoc);

    const playerHP = document.createElement('p');
    playerHP.setAttribute('id', 'PlayerHP');
    debugDiv.appendChild(playerHP);

    const playerCoins = document.createElement('p');
    playerCoins.setAttribute('id', 'PlayerCoins');
    debugDiv.appendChild(playerCoins);
}