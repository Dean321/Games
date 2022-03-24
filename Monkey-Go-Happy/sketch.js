var monkey, monkey_collided, monkey_running, ground, monkey_jumping;
var banana, bananaImage, b1, b2, b3, b5, obstacle, obstacleImage, rimg, restart;
var FoodGroup, obstacleGroup, gameOver, go_img, bgImg, x1, x2, scrollSpeed, b1g, b2g, b3g, b5g,edges;
var score = 0,
  indexOfFood = 0;
const END = 0,
  PLAY = 1;
var gameState = PLAY;

function preload() {
  monkey_running = loadAnimation("Monkey/Run/Run1.png", "Monkey/Run/Run2.png", "Monkey/Run/Run3.png", "Monkey/Run/Run4.png", "Monkey/Run/Run5.png", "Monkey/Run/Run6.png", "Monkey/Run/Run7.png");
  monkey_jumping = loadAnimation("Monkey/Jump/Jump1.png", "Monkey/Jump/Jump2.png", "Monkey/Jump/Jump3.png", "Monkey/Jump/Jump4.png", "Monkey/Jump/Jump5.png", "Monkey/Jump/Jump6.png")
  monkey_collided = loadAnimation("Monkey/Collided.png")
  //bananaImage = loadImage("banana.png");
  obstaceImage = loadAnimation("Obstacles/CarnivorousClosed.png", "Obstacles/CarnivorousOpened.png");
  bgImg = loadImage("bg.png");
  //go_img = loadImage("GameOver.png");
  b1 = loadImage("Bananas/Banana_1.png");
  b2 = loadImage("Bananas/Banana_2.png");
  b3 = loadImage("Bananas/Banana_3.png");
  b5 = loadImage("Bananas/Banana_5.png");
  rimg = loadImage("Restart.png");
}



function setup() {
  createCanvas(800, 500);
  x1 = 0;
  x2 = width;
  ground = createSprite(width / 2, height - 50, width, 20);
  ground.velocityX = -5;
  ground.visible = false;
  monkey = createSprite(50, 150, 20, 20);
  monkey.addAnimation("runs", monkey_running);
  monkey.addAnimation("jumps", monkey_jumping);
  monkey.addAnimation("die", monkey_collided);
  monkey.scale = 0.5;
  FoodGroup = new Group();
  obstacleGroup = new Group();
  scrollSpeed = 4;
  restart = createSprite(width / 2, height / 2 + 50);
  restart.addImage(rimg)
  restart.scale = 0.2
  restart.visible = false;
  b1g = new Group();
  b2g = new Group();
  b3g = new Group();
  b5g = new Group();
  edges = createEdgeSprites();
}


function draw() {
  image(bgImg, x1, 0, width, height);
  image(bgImg, x2, 0, width, height);
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }
  drawSprites();
  if (gameState == PLAY) {
    scrollSpeed = 4;
    if (ground.x < width / 2) {
      ground.x = ground.width / 2;
    }
    if (monkey.y > 150) {
      monkey.changeAnimation("runs")
    }
    if (keyDown("space") && monkey.y > 150) {
      monkey.velocityY = -14;
      monkey.changeAnimation("jumps")
    }
    monkey.velocityY += 0.5;
    if (monkey.overlap(b1g, removeBlocks)) {
      score += 1;
    } else if (monkey.overlap(b2g, removeBlocks)) {
      score += 2;
    } else if (monkey.overlap(b3g, removeBlocks)) {
      score += 3;
    } else if (monkey.overlap(b5g, removeBlocks)) {
      score += 5;
    }
    drawBananas();
    drawObstacles();
    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }
    scoreCheck = 0;
    if (score == 10) {
      scoreCheck = 2;
    } else if (score == 20) {
      scoreCheck = 3;
    } else if (score == 30) {
      scoreCheck = 5;
    }
    switch (scoreCheck) {
      case 2:
        monkey.scale = 0.55;
        break;
      case 3:
        monkey.scale = 0.6;
        break;
      case 5:
        monkey.scale = .65;
        break;
      default:
        break;
    }
  monkey.collide(edges[2])
  } else if (gameState == END) {
    restart.visible = true;
    monkey.changeAnimation("die")
    monkey.scale = 0.5;
    scrollSpeed = 0;
    textSize(50);
    fill(255);
    strokeWeight(5);
    stroke(255)
    text("GAME OVER", width / 2 - 100, height / 2);
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    b1g.setVelocityXEach(0);
    b2g.setVelocityXEach(0);
    b3g.setVelocityXEach(0);
    b5g.setVelocityXEach(0);
    b1g.setRotationSpeedEach(0);
    b2g.setRotationSpeedEach(0);
    b3g.setRotationSpeedEach(0);
    b5g.setRotationSpeedEach(0);
    obstacleGroup.setLifetimeEach(-1);
    b1g.setLifetimeEach(-1);
    b2g.setLifetimeEach(-1);
    b3g.setLifetimeEach(-1);
    b5g.setLifetimeEach(-1);
    monkey.velocityX = 0;
    if (mousePressedOver(restart)) {
      obstacleGroup.destroyEach();
      b1g.destroyEach();
      b2g.destroyEach();
      b3g.destroyEach();
      b5g.destroyEach();
      score = 0;
      restart.visible = false;
      gameState = PLAY;
    }
  }
  monkey.collide(ground);
  noStroke();
  textSize(30);
  fill("white")
  text("Press Spacebar to jump\t\t\t\t\t\t\t\t\t\t\tFoodCount: " + score, 30, 30);


}

function drawBananas() {
  if (frameCount % 80 == 0) {
    var banana = createSprite(width, Math.round(random(50, height - 50)), 10, 10);
    banana.velocityX = -4;
    var rn = Math.round(random(1, 4));
    switch (rn) {
      case 1:
        banana.addImage(b1);
        b1g.add(banana);
        break;
      case 2:
        banana.addImage(b2);
        b2g.add(banana);
        break;
      case 3:
        banana.addImage(b3);
        b3g.add(banana);
        break;
      case 4:
        banana.addImage(b5);
        b5g.add(banana);
        break;
    }
    banana.scale = 0.2;
    banana.rotationSpeed = 2;
    banana.lifetime = width / 3;
  }

}

function drawObstacles() {
  if (frameCount % 300 == 0) {
    var obstacle = createSprite(width, height - 100, 10, 10);
    obstacle.velocityX = -4;
    obstacle.addAnimation("eater", obstaceImage);
    obstacle.scale = 0.8;
    obstacle.lifetime = width / 2;
    obstacleGroup.add(obstacle);
  }
}

function removeBlocks(sprite, obstacle) {
  obstacle.remove();
}