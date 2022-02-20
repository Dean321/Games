var gimg, knife, kimg, apple, apricot, banana, blueberry, cherry, cranberry, grape, grapes, lemon, mango, peach, orange, pear, strawberry, fruitGroup, alienGroup, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a12, a13, a14, gameOver, gameOverImg, score, gamsState, fruitSpeed, alienSpeed, prevScore,bgSound,knifeSound,gameOverSound;

function preload() {
  gimg = loadImage("bg.jpg");
  kimg = loadImage("knife.png");
  apple = loadImage("apple.png");
  apricot = loadImage("apricot.png");
  banana = loadImage("banana.png");
  blueberry = loadImage("blueberry.png");
  cherry = loadImage("cherry.png");
  cranberry = loadImage("cranberry.png");
  grape = loadImage("grape.png");
  grapes = loadImage("grapes.png");
  lemon = loadImage("lemon.png");
  mango = loadImage("mango.png");
  peach = loadImage("peach.png");
  orange = loadImage("orange.png");
  pear = loadImage("pear.png");
  strawberry = loadImage("strawberry.png");
  a1 = loadImage("alien1.png");
  a2 = loadImage("alien2.png");
  a3 = loadImage("alien3.png");
  a4 = loadImage("alien4.png");
  a5 = loadImage("alien5.png");
  a6 = loadImage("alien6.png");
  a7 = loadImage("alien7.png");
  a8 = loadImage("alien8.png");
  a9 = loadImage("alien9.png");
  a10 = loadImage("alien10.png");
  a11 = loadImage("alien11.png");
  a12 = loadImage("alien12.png");
  a13 = loadImage("alien13.png");
  a14 = loadImage("alien14.png");
  gameOverImg = loadImage("gameOver.png");
  bgSound = loadSound("Fruit Ninja Music.mp3");
  knifeSound = loadSound("Swish1.mp3");
  gameOverSound = loadSound("Fruit Ninja Game Over.mp3")
}

function setup() {
  createCanvas(800, 600);
  knife = createSprite(width / 2, height / 2);
  knife.setCollider("circle", 0, 0, 400)
  knife.addImage(kimg);
  knife.scale = 0.1;
  fruitGroup = new Group();
  alienGroup = new Group();
  gameOver = createSprite(width / 2, height / 2);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 2;
  gameOver.visible = false;
  score = 0;
  gameState = 0;
  fruitSpeed = 3;
  alienSpeed = 4;
  prevScore = 0;
  bgSound.loop();
}

function draw() {
  background(gimg);
  if (gameState == 0) {
    knife.x = mouseX;
    knife.y = mouseY;
    if (frameCount % 60 == 0) {
      drawFruits();
    }
    if (frameCount % 240 == 0) {
      drawAliens();
    }

    if (knife.overlap(fruitGroup, call)) {
      knifeSound.play();
      score += 1;
      prevScore = score;
    }
    if (knife.overlap(alienGroup)) {
      bgSound.stop();
      gameOverSound.play();
      gameState = 1;
    }
    if (score % 4 == 0 && score > 0 && prevScore == score) {
      fruitSpeed += 0.5;
      prevScore += 0.7;
    }
    if (score % 10 == 0 && score > 0 && prevScore == score) {
      alienSpeed += 0.3;
      prevScore += 0.7;
    }
  } else {
    gameOver.visible = true;
    fruitGroup.destroyEach();
    alienGroup.destroyEach();
    knife.x = 400;
    knife.y = 340;
    
    if (mousePressedOver(gameOver)) {
      gameOver.visible = false;
      gameOverSound.stop();
      bgSound.loop();
      score = 0;
      gameState = 0;
    }
  }
  drawSprites();
  fill("white");
  textSize(30);
  text("Score: " + score, width - 200, 40)
}

