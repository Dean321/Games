class CannonBall {
  constructor(x, y) {
    this.r = 15;
    this.img = loadImage("./assets/cannonball.png");
    this.speed = 0.05;
    this.animation = [this.img];
    this.isSink = false;
    this.body = Matter.Bodies.circle(x, y, this.r, { isStatic: true });
    Matter.World.add(myWorld, this.body);
    this.path = [];
  }

  display() {
    var index = floor(this.speed % this.animation.length);
    if (
      this.body.velocity.x > 0 &&
      this.body.position.x > 300 &&
      !this.isSink
    ) {
      this.path.push([this.body.position.x, this.body.position.y]);
    }
    if (this.body.position.x > 260)
      image(
        this.animation[index],
        this.body.position.x,
        this.body.position.y,
        this.r * 2,
        this.r * 2
      );

    for (var i = 0; i < this.path.length; i++) {
      image(this.img, this.path[i][0], this.path[i][1], 5, 5);
    }
  }

  shoot() {
    var a = cannon.angle - 28;
    a = a * (3.14 / 180);
    /**
     * p5.Vector.fromAngle
     * this function by default accepts the angle in radians
     * but The angle we are providing is on degrees as our angle
     * mode is in degrees, in order to pass the angle value to this
     * function we need to convert angle to radians. That is done by
     * multiplying the angle value with (pi/180) which is (3.14/180).
     */
    var v = p5.Vector.fromAngle(a);
    v.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    /**
     * in the setVelocity() function the angle is in radians,
     * but we need to convert that into degrees by multiplying
     * with (180/pi) which is (180/3.14)
     */
    Matter.Body.setVelocity(this.body, {
      x: v.x * (180 / 3.14),
      y: v.y * (180 / 3.14),
    });
  }

  animate() {
    this.speed += 0.05;
  }

  remove(i) {
    this.isSink = true;
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    this.animation = waterAnimation;
    this.speed = 0.05;
    this.r = 50;
    setTimeout(() => {
      Matter.World.remove(myWorld, this.body);
      delete cannonBalls[i];
    }, 1000);
  }
}
