function GameArea() {
  let playButton = document.getElementById("playButton");
  playButton.addEventListener("click", () => {
    gameState = 1;
    console.log("gameState = 1!!!");
    game.hero.loc.x = 200;
    game.hero.loc.y = 200;
    game.hero.vel.setMagnitude(0);
    stopMovement = false;
    unselectButton(playButton);
  });
}
