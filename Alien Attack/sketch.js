var wall1,
  wall2,
  player,
  edges,
  alienGroup,
  bulletGroup,
  coinGroup,
  alienCount,
  coinCount,
  lives,
  score,
  scr,
  heart,
  cnt,
  heart1,
  heart2,
  gameOver,
  earth,
  ship,
  coin,
  heartImg,
  gameOverTxt,
  earthImg,
  virus;
function preload() {
  coin = loadImage("coin_gold.png");
  heartImg = loadImage("retro_red_heart.png");
  gameOverTxt = loadImage("textGameOver.png");
  earthImg = loadImage("earth.png");
  virus = loadImage("virus02_09.png");
  ship = loadImage("ship01.png");
}
function setup() {
  wall1 = createSprite(120, 250, 10, 300);
  wall1.shapeColor = "white";

  wall2 = createSprite(280, 150, 10, 300);
  wall2.shapeColor = "white";

  player = createSprite(50, 380, 20, 20);
  player.addImage(ship);
  player.scale = 0.1;
  player.rotation = 270;

  edges = createEdgeSprites();

  alienGroup = new Group();
  bulletGroup = new Group();
  coinGroup = new Group();

  alienCount = 0;
  coinCount = 0;

  for (var i = 20; i < 120; i += 20) {
    for (var j = 110; j < 340; j += 20) {
      var b = createSprite(i, j);
      b.addImage(coin);
      b.scale = 0.2;
      coinCount += 1;
      coinGroup.add(b);
    }
  }

  for (var i = 150; i < 270; i += 20) {
    for (var j = 20; j < 320; j += 20) {
      var b = createSprite(i, j);
      b.addImage(coin);
      b.scale = 0.2;
      coinCount += 1;
      coinGroup.add(b);
    }
  }

  lives = 3;
  score = 0;

  scr = createSprite(320, 10);
  scr.addImage(coin);
  scr.scale = 0.2;

  heart = createSprite(370, 10);
  heart.addImage(heartImg);
  heart.scale = 0.09;

  cnt = 0;

  heart1 = createSprite(50, 50);
  heart1.addImage(heartImg);
  heart1.scale = 0.09;

  heart2 = createSprite(200, 350);
  heart2.addImage(heartImg);
  heart2.scale = 0.09;

  gameOver = createSprite(200, 200);
  gameOver.addImage(gameOverTxt);
  gameOver.scale = 0.9;
  gameOver.visible = false;

  earth = createSprite(350, 170);
  earth.addImage(earthImg);
  earth.scale = 0.1;
}

function makeAliens() {
  if (frameCount % 100 == 0 && alienCount == 0) {
    for (var i = 0; i < 10; i += 1) {
      x = Math.round(random(10, 390));
      y = Math.round(random(10, 250));
      var a = createSprite(x, y);
      a.addImage(virus);
      a.scale = 0.1;
      a.setVelocity(Math.round(random(1, 8)), Math.round(random(1, 8)));
      alienCount += 1;
      alienGroup.add(a);
    }
  }
}

function draw() {
  background("black");
  if (lives > 0) {
    makeAliens();
    alienGroup.bounceOff(edges);
    alienGroup.bounceOff(wall1);
    alienGroup.bounceOff(wall2);
    player.collide(edges);
    player.collide(wall1);
    player.collide(wall2);

    if (keyDown("space")) {
      shoot();
    }

    bulletGroup.overlap(alienGroup, removeThem);
    if(player.isTouching(coinGroup, collectThem)){};
    player.overlap(alienGroup, alienAttack);
    edges.overlap(bulletGroup, collectThem);
    wall1.overlap(bulletGroup, collectThem);
    wall2.overlap(bulletGroup, collectThem);

    move();
    if (player.isTouching(earth) && score >= coinCount) {
      lives = 0;
    }
    if (player.isTouching(heart1)) {
      lives += 1;
      heart1.destroy();
    }
    if (player.isTouching(heart2)) {
      lives += 1;
      heart2.destroy();
    }

    fill("yellow");
    text(lives, 385, 15);
    text(score, 330, 15);
  } else {
    alienGroup.destroyEach();
    player.destroy();
    wall1.destroy();
    wall2.destroy();
    coinGroup.destroyEach();
    bulletGroup.destroyEach();
    earth.destroy();
    heart.destroy();
    heart1.destroy();
    heart2.destroy();
    scr.destroy();
    gameOver.visible = true;
  }
  drawSprites();
}

function shoot() {
  var s = createSprite(player.x, player.y);
  if (player.rotation == 270) {
    s.velocityY = -3;
    s.width = 3;
    s.height = 8;
  }
  if (player.rotation == 90) {
    s.velocityY = 3;
    s.width = 3;
    s.height = 8;
  }
  if (player.rotation == 180) {
    s.velocityX = -3;
    s.width = 8;
    s.height = 3;
  }
  if (player.rotation == 0) {
    s.velocityX = 3;
    s.width = 8;
    s.height = 3;
  }
  s.shapeColor = "lightblue";
  bulletGroup.add(s);
}

function removeThem(b, a) {
  b.remove();
  a.remove();
  alienCount -= 1;
}

function collectThem(p, c) {
  c.remove();
  score += 1;
}

function move() {
  if (keyDown("up")) {
    player.y -= 3;
    player.rotation = 270;
  }
  if (keyDown("down")) {
    player.y += 3;
    player.rotation = 90;
  }
  if (keyDown("left")) {
    player.x -= 3;
    player.rotation = 180;
  }
  if (keyDown("right")) {
    player.x += 3;
    player.rotation = 0;
  }
}

function alienAttack(p, a) {
  a.remove();
  lives -= 1;
  alienCount -= 1;
}

function collectHeart(p, h) {
  h.remove();
  lives += 1;
}
