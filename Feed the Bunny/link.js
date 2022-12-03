class Link {
  constructor(bodyA, bodyB) {
    /**
     * The constraint is going to be between 2 bodies, the last body (rectangle)
     * of the rope and the fruit body.
     *
     * That is why in the link class when we write the constructor we need to
     * keep 2 parameters as bodyA and bodyB.
     *
     * We want to connect the fruit body at the last rectangle of the rope.
     * So we will create a variable to get the index of the last rectangle(or
     * element, composite can be assumed like an array) That will be
     * var lastlink = bodyA.body.bodies.length-2
     *
     * The last element will be 2 less than the length because the index always
     * starts from 0, and we also added fruit in the composite that increases
     * the length 1. So to get the last element index we need to subtract the
     * 2 from the length.
     */
    var lastlink = bodyA.body.bodies.length - 2;
    this.link = Matter.Constraint.create({
      bodyA: bodyA.body.bodies[lastlink],
      // pointA: { x: 0, y: 0 },
      bodyB: bodyB,
      // pointB: { x: 0, y: 0 },
      length: -10,
      stiffness: 0.01,
    });
    Matter.World.add(myWorld, this.link);
  }
  detach() {
    Matter.World.remove(myWorld, this.link);
  }
}
