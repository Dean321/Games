class Rope {
  constructor(nlink, pointA) {
    /**
     * nlinks - number of links 
     * pointA - points of connection.
     */
    this.nlink = nlink;
    /**
     * Matter.Body.nextGroup([isNonColliding=false]) → Number
     * Returns the next unique group index for which bodies will
     * collide. If isNonColliding is true, returns the next unique 
     * group index for which bodies will not collide. 
     */
    const group = Matter.Body.nextGroup(true);
    /**
     * Using Composites.stack() function we create the multiple 
     * rectangular bodies and store it in the rects variable.
     * 
     * Create a new composite containing bodies created in the 
     * callback in a grid arrangement. This function uses the 
     * body's bounds to prevent overlaps.
     * Parameters
     * xx Number
     * yy Number
     * columns Number
     * rows Number
     * columnGap Number
     * rowGap Number
     * callback Function
     */
    const rects = Matter.Composites.stack(
      100,
      100,
      this.nlink,
      1,
      5,
      5,
      function (x, y) {
        return Matter.Bodies.rectangle(x, y, 30, 5, {
          collisionFilter: { group: group },
          /**
           * Collisions between two bodies will obey the following rules:
           * If the two bodies have the same non-zero value of collisionFilter.group, 
           * they will always collide if the value is positive, and they will never 
           * collide if the value is negative.
           * 
           * If the two bodies have different values of collisionFilter.group or 
           * if one (or both) of the bodies has a value of 0, then the 
           * category/mask rules apply as follows:
           *      Each body belongs to a collision category, given by collisionFilter.category. 
           *      This value is used as a bit field and the category should have only one bit
           *      set, meaning that the value of this property is a power of two in the range
           *      [1, 2^31]. Thus, there are 32 different collision categories available.
           * 
           *      Each body also defines a collision bitmask, given by collisionFilter.mask 
           *      which specifies the categories it collides with (the value is the bitwise 
           *      AND value of all these categories).
           * Using the category/mask rules, two bodies A and B collide if each includes the 
           * other's category in its mask, i.e. (categoryA & maskB) !== 0 and (categoryB & 
           * maskA) !== 0 are both true.
           */
        });
      }
    );

    this.pointA = pointA;
    /**
     * Using the Composites.chain() 
     * function we create the chain of the rectangles.
     * Chains all bodies in the given composite together using constraints.
     * Parameters
     *    composite Composite
     *    xOffsetA Number
     *    yOffsetA Number
     *    xOffsetB Number
     *    yOffsetB Number
     *    options Object
     */
    this.body = Matter.Composites.chain(rects, 0.1, 0, -0.6, 0, {
      stiffness: 0.1,
      length: 0.1,
      render: { type: "line" },
    });

    Matter.World.add(myWorld, this.body);
    /**
     * And then using the Constraints.create() we add the 
     * constraints to the chain which connects all the bodies 
     * of the chain together like we have string in a necklace.
     * 
     * Matter.Composite.add(composite, object) → Composite
     * Generic single or multi-add function. Adds a single or an array of 
     * body(s), constraint(s) or composite(s) to the given composite. 
     * Triggers beforeAdd and afterAdd events on the composite.
     *
     */
    Matter.Composite.add(
      rects,
      Matter.Constraint.create({
        pointA: this.pointA,
        bodyB: rects.bodies[0],
        pointB: { x: -25, y: 0 },
        length: 10,
        stiffness: 0.1,
      })
    );
  }

  break() {
    /**
     * We have the break() function which helps us to 
     * break the chain.It simply makes the rope body null.
     * For our code we are only going to use the rope.js to 
     * create the rope and break() function to break the rope 
     * when the user clicks on the cut button(which will be added
     * in upcoming classes).
     */
    this.body = null;
  }

  show() {
    if (this.body != null) {
      for (let i = 0; i < this.body.bodies.length - 1; i++) {
        this.drawVertices(this.body.bodies[i].vertices);
      }
    }
  }

  drawVertices(vertices) {
    beginShape();
    fill("#FFF717");
    noStroke();

    for (let i = 0; i < vertices.length; i++) {
      vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
  }

  showConstraints(constraints) {
    if (constraints != null) {
      for (let i = 0; i < constraints.length; i++) {
        this.drawConstraint(constraints[i]);
      }
    }
  }

  drawConstraint(constraint) {
    if (constraint != null) {
      const offsetA = constraint.pointA;
      let posA = { x: 0, y: 0 };
      if (constraint.bodyA) {
        posA = constraint.bodyA.position;
      }
      const offsetB = constraint.pointB;
      let posB = { x: 0, y: 0 };
      if (constraint.bodyB) {
        posB = constraint.bodyB.position;
      }
      push();
      strokeWeight(4);
      stroke(255);
      line(
        posA.x + offsetA.x,
        posA.y + offsetA.y,
        posB.x + offsetB.x,
        posB.y + offsetB.y
      );
      pop();
    }
  }
}
