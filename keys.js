//Smooth movement
//Keydown listeners
window.addEventListener("keydown", function (event) {
    switch (event.code) {
        case "KeyA":
            world.worldMovingLeft = true;
            //world.heroMovingLeft = true;
            if ((world.cnvLoc.x > world.dims.left) && world.worldMovingLeft == true)
                world.cnvLoc.x -= 5;
                //world.hero.loc.x -= 5;
          break;
        case "KeyD":
            world.worldMovingRight = true;
            //world.heroMovingRight = true;
            if ((world.cnvLoc.x + world.cnv.width < world.dims.right) && world.worldMovingRight == true)
                world.cnvLoc.x += 5;
                //world.hero.loc.x += 5;
          break;
        
    }
}, false);

//Keyup listeners
window.addEventListener("keyup", function (event) {
    switch (event.code) {
        case "KeyA":
            
            world.worldMovingLeft = false;
            //world.heroMovingLeft = false
            break;
        case "KeyD":
          
           world.worldMovingRight = false;
           //world.heroMovingLeft = false
            break;
    }
}, false);

window.addEventListener("keypress", function (event) {
    switch (event.code) {
      case "Space":
        hero.jump();
        break;
      
    }
  }, false);