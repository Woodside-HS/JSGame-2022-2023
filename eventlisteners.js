window.addEventListener("keydown", function (event) {
    switch (event.code) {
        case "KeyA":
            game.clickingA = true;
            break;

        case "KeyD":
            game.clickingD = true
            break;

        case "KeyF":
            game.mouseDown = true;

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

        case "KeyF":
            game.mouseDown = false;

            break;
    }
}, false);

// window.addEventListener('mousedown', function (event) {
//     game.mouseDown = true;
//     // game.hero.attack();
// }, false);

// window.addEventListener("mouseup", function (event) {
//     game.mouseDown = false;
// }, false);
