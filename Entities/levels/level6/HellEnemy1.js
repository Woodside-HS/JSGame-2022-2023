class Boid {
  constructor(x, y, speed, angle) {
    this.position = new JSVector(x, y);
    this.velocity = JSVector.fromAngle(angle, speed);
    this.maxSpeed = speed;
    this.maxForce = 0.05;
    this.viewRadius = 50;
  }

  update(flock) {
    const { alignment, cohesion, separation } = this.calculateFlockForces(flock);

    // Weight these forces. Feel free to experiment with different weightings
    this.applyForce(alignment.multiply(1));
    this.applyForce(cohesion.multiply(1));
    this.applyForce(separation.multiply(1.5));

    this.position.add(this.velocity);
    this.velocity.limit(this.maxSpeed);
  }

  calculateFlockForces(flock) {
    const alignment = new JSVector(0, 0);
    const cohesion = new JSVector(0, 0);
    const separation = new JSVector(0, 0);
    let count = 0;

    for (let boid of flock.boids) {
      const distance = this.position.distance(boid.position);

      if (distance > 0 && distance < this.viewRadius) {
        alignment.add(boid.velocity);
        cohesion.add(boid.position);
        const diff = JSVector.subGetNew(this.position, boid.position).normalize().divide(distance);
        separation.add(diff);
        count++;
      }
    }

    if (count > 0) {
      alignment.divide(count).normalize().multiply(this.maxSpeed).sub(this.velocity).limit(this.maxForce);
      cohesion.divide(count).sub(this.position).normalize().multiply(this.maxSpeed).sub(this.velocity).limit(this.maxForce);
      separation.divide(count).normalize().multiply(this.maxSpeed).sub(this.velocity).limit(this.maxForce);
    }

    return { alignment, cohesion, separation };
  }

  applyForce(force) {
    this.velocity.add(force);
  }

  render() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Flock {
  constructor() {
    this.boids = [];
  }

  addBoid(boid) {
    this.boids.push(boid);
  }

  run() {
    for (let boid of this.boids) {
      boid.update(this);
      boid.render();
    }
  }
}
