// Get random hex color
function getRandomColorHex() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Get random RGB color
function getRandomColorRGB() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

// Lerp function
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Get random number between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get random number
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Check if 2 objects are colliding
function isColliding(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

// Load Image as object
function loadImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

// Play sound
function playSound(src) {
  const audio = new Audio(src);
  audio.play();
}

// Map Value
function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}

function drawText(context, text, font, x, y, fill, stroke) {
  context.font = font;
  context.fillStyle = fill;
  context.strokeStyle = stroke;
  context.fillText(text, x, y);
  context.fill();
  context.stroke();
}
