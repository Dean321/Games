var laser1,
  laser2,
  player,
  p1,
  p2,
  p3,
  edges,
  diamond,
  diamondImg,
  safeRegion1,
  safeRegion2,
  wall1,
  wall2,
  laser3;
function preload() {
  p1 = loadAnimation("player.png");
  p2 = loadImage("22.png");
  p3 = loadImage("33.png");
  diamondImg = loadAnimation(
    "d1.png",
    "d2.png",
    "d3.png",
    "d4.png",
    "d5.png",
    "d6.png",
    "d7.png",
    "d8.png"
  );
}

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);

  laser1 = createSprite(100, 395, 200, 10);
  laser1.shapeColor = "red";
  laser1.velocityY = -5;

  laser2 = createSprite(300, 205, 200, 10);
  laser2.shapeColor = "red";
  laser2.velocityY = 4;

  laser3 = createSprite(205, 250, 10, 500);
  laser3.shapeColor = "red";
  laser3.velocityX = 5;

  safeRegion1 = createSprite(550, 560);
  safeRegion1.shapeColor = "#D6D5A8";

  safeRegion2 = createSprite(25, 25);
  safeRegion2.shapeColor = "#D6D5A8";

  edges = createEdgeSprites();

  player = createSprite(550, 560, 10, 10);
  player.addAnimation("avatar", p1);

  player.scale = 0.25;
  // player.debug = true
  player.setCollider("rectangle", 30, 0, 180, 300);

  gameState = "Play"; // Safe / Play / Lost / Win

  diamond = createSprite(35, 35);
  diamond.addAnimation("avatar", diamondImg);
  diamond.scale = 0.1;

  wall1 = createSprite(300, 200, 200, 10);
  wall1.visible = false;
  wall2 = createSprite(200, 250, 10, 500);
  wall2.visible = false;
}

function draw() {
  background("#51557E");
  laser1.bounceOff(edges[3]);
  laser2.bounceOff(edges[3]);
  laser1.bounceOff(edges[2]);
  laser2.bounceOff(wall1);
  laser3.bounceOff(wall2);
  laser3.bounceOff(edges[1]);
  player.bounceOff(edges);
  console.log(gameState);
  if (gameState === "Play") {
    movePlayer();

    if (
      (player.isTouching(laser1) ||
        player.isTouching(laser2) ||
        player.isTouching(laser3)) &&
      !player.overlap(safeRegion1) &&
      !player.overlap(safeRegion2)
    ) {
      gameState = "Lost";
      laser1.destroy();
      laser2.destroy();
      laser3.destroy();
      player.destroy();
    }

    if (player.overlap(safeRegion2)) {
      if (player.overlap(diamond)) {
        diamond.visible = false;
        gameState = "Win";
        laser1.destroy();
        laser2.destroy();
        laser3.destroy();
        player.destroy();
      }
    }
  } else if (gameState === "Lost") {
    fill("#1B2430");
    rect(width / 2, height / 2, width / 2, height / 2);
    fill("#D6D5A8");
    textSize(58);
    textFont("Yeon Sung");
    text("You lost", 200, 300);
    image(p2, 300, 300, 150, 200);
  } else if (gameState === "Win") {
    fill("#1B2430");
    rect(width / 2, height / 2, width / 2, height / 2);
    fill("#D6D5A8");
    textSize(58);
    textFont("Yeon Sung");
    text("You Win", 200, 300);
    image(p3, 300, 320, 150, 200);
  }

  drawSprites();
  noStroke();
  fill("#1B2430");
  rect(280, 575, 200, 30);
  fill("#816797");
  textSize(22);
  textFont("Yeon Sung");
  text("Burglar in the mall", 200, 580);
}
function movePlayer() {
  if (keyDown("up")) {
    player.y -= 5;
  }
  if (keyDown("down")) {
    player.y += 5;
  }
  if (keyDown("right")) {
    player.x += 5;
  }
  if (keyDown("left")) {
    player.x -= 5;
  }
}

/*
font-family: 'Yeon Sung', cursive;
*/
