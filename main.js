
//Global
let world;
let h1;
window.onload = init;


function init(){
    world = new World();
    h1= new Hero(5, world.ctx);
    animate();
}

function animate(){
  world.run();
  h1.run();
  requestAnimationFrame(animate);
}
