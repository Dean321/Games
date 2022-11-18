class Cannon {
  constructor(x, y, w, h, a) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.cannonBaseImg = loadImage("./assets/cannon_base.png");
    this.cannonImg = loadImage("./assets/CANON.png");
    this.angle = a;
  }

  display() {
    if (keyIsDown(RIGHT_ARROW) && this.angle < 70) {
      this.angle += 1;
    }
    if (keyIsDown(LEFT_ARROW) && this.angle > -30) {
      this.angle -= 1;
    }
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.cannonImg, 0, 0, this.w, this.h);
    pop();
    image(this.cannonBaseImg, 185, 130, 248, 190);
  }
}
