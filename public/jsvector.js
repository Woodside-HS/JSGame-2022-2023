// JSVector -- a Javascript 2D vector class

// The class constructor
function JSVector(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

// Set the magnitude of the vector,
// retaining the angle (direction).
JSVector.prototype.setMagnitude = function (mag) {
  let dir = this.getDirection();
  this.x = Math.cos(dir) * mag;
  this.y = Math.sin(dir) * mag;
  return this;
};

// Get the magnitude of the vector using pythagorean theorem
JSVector.prototype.getMagnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

// Set the angle (direction) of the vector,
// retaining the magnitude.
JSVector.prototype.setDirection = function (angle) {
  let mag = this.getMagnitude();
  this.x = Math.cos(angle) * mag;
  this.y = Math.sin(angle) * mag;
  return this;
};

// Get the direction (angle) of the vector
JSVector.prototype.getDirection = function () {
  return Math.atan2(this.y, this.x);
};

// Zero the vector
JSVector.prototype.Zero = function () {
  this.x = 0;
  this.y = 0;
  return this;
};

// Add another vector to this vector
JSVector.prototype.add = function (v2) {
  this.x += v2.x;
  this.y += v2.y;
  return this;
};

// Subtract another vector from this vector
JSVector.prototype.sub = function (v2) {
  this.x -= v2.x;
  this.y -= v2.y;
  return this;
};

// Class method to return a new vector that is the sum of two vectors
JSVector.addGetNew = function (v1, v2) {
  return new JSVector(v1.x + v2.x, v1.y + v2.y);
};

// Class method to return a new vector that is the difference of two vectors
JSVector.subGetNew = function (v1, v2) {
  return new JSVector(v1.x - v2.x, v1.y - v2.y);
};

// Multiply this vector by a scalar
JSVector.prototype.multiply = function (scalar) {
  this.x *= scalar;
  this.y *= scalar;
  return this;
};

// Divide this vector by a scalar
JSVector.prototype.divide = function (scalar) {
  this.x /= scalar;
  this.y /= scalar;
  return this;
};

// Normalize this vector so that it has a magnitude of 1
JSVector.prototype.normalize = function () {
  let dir = this.getDirection();
  this.x = Math.cos(dir);
  this.y = Math.sin(dir);
  return this;
};

// Limit the magnitude of this vector
JSVector.prototype.limit = function (lim) {
  let mag = this.getMagnitude();
  if (mag > lim) this.setMagnitude(lim);
  return this;
};

// Get the distance between this vector and another one
JSVector.prototype.distance = function (v2) {
  return Math.sqrt(this.distanceSquared(v2));
};

// Get square of the distance between this vector and another one
JSVector.prototype.distanceSquared = function (v2) {
  let v = JSVector.subGetNew(this, v2);
  return v.x * v.x + v.y * v.y;
};

// Rotate this vector by some number of radians
// using the rotation matrix |  cos   -sin  |
//                           |  sin   +cos  |
JSVector.prototype.rotate = function (angle) {
  const { x, y } = this;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  this.x = x * cos - y * sin;
  this.y = x * sin + y * cos;
  return this;
};

// Get the angle between this vector and another one
JSVector.prototype.angleBetween = function (v2) {
  return Math.abs(this.getDirection() - v2.getDirection());
};

// Make a copy of this vector
JSVector.prototype.copy = function () {
  return new JSVector(this.x, this.y);
};

// Override inherited toString() to describe this instance
JSVector.prototype.toString = function () {
  var x = this.x.toFixed(2);
  var y = this.y.toFixed(2);
  var m = this.getMagnitude().toFixed(2);
  var a = this.getDirection().toFixed(2);

  return "x:" + x + ", y: " + y + ", mag: " + m + ", a: " + a;
};
