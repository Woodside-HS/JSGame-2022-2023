//Global
let world;
let hero;
window.onload = init;


function init(){
    world = new World();
    hero = new Hero(5, world.ctx);
    animate();
}

function animate(){
  world.run();
  hero.run();
  requestAnimationFrame(animate);
}