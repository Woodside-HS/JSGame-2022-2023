//Global
let world;
let hero;
let coinCount = 0;
window.onload = init;


function init(){
    world = new World();
    hero = new Hero(7, world.ctx);
    animate();
}

function animate(){
  world.run();
  requestAnimationFrame(animate);
}



function displayCoinCount() {
  const coinCountElement = document.getElementById('coin-count');
  coinCountElement.innerHTML = coinCount.toString();
}