function drawFruits() {
  var pos = Math.round(random(1, 4));
  var fruit = createSprite();
  switch (pos) {
    case 1:
      fruit.x = 0;
      fruit.y = Math.round(random(0, height));
      fruit.setVelocity(fruitSpeed, 0);
      break;
    case 2:
      fruit.x = width;
      fruit.y = Math.round(random(0, height));
      fruit.setVelocity(-fruitSpeed, 0);
      break;
    case 3:
      fruit.y = height;
      fruit.x = Math.round(random(0, width));
      fruit.setVelocity(0, -fruitSpeed);
      break;
    case 4:
      fruit.y = 0;
      fruit.x = Math.round(random(0, width));
      fruit.setVelocity(0, fruitSpeed);
      break;
  }
  var fruitimg = Math.round(random(1, 14));
  switch (fruitimg) {
    case 1:
      fruit.addImage(apple);
      fruit.scale = 0.7;
      break;
    case 2:
      fruit.addImage(apricot);
      fruit.scale = 0.7;
      break;
    case 3:
      fruit.addImage(banana);
      fruit.scale = 0.7;
      break;
    case 4:
      fruit.addImage(blueberry);
      fruit.scale = 0.6;
      break;
    case 5:
      fruit.addImage(cherry);
      fruit.scale = 0.7;
      break;
    case 6:
      fruit.addImage(cranberry);
      fruit.scale = 0.7;
      break;
    case 7:
      fruit.addImage(grape);
      fruit.scale = 0.6;
      break;
    case 8:
      fruit.addImage(grapes);
      fruit.scale = 0.6;
      break;
    case 9:
      fruit.addImage(lemon);
      fruit.scale = 0.5;
      break;
    case 10:
      fruit.addImage(mango);
      fruit.scale = 0.6;
      break;
    case 11:
      fruit.addImage(peach);
      fruit.scale = 0.6;
      break;
    case 12:
      fruit.addImage(pear);
      fruit.scale = 0.6;
      break;
    case 13:
      fruit.addImage(orange);
      fruit.scale = 0.6;
      break;
    case 14:
      fruit.addImage(strawberry);
      fruit.scale = 0.6;
      break;
  }
  fruit.rotationSpeed = 3;
  fruit.lifetime = width / 3
  fruitGroup.add(fruit);
}

function drawAliens() {
  var pos = Math.round(random(1, 4));
  var alien = createSprite();
  switch (pos) {
    case 1:
      alien.x = 0;
      alien.y = Math.round(random(0, height));
      alien.setVelocity(alienSpeed, 0);
      break;
    case 2:
      alien.x = width;
      alien.y = Math.round(random(0, height));
      alien.setVelocity(-alienSpeed, 0);
      break;
    case 3:
      alien.y = height;
      alien.x = Math.round(random(0, width));
      alien.setVelocity(0, -alienSpeed);
      break;
    case 4:
      alien.y = 0;
      alien.x = Math.round(random(0, width));
      alien.setVelocity(0, alienSpeed);
      break;
  }
  var alienimg = Math.round(random(1, 14));
  switch (alienimg) {
    case 1:
      alien.addImage(a1);
      alien.scale = 0.4;
      break;
    case 2:
      alien.addImage(a2);
      alien.scale = 0.4;
      break;
    case 3:
      alien.addImage(a3);
      alien.scale = 0.3;
      break;
    case 4:
      alien.addImage(a4);
      alien.scale = 0.4;
      break;
    case 5:
      alien.addImage(a5);
      alien.scale = 0.4;
      break;
    case 6:
      alien.addImage(a6);
      alien.scale = 0.4;
      break;
    case 7:
      alien.addImage(a7);
      alien.scale = 0.4;
      break;
    case 8:
      alien.addImage(a8);
      alien.scale = 0.4;
      break;
    case 9:
      alien.addImage(a9);
      alien.scale = 0.5;
      break;
    case 10:
      alien.addImage(a10);
      alien.scale = 0.4;
      break;
    case 11:
      alien.addImage(a11);
      alien.scale = 0.3;
      break;
    case 12:
      alien.addImage(a12);
      alien.scale = 0.4;
      break;
    case 13:
      alien.addImage(a13);
      alien.scale = 0.4;
      break;
    case 14:
      alien.addImage(a14);
      alien.scale = 0.4;
      break;
  }
  alien.rotationSpeed = 3;
  alien.lifetime = width / 3
  alienGroup.add(alien);
}

function call(s1, s2) {
  s2.remove();
}
