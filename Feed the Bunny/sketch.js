var myWorld,
  myEngine,
  rope,
  ground,
  fruit,
  fruit_con,
  bg_img,
  food,
  rabbit,
  bunny,
  button,
  blink,
  eat,
  sad,
  bk_song,
  cut_sound,
  sad_sound,
  eating_sound,
  air,
  blower,
  mute_btn, button2, button3, rop2, rope3, fruit_con2, fruit_con3, canW, canH

function preload() {
  bg_img = loadImage("background.png");
  food = loadImage("melon.png");
  rabbit = loadImage("Rabbit-01.png");
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation(
    "eat_0.png",
    "eat_1.png",
    "eat_2.png",
    "eat_3.png",
    "eat_4.png"
  );
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  /**
   * First, we need to set both animations as
   * playing equal to true.
   * This will enable the play mode of the
   * animation. This makes our animation when we
   * run the code. If we set this to false, then
   * our animation will not run until we specify
   * that in the code.
   */
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  /**
   * Next for the eat animation we don’t want the
   *  animation to loop or play again and again,
   * so to prevent that we will keep
   */
  eat.looping = false;
  bk_song = loadSound("sound1.mp3");
  sad_sound = loadSound("sad.wav");
  cut_sound = loadSound("rope_cut.mp3");
  eating_sound = loadSound("eating_sound.mp3");
  air = loadSound("air.wav");
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
    canW = displayWidth
    canH = displayHeight
    createCanvas(displayWidth+80, displayHeight)
  }
  else{
    canW = displayWidth
    canH = displayHeight
    createCanvas(displayWidth, displayHeight)
  }
  // createCanvas(600, 600);
  rectMode(CENTER);
  ellipseMode(CENTER);
  angleMode(DEGREES);
  imageMode(CENTER);
  // frameRate(80)
  // bk_song.play();
  bk_song.setVolume(0.2);
  myEngine = Matter.Engine.create();
  myWorld = myEngine.world;
  ground = new Ground(width / 2, height - 10, width, 20);
  /**
   * As you have seen in the visuals, a composite consists of
   * multiple bodies within it. When we want multiple bodies to
   * have the same properties such as shape and size and behave
   * in a certain manner, we make a composite of these bodies.
   * In our game, the rope we are creating is made up of multiple
   * rectangles, hence we call it a composite. But we also have to
   * add our fruit in the same composite.
   * To add a body to the composite, we use the function,
   * Matter.Composite.add(name_of_composite,body_to_add).
   */
  rope = new Rope(8, { x: 40, y: 30 });
  rope2 = new Rope(7, { x: width/2 + 70, y: 40 });
  rope3 = new Rope(4, { x: width/2 + 100, y: height/2 - 75 });

  fruit = Matter.Bodies.circle(width/2, height/2, 30, {
    density: 0.001,
  });
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  fruit_con2 = new Link(rope2, fruit);
  fruit_con3 = new Link(rope3, fruit);
  /**
   * The computer tries to play the animation as
   * fast as possible, but we want our animation
   * to play a little slower so that we can see
   * what is happening in the animation.
   * To slow the speed of the animation we need
   * to set a frame delay. This is going to be a
   * number, the higher the number the slower
   * will be the speed.
   * We will set this for both the loaded
   * animations, blink and eat.
   */
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  
  bunny = createSprite(width/2 - 50, height-70, 100, 100);
  // bunny.addImage(rabbit);
  bunny.scale = 0.2;
  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("crying", sad);
  bunny.changeAnimation("blinking");
  
  button = createImg("cut_button.png");
  button.position(20, 30);
  button.size(50, 50);
  button.mouseClicked(drop);
  
  button2 = createImg("cut_button.png");
  button2.position(width/2+30, 35);
  button2.size(50, 50);
  button2.mouseClicked(drop2);
  
  button3 = createImg("cut_button.png");
  button3.position(width/2+120, height/2-100);
  button3.size(50, 50);
  button3.mouseClicked(drop3);
  
  blower = createImg("balloon.png");
  blower.position(10, height/2-50);
  blower.size(120, 80);
  blower.mouseClicked(airblow);
  
  mute_btn = createImg("mute.png");
  mute_btn.position(width - 50, 20);
  mute_btn.size(25, 25);
  mute_btn.mouseClicked(mute);
}

function draw() {
  background("lightblue");
  image(bg_img, width / 2, height / 2, width, height);
  Matter.Engine.update(myEngine);
  ground.display();
  rope.show();
  rope2.show();
  rope3.show();

  // ellipse(fruit.position.x, fruit.position.y, 60, 60);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 90, 90);
    var collision = Matter.SAT.collides(fruit, ground.body);
    if (collision.collided) {
      // console.log("crying")
      bunny.changeAnimation("crying");
      bk_song.stop();
      if(fruit != null) {
      sad_sound.play()
      sad_sound.setVolume(0.1)
        fruit=null
    }
    }
  }
  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation("eating");
    eating_sound.play();
  }

  drawSprites();
  text(mouseX + "," + mouseY, mouseX, mouseY);
}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cut_sound.play();
}

function drop2(){
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
  cut_sound.play();
}

function drop3(){
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
  cut_sound.play();
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y
    );
    // console.log(125, d)
    if (d <= 80) {
      Matter.World.remove(myWorld, fruit);
      fruit = null;
      return true;
    } else {
      return false;
    }
  }
}

function airblow() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.01, y: 0 });
  air.play();
  air.setVolume(0.1);
}

function mute() {
  if (bk_song.isPlaying()) {
    bk_song.stop();
  } else {
    bk_song.play();
  }
}
