window.addEventListener("keydown", function (event) {
    switch (event.code) {
        case "KeyA":
            game.clickingA = true;
            break;

        case "KeyD":
            game.clickingD = true
            break;

        case "KeyQ":

            break;
        case "Space":
            game.hero.jump();
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

        case "KeyQ":
            break;
    }
}, false);

window.addEventListener('mousedown', function (event) {
    game.mouseDown = true;
    // game.hero.attack();
    cursor = new JSVector(event.offsetX, event.offsetY);//gets the location of the cursor whenever it is over the canvas
    game.hero.cursorLoc.x = cursor.x+game.camLoc.x;
    game.hero.cursorLoc.y = cursor.y+game.camLoc.y;
}, false);

window.addEventListener("mouseup", function (event) {
    game.mouseDown = false;
}, false);
