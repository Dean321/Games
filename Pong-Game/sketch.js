var ball, edges, p_pad, c_pad, p_score, c_score, gameState=0, boy, girl,ball_img;

function preload(){
  boy = loadImage("boy.png");
  girl = loadImage("girl.png");
  ball_img = loadImage("football.png"); 
}

function setup() {
  createCanvas(400, 400);
  
  ball = createSprite(200, 200, 20, 20);
  ball.shapeColor = "blue";
  ball.addImage(ball_img);
  ball.scale = 0.25;
  
  p_pad = createSprite(360, 200, 10, 100);
  p_pad.shapeColor = "red";
  p_pad.addImage(girl);
  p_pad.scale = 0.028;
  
  c_pad = createSprite(40, 200, 10, 100);
  c_pad.shapeColor = "yellow";
  c_pad.addImage(boy);
  c_pad.scale = 0.1;
  
  edges = createEdgeSprites();
  
  p_score = 0;
  c_score = 0;
}

function draw() {
  background("green");
  drawingContext.setLineDash([5, 10]);
  fill("green");
  strokeWeight(5);
  circle(200, 200, 150);
  line(200, 10, 200, 390);
  line(10, 390, 390, 390);
  line(10, 10, 390, 10);
  line(10, 10, 10, 390);
  line(390, 10, 390, 390);
  
  fill("black");
  textSize(30);
  text(p_score, 220, 40);
  text(c_score, 160, 40);
  
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(p_pad);
  ball.bounceOff(c_pad);
  p_pad.y = mouseY;
  c_pad.y = ball.y;
  if(keyDown("space") && gameState == 0){
    ball.velocityX = 3;
    ball.velocityY = 4;
    gameState = 1;
  }
  if(ball.x < 0 || ball.x > 400){
    if(ball.x < 0){p_score += 1;}
    if(ball.x > 400){c_score += 1;}
    ball.x = 200;ball.y = 200;
    ball.setVelocity(0, 0);
    c_pad.x = 20;
    c_pad.y = 200;
    gameState = 0;
  }
  if(p_score == 5 || c_score == 5){
    gameState = 2;
  }
  if(keyDown("r") && gameState == 2){
    gameState = 0;
    p_score = 0;
    c_score = 0;
  }

  drawSprites();
  if(gameState == 0){
    textSize(20);
    fill("white");
    text("Press Spacebar to start game",80,180);
  }
  if(gameState == 2){
    textSize(20);
    fill("white");
    text("GAME OVER", 150, 180);
    text("Press R to restart ", 120, 250);
  }
}