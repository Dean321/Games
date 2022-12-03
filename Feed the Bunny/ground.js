class Ground {
  constructor(x, y, w, h) {
    this.body = Matter.Bodies.rectangle(x, y, w, h, {
      isStatic: true,
    });
    this.w = w;
    this.h = h;
    Matter.World.add(myWorld, this.body);
  }
  display() {
    push();
    noStroke();
    fill("brown");
    rect(this.body.position.x,  this.body.position.y, this.w, this.h);
    pop();
  }
}
