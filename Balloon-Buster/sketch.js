var bgrp,ggrp,ygrp,pgrp,agrp,score,pimg, bimg, gimg, yimg, p, b, g, y, bow, arrow, bgimg, x1, x2, 
    speedbow_img, aimg, flag, invisibleWall;

function preload() {
  pimg = loadImage("pink.png");
  bimg = loadImage("blue.png");
  gimg = loadImage("green.png");
  yimg = loadImage("yellow.png");
  bow_img = loadImage("bow.png");
  aimg = loadImage("Arrow.png")
  bgimg = loadImage("bg.jpg")
}

function setup() {
  createCanvas(1000, 600);
  bow = createSprite(width - 50, 100, 20, 20);
  bow.addImage(bow_img);
  bow.scale = 0.5;
  x1 = 0;
  x2 = -width;
  speed = 2;
  score = 0;
  agrp = new Group();
  bgrp = new Group();
  ggrp = new Group();
  ygrp = new Group();
  pgrp = new Group();
  flag = 0;
  flagWall = 0;
  invisibleWall = createSprite(width + 5, height / 2, 10, height)
  invisibleWall.visible = false;
}

function draw() {
  if(flag == 1){
    speed += ((score % 10) * 0.03);
    flag = 0;
  }
  
  background(220);
  image(bgimg, x1, 0, width, height)
  image(bgimg, x2, 0, width, height)
  x1 += speed
  x2 += speed
  if (x1 >= width) {
    x1 = -width+x2
  }
  if (x2 >= width) {
    x2 = -width+x1
  }
  drawBalloons();
  bow.y = mouseY;
  if (keyWentUp("space")) {
    drawarrow()
  }
  if(agrp.overlap(bgrp, callback)){
    score += 1;
    flag = 1;
  }
  if(agrp.overlap(ggrp, callback)){
    score += 2;
    flag = 1;
  }
  if(agrp.overlap(ygrp, callback)){
    score += 3;
    flag = 1;
  }
  if(agrp.overlap(pgrp, callback)){
    score += 4;
    flag = 1;
  }
  if(bgrp.overlap(invisibleWall, removeLostBalloons)){score -= 1;}
  if(ggrp.overlap(invisibleWall, removeLostBalloons)){score -= 2;}
  if(ygrp.overlap(invisibleWall, removeLostBalloons)){score -= 3;}
  if(pgrp.overlap(invisibleWall, removeLostBalloons)){score -= 4;}
  drawSprites();
  textSize(20);
  fill(0);
  textFont("Verdana");
  text("Score: "+score,50,40)
}

function drawarrow() {
  arrow = createSprite(bow.x, bow.y, 10, 10);
  arrow.addImage(aimg);
  arrow.scale = 0.4;
  arrow.velocityX = -speed;
  arrow.lifetime = width / speed + 250;
  agrp.add(arrow);
}

function drawPinkBalloon() {
  p = createSprite(0, Math.round(random(50, height-50)), 10, 10);
  p.addImage(pimg);
  p.scale = 0.25;
  p.velocityX = speed;
  p.lifetime = width / speed + 250;
  pgrp.add(p);
}

function drawBlueBalloon() {
  b = createSprite(0, Math.round(random(50, height-50)), 10, 10);
  b.addImage(bimg);
  b.scale = 0.22;
  b.velocityX = speed;
  b.lifetime = width / speed + 250;
  bgrp.add(b);
}

function drawGreenBalloon() {
  g = createSprite(0, Math.round(random(50, height-50)), 10, 10);
  g.addImage(gimg);
  g.scale = 0.23;
  g.velocityX = speed;
  g.lifetime = width / speed + 250;
  ggrp.add(g);
}

function drawYellowBalloon() {
  y = createSprite(0, Math.round(random(50, height-50)), 10, 10);
  y.addImage(yimg);
  y.scale = 0.24;
  y.velocityX = speed;
  y.lifetime = width / speed + 250;
  ygrp.add(y);
}

function drawBalloons() {
  if (frameCount % 80 == 0) {
    var r = Math.round(random(1, 4))
    switch (r) {
      case 1:
        drawPinkBalloon();
        break;
      case 2:
        drawBlueBalloon();
        break;
      case 3:
        drawGreenBalloon();
        break;
      case 4:
        drawYellowBalloon();
        break;
    }
  }
}

function callback(sprite, bgrp){
  sprite.remove();
  bgrp.remove();
}

function removeLostBalloons(s1, s2){
  s1.remove();
}