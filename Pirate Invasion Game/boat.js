class Boat {
  constructor(x, y, w, h, offset, boatAnimation) {
    this.w = w;
    this.h = h;
    this.imgWidth = 180;
    this.imgHeight = 200;
    this.img = loadImage("./assets/boat.png");
    this.offset = offset;
    this.animation = boatAnimation;
    this.speed = 0.05;
    this.isBroken = false;
    this.body = Matter.Bodies.rectangle(x, y, this.w, this.h);
    Matter.World.add(myWorld, this.body);
  }

  display() {
    var index = floor(this.speed % this.animation.length);
    /**
     * Creating a variable called an index which we’ll be using to traverse through the set of animations. We are calculating the index by dividing the speed of animation by animation length to get the smallest number
inside the image() function using this animation.
     */
    push();
    translate(this.body.position.x, this.body.position.y);
    image(this.animation[index], 0, this.offset, this.imgWidth, this.imgHeight);
    pop();
  }

  remove(i) {
    this.animation = brokenBoatAnimation;
    this.speed = 0.05;
    this.imgWidth = 300;
    this.imgHeight = 300;
    this.isBroken = true;
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    setTimeout(() => {
      Matter.World.remove(myWorld, this.body);
      delete boats[i];
    }, 3500);
  }

  animate() {
    /**
     * animate() function which will help us to set the speed of the animation. This speed will determine how fast every frame in our animation will move.
The speed will keep on increasing as the game progresses and will be divided by the length of the animation so that every frame gets a certain amount of screen time.
We will increment the speed by 0.05.
     */
    this.speed += 0.05;
  }
}
