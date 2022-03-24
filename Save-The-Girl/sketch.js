var girl, boy, top_border, bottom_border, bullet1, bullet2, bullet3, gameState,girlImage, boyImage;

function preload(){
  girlImage = loadImage("girl.png"); 
  boyImage = loadImage("boy.png");
}

function setup() {
  createCanvas(400, 400);
  girl = createSprite(360, 200, 20, 20);
  girl.addImage(girlImage);
  girl.scale = 0.40;
  boy = createSprite(30, 200, 20, 20);
  boy.addImage(boyImage);
  boy.scale = 0.10;
  top_border = createSprite(200, 30, 300, 10);
  top_border.visible = false;
  bottom_border = createSprite(200, 370, 300, 10);
  bottom_border.visible = false;
  bullet1 = createSprite(100, 80, 20, 100);
  bullet1.setVelocity(0, 4);
  bullet1.shapeColor = "red";
  bullet2 = createSprite(200, 365, 20, 100);
  bullet2.setVelocity(0, -4);
  bullet2.shapeColor = "red";
  bullet3 = createSprite(300, 80, 20, 100);
  bullet3.setVelocity(0, 4);
  bullet3.shapeColor = "red";
  gameState = 0;
  edges = createEdgeSprites();
}



function draw() {
  background("#2ED328");
  boy.set
  createEdgeSprites();
  bullet1.bounceOff(edges[2]);
  bullet1.bounceOff(edges[3]);
  bullet2.bounceOff(edges[2]);
  bullet2.bounceOff(edges[3]);
  bullet3.bounceOff(edges[2]);
  bullet3.bounceOff(edges[3]);

  textSize(20);
  textFont("Courier");
  fill("black");
  text("SAVE THE GIRL", 120, 20);

  boy.setVelocity(0, 0);
  if (keyDown("up")) {
    boy.setVelocity(0, -2);
  }
  if (keyDown("down")) {
    boy.setVelocity(0, 2);
  }
  if (keyDown("left")) {
    boy.setVelocity(-2, 0);
  }
  if (keyDown("right")) {
    boy.setVelocity(2, 0);
  }

  if (boy.isTouching(bullet1) || boy.isTouching(bullet2) || boy.isTouching(bullet3)) {
    reset_boy_position();
  }

  if (keyDown("r")) {
    reset_boy_position();
    bullet1.setVelocity(0, 4);
    bullet2.setVelocity(0, -4);
    bullet3.setVelocity(0, 4);
    gameState = 0;
  }

  if (gameState == 0) {
    textSize(10);
    text("Use Arrow keys to move boy. Get him to the girl safely.", 40, 385);
  }



  drawSprites();

  if (boy.isTouching(girl) && gameState == 0) {
    bullet1.setVelocity(0, 0);
    bullet2.setVelocity(0, 0);
    bullet3.setVelocity(0, 0);
    textSize(20);
    gameState = 1;
  }

  if (gameState == 1) {
    textFont("Comic Sans MS");
    fill("white")
    strokeWeight(10);
    text("YOU SAVED THE GIRL", 100, 200);
    textSize(10);
    fill("black");
    text("Press 'R' to restart the game.", 150, 385);
  }
}

function reset_boy_position() {
  boy.x = 30;
  boy.y = 200;
}