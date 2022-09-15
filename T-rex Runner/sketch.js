var trex, trex_runs, ground, clound_img, o1, o2, o3, o4, o5, o6, obstacle, score = 0,
  img_x1, img_x2, obstacle_grp, cloud_grp, trex_collided_img, gameOver_img, gameOver, 
  restart_img, restart, jumpSound, dieSound, CheckPointSound, raptor_1, raptor_2, 
  raptorGroup, bg, trex_jump;
const PLAY = 1, END = 0;
var gameState = PLAY;

function preload() {
  trex_runs = loadAnimation("Trex/Run/Run (1).png", "Trex/Run/Run (2).png", "Trex/Run/Run (3).png", "Trex/Run/Run (4).png", "Trex/Run/Run (5).png", "Trex/Run/Run (6).png", "Trex/Run/Run (7).png", "Trex/Run/Run (8).png");
  ground = loadImage("ground.png");
  clound_img = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  trex_collided_img = loadAnimation("Trex/Dead (8).png");
  gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  raptor_1 = loadAnimation("Raptors/1.png", "Raptors/2.png", "Raptors/3.png", "Raptors/4.png", "Raptors/5.png", "Raptors/6.png", "Raptors/7.png");
  raptor_2 = loadAnimation("Raptors/4.png");
  trex_jump = loadAnimation("Trex/Jump/Jump (1).png", "Trex/Jump/Jump (2).png", "Trex/Jump/Jump (3).png", "Trex/Jump/Jump (4).png", "Trex/Jump/Jump (4).png", "Trex/Jump/Jump (5).png", "Trex/Jump/Jump (6).png", "Trex/Jump/Jump (7).png", "Trex/Jump/Jump (8).png", "Trex/Jump/Jump (9).png");
}

function setup() {
  createCanvas(1200, 600);
  bg = createSprite(width / 2, height / 2, width, height);
  bg.visible = false;
  trex = createSprite(50, height-50, 30, 30);
  trex.addAnimation("trex running", trex_runs);
  trex.addAnimation("trex collided", trex_collided_img);
  trex.addAnimation("trex jumps", trex_jump);
  trex.scale = 0.15;
  trex.setCollider("rectangle", 0, 0, 300, 400); 
  edges = createEdgeSprites();
  invisible_ground = createSprite(width/2, height, width, 10);
  invisible_ground.visible = false;
  raptorGroup = new Group();
  cloud_grp = new Group();
  obstacle_grp = new Group();
  gameOver = createSprite(width/2, height-130, 20, 20);
  gameOver.addImage(gameOver_img);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  restart = createSprite(width/2, height-90, 20, 20);
  restart.addImage(restart_img);
  restart.scale = 0.05;
  restart.visible = false;
  img_x1 = 0;
  img_x2 = width;
}


function draw() {
  background("#A5E4F2");
  textSize(15);
  fill(0);
  text("Score: " + score, width-100, 20);
  image(ground, img_x1, height - 20, width, 20)
  image(ground, img_x2, height - 20, width, 20)
  if (gameState == PLAY) {
    img_x1 -= 4;
    img_x2 -= 4;
    if (img_x1 <= -width) {
      img_x1 = width;
    }
    if (img_x2 <= -width) {
      img_x2 = width;
    }
    score += Math.round(getFrameRate() / 60);
    if (trex.y >= 170) {
      trex.changeAnimation("trex running");
    }
    if (keyDown("space") && trex.y >= 170) {
      trex.changeAnimation("trex jumps");
      trex.velocityX = 0;
      trex.velocityY = -12;
      jumpSound.play();
    }
    trex.velocityY = trex.velocityY + 0.6;
    spawnClouds();
    spawnObstacles();
    spawnRaptors();
    if (obstacle_grp.isTouching(trex) || trex.overlap(raptorGroup, callback)) {
      trex.changeAnimation("trex collided");
      bg.overlap(raptorGroup, callback);
      dieSound.play();
      gameState = END;
    }

    if (frameCount % 100 == 0 && score > 0) {
      checkPointSound.play();
      ground.velocityX = ground.velocityX + (score / 100);
    }
  } else if (gameState == END) {
    gameOver.visible = true;
    restart.visible = true;
    trex.velocityY = 0;
    trex.y = height-30;
    raptorGroup.setVelocityXEach(0);
    raptorGroup.setLifetimeEach(-1);
    obstacle_grp.setVelocityXEach(0);
    obstacle_grp.setLifetimeEach(-1);
    cloud_grp.setVelocityXEach(0);
    cloud_grp.setLifetimeEach(-1);
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  trex.collide(edges[2]);
  trex.collide(invisible_ground);
  drawSprites();

}

function spawnClouds() {
  if (frameCount % 60 == 0) {
    cloud = createSprite(width, Math.round(random(0, height-100)), 10, 10);
    cloud.velocityX = -2;
    cloud.addImage(clound_img);
    cloud.scale = 0.5;
    cloud.lifetime = width / 2;
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    gameOver.depth = trex.depth;
    restart.depth = trex.depth;
    cloud_grp.add(cloud);
  }
}

function spawnObstacles() {
  randomNumber = Math.round(random(1, 4));
  if (frameCount % 60 == 0) {
    obstacle = createSprite(width, height-30, 10, 40);
    obstacle.velocityX = -4;
    switch (randomNumber) {
      case 1:
        obstacle.addImage(o1);
        obstacle.scale = 0.4;
        break;
      case 2:
        obstacle.addImage(o2);
        obstacle.scale = 0.4;
        break;
      case 3:
        obstacle.addImage(o3);
        obstacle.y = height-50;
        obstacle.scale = 0.15;
        obstacle.setCollider("rectangle", 0, 150, 400, 200)
        break;
      case 4:
        obstacle.addImage(o4);
        obstacle.scale = 0.15;
        obstacle.y = height-50;
        obstacle.setCollider("rectangle", 0, 150, 400, 200)
        break;
    }
    obstacle.lifetime = width / 2;
    obstacle_grp.add(obstacle);
  }
}

function reset() {
  gameOver.visible = false;
  restart.visible = false;
  obstacle_grp.destroyEach();
  cloud_grp.destroyEach();
  raptorGroup.destroyEach();
  trex.changeAnimation("trex running");
  score = 0;
  gameState = PLAY;
}

function spawnRaptors() {
  if (frameCount % 100 == 0) {
    raptor = createSprite(width, Math.round(random(50, height-80)), 10, 10);
    raptor.velocityX = -3;
    raptor.addAnimation("fly", raptor_1);
    raptor.addAnimation("stop", raptor_2);
    raptor.scale = 0.2;
    raptor.lifetime = width / 3 + 50;
    raptor.depth = restart.depth
    restart.depth += 1
    raptorGroup.add(raptor);
  }
}

function callback(s1, s2) {
  s2.changeAnimation("stop");
}