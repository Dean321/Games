var astronaut, bg, move, sleep, move

function preload(){
  bg = loadImage("images/iss.png");
  move = loadAnimation("move1.png", "move2.png");
  sleep = loadAnimation("images/sleep.png");
  bath = loadAnimation("images/bath1.png","images/bath2.png");
  drink = loadAnimation("images/drink1.png","images/drink2.png");
  gym1 = loadAnimation("images/gym1.png","images/gym2.png");
  gym2 = loadAnimation("images/gym11.png","images/gym12.png");
  eat = loadAnimation("images/eat1.png","images/eat2.png");
  brush = loadAnimation("images/brush.png");

}

function setup() {
  createCanvas(1200, 800);
  astronaut = createSprite(width/2, height/2+180);
  astronaut.scale = 0.15;
  astronaut.addAnimation("sleep", sleep);
  astronaut.addAnimation("moving", move);
  astronaut.addAnimation("bath", bath);
  astronaut.addAnimation("drink", drink);
  astronaut.addAnimation("gym1", gym1);
  astronaut.addAnimation("gym2", gym2);
  astronaut.addAnimation("eat", eat);
  astronaut.addAnimation("brush", brush);
}

function draw() {
  background(220);
  image(bg, 0, 0, width, height);
  if(keyDown("s")){sleeping();}
  if(keyDown("right")){bathing();}
  if(keyDown("left")){eating();}
  if(keyDown("up")){brushing();}
  if(keyDown("m")){moving();}
  if(keyWentDown("down")){exercising();}
  drawSprites();
  textSize(18);
  fill("cyan");
  noStroke();
  text("PRESS ⓢ - SLEEP\tⓜ - MOVE\t⇦ - EAT\t⇨ - BATH\t⇩ - EXERCISE\t⇧ - BRUSH", 50, height-20)
}

function exercising(){
  astronaut.scale = 0.15;
  var r = Math.round(random(1,2));
  if(r == 1){
    astronaut.changeAnimation("gym1");
  }
  else{
    astronaut.changeAnimation("gym2");
  }
}

function sleeping(){
  astronaut.changeAnimation("sleep");
  astronaut.scale = 0.15;
 // astronaut.rotationSpeed = 0;
  //astronaut.pointTo(width/2, height/2+180)

}
function bathing(){
  astronaut.changeAnimation("bath");
  astronaut.scale = 0.15;
  //astronaut.rotationSpeed = 0;
}
function eating(){
  astronaut.changeAnimation("eat");
  astronaut.scale = 0.18;
  //astronaut.rotationSpeed = 0;
}
function brushing(){
  astronaut.changeAnimation("brush");
  astronaut.scale = 0.15;
  //astronaut.rotationSpeed = 0;
}
function moving(){
  astronaut.changeAnimation("moving");
  astronaut.scale = 1;
  //astronaut.pointTo(width/2, height)
 // astronaut.rotationSpeed = 0.3;
}