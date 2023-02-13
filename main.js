
//Global
let world;
window.onload = init;
let platforms = [];

function init(){
    world = new World();
    animate();
}

function animate(){
  world.run();
  requestAnimationFrame(animate);
}
